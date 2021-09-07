package dto;

import java.util.ArrayList;

import beans.Article;
import beans.Customer;
import beans.Order;
import beans.OrderStatus;
import beans.Restaurant;
import dao.CustomerDAO;
import dao.RestaurantDAO;

public class OrderDTO {

	private String id;
	private ArrayList<Article> articles;
	private Restaurant restaurant;

	private String date;
	private String time;
	
	private Customer customer;
	private OrderStatus orderStatus;
	private boolean isDeleted;
	private double totalPrice;
	
	public OrderDTO(Order o) {
		
		this.id = o.getId();
		this.articles = o.getArticles();
		this.restaurant = RestaurantDAO.getInstance().findById(o.getRestaurant().getId());
		this.date = String.valueOf(o.getOrderDateAndTime().getDayOfMonth()) + "-" 
		+ String.valueOf(o.getOrderDateAndTime().getMonthValue() + "-" 
		+ String.valueOf(o.getOrderDateAndTime().getYear()));
		
		this.time = String.valueOf(o.getOrderDateAndTime().getHour()) + ":" +
		String.valueOf(o.getOrderDateAndTime().getMinute()) + ":" +
				String.valueOf(o.getOrderDateAndTime().getSecond());
		this.customer = CustomerDAO.getInstance().findCustomerById(o.getCustomer().getId());
		this.orderStatus = o.getOrderStatus();
		this.isDeleted = o.isDeleted();
		this.totalPrice = o.getTotalPrice();
	
	}

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public ArrayList<Article> getArticles() {
		return articles;
	}
	public void setArticles(ArrayList<Article> articles) {
		this.articles = articles;
	}
	public Restaurant getRestaurant() {
		return restaurant;
	}
	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	public Customer getCustomer() {
		return customer;
	}
	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	public OrderStatus getOrderStatus() {
		return orderStatus;
	}
	public void setOrderStatus(OrderStatus orderStatus) {
		this.orderStatus = orderStatus;
	}
	public boolean isDeleted() {
		return isDeleted;
	}
	public void setDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}
	public double getTotalPrice() {
		return totalPrice;
	}
	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}
	
	
}
