package services;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.JsonElement;

import beans.Article;
import beans.Restaurant;
import beans.RestaurantStatus;
import dao.RestaurantDAO;

public class RestaurantService {

	public void createRestaurant(Restaurant newRestaurant) {
		
		newRestaurant.setId(Integer.toString(RestaurantDAO.getInstance().getAllRestaurants().size()) + 1);
		newRestaurant.setStatus(RestaurantStatus.CLOSED);
		newRestaurant.setArticles(new ArrayList<Article>());
		RestaurantDAO.getInstance().addRestaurant(newRestaurant);
		RestaurantDAO.getInstance().saveRestaurants();
		
	}
	
	public List<Restaurant> findRestaurantsByName(String name){
		return RestaurantDAO.getInstance().findRestaurantByName(name);
	}

	public List<Restaurant> getAllRestaurants() {
		
		return RestaurantDAO.getInstance().getAllRestaurants();
	}
	
}
