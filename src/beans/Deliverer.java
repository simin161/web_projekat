package beans;

import java.util.ArrayList;

public class Deliverer extends User {
	private ArrayList<Order> ordersForDelivery;

	public ArrayList<Order> getOrdersForDelivery() {
		return ordersForDelivery;
	}

	public void setOrdersForDelivery(ArrayList<Order> ordersForDelivery) {
		this.ordersForDelivery = ordersForDelivery;
	}
	
	
}
