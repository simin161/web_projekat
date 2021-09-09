package dto;

import java.util.ArrayList;

import beans.Restaurant;

public class FilterRestaurantDTO {
	private String restaurantType;
	private ArrayList<Restaurant> restaurants;
	public String getRestaurantType() {
		return restaurantType;
	}
	public void setRestaurantType(String restaurantType) {
		this.restaurantType = restaurantType;
	}
	public ArrayList<Restaurant> getRestaurants() {
		return restaurants;
	}
	public void setRestaurants(ArrayList<Restaurant> restaurants) {
		this.restaurants = restaurants;
	}
}
