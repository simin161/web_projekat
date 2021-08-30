package services;

import java.util.List;

import beans.Order;
import dao.OrderDAO;

public class OrderService {

	public List<Order> findAllOrdersFromCustomer(String id){
		
		return OrderDAO.getInstance().getAllOrdersFromCustomer(id);
		
	}
	
	public List<Order> findUndeliveredOrdersForCustomer(String id){
		
		return OrderDAO.getInstance().getUndeliveredOrdersForCustomer(id);
		
	}
	
	
	
}
