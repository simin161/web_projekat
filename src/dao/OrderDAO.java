package dao;

import java.io.IOException;
import java.io.Reader;
import java.io.Writer;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.Article;
import beans.Order;
import beans.OrderStatus;
import dto.OrderDTO;

public class OrderDAO {

	private ArrayList<Order> allOrders;


	private Gson gson = new GsonBuilder().setDateFormat("dd-MM-yyyy HH:mm:ss").setPrettyPrinting().create();

	
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
			 
		}
		
	}
	
	public ArrayList<Order> getAllOrders(){
		
		return allOrders;
		
	}
	
	public ArrayList<OrderDTO> getAllOrdersFromCustomer(String id){
		
		ArrayList<OrderDTO> orders = new ArrayList<OrderDTO>();
	
		for(Order o : allOrders) {
			
			if(id.equals(o.getCustomer().getId())) {
				
				if(o.isDeleted()==false || o.getOrderStatus() != OrderStatus.CANCELED) {
				
					OrderDTO newOrder = new OrderDTO(o);
					
					orders.add(newOrder);
					
				}
			}
			
		}
		
		return orders;
		
	}
	
	public ArrayList<OrderDTO> getUndeliveredOrdersForCustomer(String id){
		
		ArrayList<OrderDTO> orders = getAllOrdersFromCustomer(id);
		ArrayList<OrderDTO> undeliveredOrders = new ArrayList<OrderDTO>();
		
		for(OrderDTO o : orders) {
			
			if(o.getOrderStatus()!= OrderStatus.CANCELED) {
				
				if(o.getOrderStatus() != OrderStatus.DELIVERED) {
					
					if(o.isDeleted()==false)		//od viska glava ne boli radjeno u 00:00
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
	
	public void deleteOrder(String orderId) {
		
		
		
		for(Order o : allOrders) {
			if(o.getId().equals(orderId))
			{
				o.setDeleted(true);
				o.setOrderStatus(OrderStatus.CANCELED);
				removePoints(o);
				break;
				
				
			}
		}
	}
	
	private void removePoints(Order o) {
		
		double points = CustomerDAO.getInstance().findCustomerById(o.getCustomer().getId()).getCollectedPoints();
		double pointsToRemove = 0;
		double totalPrice = 0;
		double articlePrice= 0;
		double tempPrice= 0;
		
		for(Article a : o.getArticles()) {
			
			articlePrice = a.getPrice() * a.getTotalNumberOrdered();
			totalPrice += articlePrice;
		}
		
		if(CustomerDAO.getInstance().findCustomerById(o.getCustomer().getId()).getCustomerType().getName().equals("PREMIUM")) {
			
			tempPrice = totalPrice;
			totalPrice = totalPrice - (tempPrice * 0.05);
			
		}
		if(CustomerDAO.getInstance().findCustomerById(o.getCustomer().getId()).getCustomerType().getName().equals("LEGENDARY")) {
			
			tempPrice = totalPrice;
			totalPrice = totalPrice - (tempPrice * 0.1);
			
		}
		
		pointsToRemove = totalPrice / 1000 * 133 * 4;
		
		points = points - pointsToRemove;
		
		CustomerDAO.getInstance().findCustomerById(o.getCustomer().getId()).setCollectedPoints((int)points);
		
		if(points < 10000 && points >=5000) {
			
			CustomerDAO.getInstance().findCustomerById(o.getCustomer().getId()).getCustomerType().setName("PREMIUM");
			CustomerDAO.getInstance().findCustomerById(o.getCustomer().getId()).getCustomerType().setDiscount(0.05);
			CustomerDAO.getInstance().findCustomerById(o.getCustomer().getId()).getCustomerType().setNeededPoints(5000);
			
		}
		if(points<5000) {
			
			CustomerDAO.getInstance().findCustomerById(o.getCustomer().getId()).getCustomerType().setName("STANDARD");
			CustomerDAO.getInstance().findCustomerById(o.getCustomer().getId()).getCustomerType().setDiscount(0);
			CustomerDAO.getInstance().findCustomerById(o.getCustomer().getId()).getCustomerType().setNeededPoints(0);
			
		}
		
		if(points < 0) {
			
			CustomerDAO.getInstance().findCustomerById(o.getCustomer().getId()).setCollectedPoints(0);
			
		}
		
		CustomerDAO.getInstance().save();
	}
	
}
