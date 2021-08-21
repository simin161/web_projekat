package beans;

import java.util.ArrayList;

public class Restaurant {
	private String id;
	private String name;
	private String restaurantType; //razmisliti
	private ArrayList<Article> articles;
	private RestaurantStatus status;
	private Location location;
	private String restaurantLogo; //ili BufferedImage
	
	//proveriti
	private Manager manager;
	
	
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
}
