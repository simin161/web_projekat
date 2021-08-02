package beans;

import java.util.ArrayList;

public class Customer extends User{
	private ArrayList<Order> allOrders;
	private Cart cart;
	private int collectedPoints;
	private CustomerType customerType;
}
