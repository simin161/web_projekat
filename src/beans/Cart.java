package beans;

import java.util.ArrayList;

public class Cart {
	private ArrayList<Article> articles;
	private Customer customer;
	private double price;
	
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
	
	
}
