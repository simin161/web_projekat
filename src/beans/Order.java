package beans;


import java.time.LocalDateTime;
import java.util.ArrayList;

public class Order {
	private String id;
	private ArrayList<Article> articles;
	private Restaurant restaurant;

	private LocalDateTime orderDateAndTime;

	private Customer customer;
	private OrderStatus orderStatus;
	private boolean isDeleted;
	private double totalPrice;
	
	public String getId() {
		return id;
	}
	public ArrayList<Article> getArticles() {
		return articles;
	}
	public Restaurant getRestaurant() {
		return restaurant;
	}

	public Customer getCustomer() {
		return customer;
	}
	public OrderStatus getOrderStatus() {
		return orderStatus;
	}
	public void setId(String id) {
		this.id = id;
	}
	public void setArticles(ArrayList<Article> articles) {
		this.articles = articles;
	}
	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
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
	public LocalDateTime getOrderDateAndTime() {
		return orderDateAndTime;
	}
	public void setOrderDateAndTime(LocalDateTime orderDateAndTime) {
		this.orderDateAndTime = orderDateAndTime;
	}
	
	public String toString(OrderStatus status) {
		
		switch(status) {
		
			case PROCESSING : return "U obradi";
			default: return"";
		}
		
	}
	
}
