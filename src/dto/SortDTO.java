package dto;

import java.util.ArrayList;

import beans.SortType;

public class SortDTO {

	private SortType type;
	private ArrayList<OrderDTO> ordersToDisplay;
	public ArrayList<OrderDTO> getOrdersToDisplay() {
		return ordersToDisplay;
	}
	public void setOrdersToDisplay(ArrayList<OrderDTO> ordersToDisplay) {
		this.ordersToDisplay = ordersToDisplay;
	}
	public SortType getType() {
		return type;
	}
	public void setType(SortType type) {
		this.type = type;
	}
	
}
