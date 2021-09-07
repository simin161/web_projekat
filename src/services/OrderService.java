package services;

import java.sql.Time;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;

import beans.Article;
import beans.Cart;
import beans.Customer;
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
		order.setTotalPrice(calculateCost(cart.getArticles()));
		order.setRestaurant(new Restaurant(cart.getArticles().get(0).getRestaurant().getId()));
		order.getRestaurant().setName(RestaurantDAO.getInstance().findById(order.getRestaurant().getId()).getName());
		OrderDAO.getInstance().addOrder(order);
		
		calculatePoints(order, cart.getCartId());
		
		return returnValue;
		
	}
	
	private double calculateCost(List<Article> articles) {
		
		double price = 0;
		
		for(Article a : articles) {
			
			price += (a.getPrice() * a.getTotalNumberOrdered());
			
		}
		
		return price;
		
	}
	
	private void calculatePoints(Order o, String customerId) {
		
		double points = CustomerDAO.getInstance().findCustomerById(customerId).getCollectedPoints();
		double pointsToAssign = 0;
		double totalPrice = 0;
		double articlePrice= 0;
		
		
		for(Article a : o.getArticles()) {
			
			articlePrice = a.getPrice() * a.getTotalNumberOrdered();
			totalPrice += articlePrice;
		}
		
		pointsToAssign = totalPrice / 1000 * 133;
		
		points += pointsToAssign;
		
		CustomerDAO.getInstance().findCustomerById(customerId).setCollectedPoints((int)points);
		
	}
	
	public void deleteOrder(Order o) {
		OrderDAO.getInstance().deleteOrder(o);
	}
	
	
	
}
