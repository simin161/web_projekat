package dao;

import java.io.IOException;
import java.io.Reader;
import java.io.Writer;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;

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
		}
	}
	
	public void save() {
		try {
			Writer writer;
			writer = Files.newBufferedWriter(Paths.get("data/restaurants.json"));
			Gson gson1 = new GsonBuilder().setDateFormat("yyyy-mm-dd").excludeFieldsWithoutExposeAnnotation().setPrettyPrinting().create();
			gson1.toJson(allRestaurants, writer);
			writer.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public ArrayList<Restaurant> getAll(){
		return allRestaurants;
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

}
