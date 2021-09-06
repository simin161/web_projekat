package beans;

import java.util.ArrayList;

public class Cart {
	private String cartId;
	private ArrayList<Article> articles;
	private Customer customer;
	private double price;
	private Restaurant restaurant;
	
	public Cart() {
		
		this.articles = new ArrayList<Article>();
		this.customer = new Customer();
		this.restaurant = new Restaurant();
		
	}
	
	
	public Restaurant getRestaurant() {
		return restaurant;
	}
	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}
	public ArrayList<Article> getArticles() {
		return articles;
	}
	public Customer getCustomer() {
		return customer;
	}
	public double getPrice() {
		return price;
	}
	public void setArticles(ArrayList<Article> articles) {
		this.articles = articles;
	}
	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public String getCartId() {
		return cartId;
	}
	public void setCartId(String cartId) {
		this.cartId = cartId;
	}
	
	
}
