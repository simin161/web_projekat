package services;

import java.util.ArrayList;

import beans.Restaurant;
import dao.RestaurantDAO;

public class RestaurantService {
	private RestaurantDAO restaurantDAO = new RestaurantDAO();
	
	public ArrayList<Restaurant> getAllRestaurants(){
		return restaurantDAO.getAll();
	}

}
