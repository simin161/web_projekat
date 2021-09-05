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

import beans.Customer;
import beans.Order;
import beans.OrderStatus;

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
	
	public ArrayList<Order> getAllOrdersFromCustomer(String id){
		
		ArrayList<Order> orders = new ArrayList<Order>();
	
		for(Order o : allOrders) {
			
			if(id.equals(o.getCustomer().getId())) {
				orders.add(o);
			}
			
		}
		
		return orders;
		
	}
	
	public ArrayList<Order> getUndeliveredOrdersForCustomer(String id){
		
		ArrayList<Order> orders = getAllOrdersFromCustomer(id);
		ArrayList<Order> undeliveredOrders = new ArrayList<Order>();
		
		for(Order o : orders) {
			
			if(o.getOrderStatus()!= OrderStatus.CANCELED) {
				
				if(o.getOrderStatus() != OrderStatus.DELIVERED) {
					
					undeliveredOrders.add(o);
					
				}
				
			}
			
		}
		
		return undeliveredOrders;
		
	}
	
	
	public void save() {
		
		try {
			Writer writer;
			writer = Files.newBufferedWriter(Paths.get("data/orders.json"));
			gson.toJson(allOrders, writer);
			writer.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	public void addOrder(Order newOrder) {
		allOrders.add(newOrder);
		save();
	}
	
	public Order findOrderById(String orderId) {
		
		Order order = null;
		for(Order o : allOrders) {
			if(orderId.equals(o.getId())) {
				order = o;
			}
		}
		
		return order;
	}
	
	public void deleteOrder(String id) {
		
		for(Order o : allOrders) {
			if(id.equals(o.getId()))
			{
				if(o.getOrderStatus().equals(OrderStatus.PROCESSING))
				{
					allOrders.remove(o);
					break;
				}
				
			}
		}
		
	}
	
}
