package dto;

import java.util.ArrayList;

import beans.Restaurant;
import beans.SortType;

public class SortRestaurantDTO {
	private SortType sortType;
	private ArrayList<Restaurant> restaurants;
	
	public SortType getSortType() {
		return sortType;
	}
	public void setSortType(SortType sortType) {
		this.sortType = sortType;
	}
	public ArrayList<Restaurant> getRestaurants() {
		return restaurants;
	}
	public void setRestaurants(ArrayList<Restaurant> restaurants) {
		this.restaurants = restaurants;
	}
}
