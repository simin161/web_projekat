package beans;

import java.util.ArrayList;
import java.util.List;

public class Customer extends User{
	private List<Order> allOrders;
	private Cart cart;
	private int collectedPoints;
	private CustomerType customerType;
	
	public Customer() {
		
	}
	
	public Customer(String customerId) {
		
		this.id = customerId;
		
	}
	
	public List<Order> getAllOrders() {
		return allOrders;
	}
	public Cart getCart() {
		return cart;
	}
	public int getCollectedPoints() {
		return collectedPoints;
	}
	public CustomerType getCustomerType() {
		return customerType;
	}
	public void setAllOrders(List<Order> list) {
		this.allOrders = list;
	}
	public void setCart(Cart cart) {
		this.cart = cart;
	}
	public void setCollectedPoints(int collectedPoints) {
		this.collectedPoints = collectedPoints;
	}
	public void setCustomerType(CustomerType customerType) {
		this.customerType = customerType;
	}
	
	
}
