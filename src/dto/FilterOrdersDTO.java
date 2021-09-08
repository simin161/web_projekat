package dto;

import java.util.ArrayList;

import beans.OrderStatus;

public class FilterOrdersDTO {

	private String restaurantType;
	private OrderStatus orderStatus;
	private ArrayList<OrderDTO> orders;
	
	public ArrayList<OrderDTO> getOrders() {
		return orders;
	}
	public void setOrders(ArrayList<OrderDTO> orders) {
		this.orders = orders;
	}
	public String getRestaurantType() {
		return restaurantType;
	}
	public void setRestaurantType(String restaurantType) {
		this.restaurantType = restaurantType;
	}
	public OrderStatus getOrderStatus() {
		return orderStatus;
	}
	public void setOrderStatus(OrderStatus orderStatus) {
		this.orderStatus = orderStatus;
	}
	
}
