package beans;

import java.util.ArrayList;

import com.google.gson.annotations.Expose;

public class Restaurant {
	@Expose
	private String id;
	@Expose
	private String name;
	@Expose
	private String restaurantType; //razmisliti
	@Expose
	private ArrayList<Article> articles;
	@Expose
	private RestaurantStatus status;
	@Expose
	private Location location;
	@Expose
	private String restaurantLogo; //ili BufferedImage
	@Expose
	private double averageMark;
	//proveriti
	private Manager manager;
	@Expose
	private ArrayList<Customer> customers;
	
	
	
	public double getAverageMark() {
		return averageMark;
	}
	public void setAverageMark(double averageMark) {
		this.averageMark = averageMark;
	}
	public Restaurant() {
		
		this.id = "";
		
	}
	
	public Restaurant(String id) {
		this.id = id;
	}
	
	
	public String getId() {
		return id;
	}
	public String getName() {
		return name;
	}
	public String getRestaurantType() {
		return restaurantType;
	}
	public ArrayList<Article> getArticles() {
		return articles;
	}
	public RestaurantStatus getStatus() {
		return status;
	}
	public Location getLocation() {
		return location;
	}
	public String getRestaurantLogo() {
		return restaurantLogo;
	}
	public void setId(String id) {
		this.id = id;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setRestaurantType(String restaurantType) {
		this.restaurantType = restaurantType;
	}
	public void setArticles(ArrayList<Article> articles) {
		this.articles = articles;
	}
	public void setStatus(RestaurantStatus status) {
		this.status = status;
	}
	public void setLocation(Location location) {
		this.location = location;
	}
	public void setRestaurantLogo(String restaurantLogo) {
		this.restaurantLogo = restaurantLogo;
	}
	public Manager getManager() {
		return manager;
	}
	public void setManager(Manager manager) {
		this.manager = manager;
	}
	public ArrayList<Customer> getCustomers() {
		return customers;
	}
	public void setCustomers(ArrayList<Customer> customers) {
		this.customers = customers;
	}
}
