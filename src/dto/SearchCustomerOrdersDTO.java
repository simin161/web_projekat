package dto;

import java.util.ArrayList;

public class SearchCustomerOrdersDTO {

	private String restaurant;
	private String priceBottom;
	private String priceTop;
	private String dateBottom;
	private String dateTop;
	private ArrayList<OrderDTO> orders;
	
	public ArrayList<OrderDTO> getOrders() {
		return orders;
	}
	public void setOrders(ArrayList<OrderDTO> orders) {
		this.orders = orders;
	}
	public String getRestaurantName() {
		return restaurant;
	}
	public void setRestaurantName(String restaurantName) {
		this.restaurant = restaurantName;
	}
	public String getPriceBottom() {
		return priceBottom;
	}
	public void setPriceBottom(String priceBottom) {
		this.priceBottom = priceBottom;
	}
	public String getPriceTop() {
		return priceTop;
	}
	public void setPriceTop(String priceTop) {
		this.priceTop = priceTop;
	}
	public String getDateBottom() {
		return dateBottom;
	}
	public void setDateBottom(String dateBottom) {
		this.dateBottom = dateBottom;
	}
	public String getDateTop() {
		return dateTop;
	}
	public void setDateTop(String dateTop) {
		this.dateTop = dateTop;
	}
	
}
