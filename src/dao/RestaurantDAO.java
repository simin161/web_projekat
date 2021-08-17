package dao;

import java.io.Reader;
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
	
	public ArrayList<Restaurant> getAll(){
		return allRestaurants;
	}

}
