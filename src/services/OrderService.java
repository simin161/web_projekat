package services;

import java.sql.Time;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import beans.Cart;
import beans.Customer;
import beans.Deliverer;
import beans.Order;
import beans.OrderStatus;
import beans.Restaurant;
import dao.CustomerDAO;
import dao.OrderDAO;
import dao.RestaurantDAO;

public class OrderService {

	public List<Order> findAllOrdersFromCustomer(String id){
		
		return OrderDAO.getInstance().getAllOrdersFromCustomer(id);
		
	}
	
	public List<Order> findUndeliveredOrdersForCustomer(String id){
		
		return OrderDAO.getInstance().getUndeliveredOrdersForCustomer(id);
		
	}
	
	public boolean createOrderFromCart(Cart cart) {
		
		boolean returnValue = false;
		
		Order order = new Order();
		order.setId(String.valueOf(OrderDAO.getInstance().getAllOrders().size()+1));
		order.setArticles(cart.getArticles());
		order.setCustomer(new Customer(cart.getCartId()));
		order.setOrderDate(new Date());
		order.setOrderTime(Time.valueOf(LocalTime.now()));
		order.setOrderStatus(OrderStatus.PROCESSING);
		order.setDeleted(false);
		order.setRestaurant(new Restaurant(cart.getArticles().get(0).getRestaurant().getId()));
		order.getRestaurant().setName(RestaurantDAO.getInstance().findById(order.getRestaurant().getId()).getName());
		OrderDAO.getInstance().addOrder(order);
		
		return returnValue;
		
	}
	
	public void deleteOrder(Order o) {
		OrderDAO.getInstance().deleteOrder(o);
	}

	public void changeOrderStatus(String id) {
		for(Order order : OrderDAO.getInstance().getAllOrders()) {
			if(order.getId().equals(id)) {
				order.setOrderStatus( OrderStatus.values()[order.getOrderStatus().ordinal() + 1]);
				break;
			}
		}
		OrderDAO.getInstance().save();
	}

	public ArrayList<Order> getOrdersWithoutDeliverer() {
		ArrayList<Order> retVal = new ArrayList<Order>();
		
		for(Order order : OrderDAO.getInstance().getAllOrders()) {
			if(order.getOrderStatus() == OrderStatus.WAITING_FOR_DELIVERER) {
				Order o = new Order();
				o.setId(order.getId());
				o.setArticles(order.getArticles());
				o.setCustomer(CustomerDAO.getInstance().findCustomerById(order.getCustomer().getId()));
				o.setOrderDate(order.getOrderDate());
				o.setOrderTime(order.getOrderTime());
				o.setOrderStatus(order.getOrderStatus());
				o.setDeleted(order.isDeleted());
				o.setRestaurant(new Restaurant(order.getRestaurant().getId()));
				o.getRestaurant().setName(RestaurantDAO.getInstance().findById(order.getRestaurant().getId()).getName());
				
				retVal.add(o);
			}
		}
		
		return retVal;
	}

	public void setDelivererForOrder(String idOrder, String idDeliverer) {
		for(Order order : OrderDAO.getInstance().getAllOrders()) {
			if(order.getId().equals(idOrder)) {
				Deliverer deliverer = new Deliverer();
				deliverer.setId(idDeliverer);
				order.setDeliverer(deliverer);
			}
		}
		OrderDAO.getInstance().save();
	}
	
	
	
}
