package services;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.time.LocalDateTime;
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
import dto.OrderDTO;

public class OrderService {

	public List<OrderDTO> findAllOrdersFromCustomer(String id){
		
		return OrderDAO.getInstance().getAllOrdersFromCustomer(id);
		
	}
	
	public List<OrderDTO> findUndeliveredOrdersForCustomer(String id){
		
		return OrderDAO.getInstance().getUndeliveredOrdersForCustomer(id);
		
	}
	
	public boolean createOrderFromCart(Cart cart) {
		
		boolean returnValue = false;
		
		Order order = new Order();
		order.setId(String.valueOf(OrderDAO.getInstance().getAllOrders().size()+1));
		order.setArticles(cart.getArticles());
		order.setCustomer(new Customer(cart.getCartId()));

		order.setOrderDateAndTime(LocalDateTime.now());

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
	
	public void deleteOrder(String orderId) {
		OrderDAO.getInstance().deleteOrder(orderId);
	}
	
	
	
}
