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
}
