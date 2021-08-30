package services;

import java.sql.Time;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;

import beans.Cart;
import beans.Order;
import beans.OrderStatus;
import dao.OrderDAO;

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
		order.setId(OrderDAO.getInstance().getAllOrders().toString() + 1);
		order.setArticles(cart.getArticles());
		order.setCustomer(cart.getCustomer());
		order.setOrderDate(new Date());
		order.setOrderTime(Time.valueOf(LocalTime.now()));
		order.setOrderStatus(OrderStatus.PROCESSING);
		order.setRestaurant(cart.getRestaurant());
		
		OrderDAO.getInstance().addOrder(order);
		
		
		return returnValue;
		
	}
	
}
