package beans;

import java.util.ArrayList;

public class Customer extends User{
	private ArrayList<Order> allOrders;
	private Cart cart;
	private int collectedPoints;
	private CustomerType customerType;
	
	public Customer(String customerId) {
		
		this.id = customerId;
		
	}
	
	public ArrayList<Order> getAllOrders() {
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
	public void setAllOrders(ArrayList<Order> allOrders) {
		this.allOrders = allOrders;
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
