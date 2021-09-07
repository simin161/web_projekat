package dto;

public class SearchCustomerOrdersDTO {

	private String restaurant;
	private String priceBottom;
	private String priceTop;
	private String dateBottom;
	private String dateTop;
	
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
