package dao;

import java.io.Reader;
import java.io.Writer;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.Restaurant;

public class RestaurantDAO {
	
	private ArrayList<Restaurant> allRestaurants;
	private Gson gson = new GsonBuilder().setDateFormat("yyyy-mm-dd").setPrettyPrinting().create();
	
	private static RestaurantDAO instance;
	
	public static RestaurantDAO getInstance() {
		if(instance == null) {
			instance = new RestaurantDAO();
		}
		
		return instance;
	}
	
	public RestaurantDAO() {
		load();
	}
	
	private void load() {
		try {
			Reader reader = Files.newBufferedReader(Paths.get("data/restaurants.json"));
		    allRestaurants= new ArrayList<Restaurant>(Arrays.asList(gson.fromJson(reader, Restaurant[].class)));			
			reader.close();
		}catch(Exception e) {
			allRestaurants = new ArrayList<Restaurant>();
			e.printStackTrace();
		}
	}
	
	public ArrayList<Restaurant> getAllRestaurants(){
		return allRestaurants;
	}
	
	public void saveRestaurants() {
		try {
			
			Writer writer;
			writer = Files.newBufferedWriter(Paths.get("data/restaurants.json"));
			gson.toJson(allRestaurants, writer);
			writer.close();
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	public void addRestaurant(Restaurant newRestaurant) {
		allRestaurants.add(newRestaurant);
	}
	
	public Restaurant findById(String restaurantId) {
		if(restaurantId == null)
			return null;
		
		Restaurant returnValue = null;
		
		for(Restaurant restaurant : allRestaurants) {
			if(restaurant.getId().equals(restaurantId)) {
				returnValue = restaurant;
				break;
			}
		}
		
		return returnValue;
	}

	public List<Restaurant> findRestaurantByName(String name) {
		
		List<Restaurant> restaurants = new ArrayList<Restaurant>();
		for( Restaurant r : allRestaurants){
			
			if(name.equals(r.getName())) {
				restaurants.add(r);
			}
			
		}
		
		return restaurants;
		
	}
	
}
