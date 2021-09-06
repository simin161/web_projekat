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

import beans.Cart;
import beans.Customer;

public class CustomerDAO {
	private ArrayList<Customer> allCustomers;
	private Gson gson = new GsonBuilder().setDateFormat("yyyy-mm-dd").setPrettyPrinting().create();
	
	private static CustomerDAO instance;
	public static CustomerDAO getInstance() {
		if(instance == null) {
			instance = new CustomerDAO();
		}
		return instance;
	}
	
	public CustomerDAO() {
		load();
	}
	
	private void load() {
		try {
			Reader reader = Files.newBufferedReader(Paths.get("data/customers.json"));
		    allCustomers = new ArrayList<Customer>(Arrays.asList(gson.fromJson(reader, Customer[].class)));			
			reader.close();
			
		}catch(Exception e) {
			allCustomers = new ArrayList<Customer>();
			e.printStackTrace();
		}
	}
	
	public int getPoints(String customerId) {
		
		int points = 0;
		
		for(Customer c : allCustomers) {
			
			if(c.getId().equals(customerId)) {
				
				points = c.getCollectedPoints();
				
			}
			
		}
		
		return points;
		
	}
	
	public ArrayList<Customer> getAllCustomers(){	
		return allCustomers;
	}
	
	public void save() {
		try {
			Writer writer;
			writer = Files.newBufferedWriter(Paths.get("data/customers.json"));
			gson.toJson(allCustomers, writer);
			writer.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public void refreshCart(String customerId) {
		
		for(Customer c : allCustomers) {
			
			if(c.getId().equals(customerId)) {
				
				c.setCart(new Cart());
				
			}
			
		}
		
		save();
		
	}
	
	public void addCustomer(Customer newCustomer) {
		allCustomers.add(newCustomer);
	}
	
	public Customer findCustomerByUsername(String username) {
		Customer customer = null;
		for(Customer c : allCustomers) {
			if(username.equals(c.getUsername())) {
				customer = c;
			}
		}
		return customer;
	}
	
	public Customer findCustomerById(String id) {
		for(Customer c : allCustomers) {
			if(c.getId().equals(id)) {
				return c;
			}
		}
		
		return null;
	}
	
	public void addPoints() {
		
	}
	
	public void removePoints() {
		
		
	}
	
}
