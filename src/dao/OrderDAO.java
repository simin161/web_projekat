package dao;

import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.Customer;
import beans.Order;

public class OrderDAO {

	private ArrayList<Order> allOrders;
	private Gson gson = new GsonBuilder().setDateFormat("yyyy-mm-dd").setPrettyPrinting().create();
	
	private static OrderDAO instance;
	public static OrderDAO getInstance() {
		
		if(instance == null) {
			instance = new OrderDAO();
		}
		
		return instance;
	}
	
	public OrderDAO() {
		load();
	}
	
	private void load() {
		
		try {
			Reader reader = Files.newBufferedReader(Paths.get("data/orders.json"));
		    allOrders = new ArrayList<Order>(Arrays.asList(gson.fromJson(reader, Order[].class)));			
			reader.close();
			
		}catch(Exception e) {
			allOrders = new ArrayList<Order>();
			e.printStackTrace();
		}
		
	}
	
	public ArrayList<Order> getAllOrders(){
		
		return allOrders;
		
	}
	
	
	
}
