package dto;

import java.util.ArrayList;

import beans.Article;
import beans.Customer;
import beans.Deliverer;
import beans.Location;
import beans.Order;
import beans.OrderStatus;
import beans.Restaurant;
import dao.CustomerDAO;
import dao.DelivererDAO;
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
	private Deliverer deliverer;
	
	public OrderDTO(Order o) {
		
		this.id = o.getId();
		this.articles = o.getArticles();
		this.restaurant = RestaurantDAO.getInstance().findById(o.getRestaurant().getId());
		
		String month = "";
		if(o.getOrderDateAndTime().getMonthValue()<10) {
			month = "0" + String.valueOf(o.getOrderDateAndTime().getMonthValue());
		}
		else
			month = String.valueOf(o.getOrderDateAndTime().getMonthValue());
		
		String day = "";
		if(o.getOrderDateAndTime().getDayOfMonth() < 10) {
			day = "0" + String.valueOf(o.getOrderDateAndTime().getDayOfMonth());
		}
		else
			day = String.valueOf(o.getOrderDateAndTime().getDayOfMonth());
		
		this.date = day + "-" 
		+ month + "-" 
		+ String.valueOf(o.getOrderDateAndTime().getYear());
		
		this.time = String.valueOf(o.getOrderDateAndTime().getHour()) + ":" +
		String.valueOf(o.getOrderDateAndTime().getMinute()) + ":" +
				String.valueOf(o.getOrderDateAndTime().getSecond());
		this.customer = CustomerDAO.getInstance().findCustomerById(o.getCustomer().getId());
		this.orderStatus = o.getOrderStatus();
		this.isDeleted = o.isDeleted();
		this.totalPrice = o.getTotalPrice();
		
		if(o.getDeliverer() != null)
			this.deliverer = DelivererDAO.getInstance().findDelivererById(o.getDeliverer().getId());
		else
			this.deliverer = null;
		}
	
	public Deliverer getDeliverer() {
		return deliverer;
	}

	public void setDeliverer(Deliverer deliverer) {
		this.deliverer = deliverer;
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
