package dto;

import java.util.ArrayList;

import beans.SortType;

public class SortUsersDTO {

	private SortType type;
	private ArrayList<UserDTO> usersToDisplay;
	public SortType getType() {
		return type;
	}
	public void setType(SortType type) {
		this.type = type;
	}
	public ArrayList<UserDTO> getUsersToDisplay() {
		return usersToDisplay;
	}
	public void setUsersToDisplay(ArrayList<UserDTO> usersToDisplay) {
		this.usersToDisplay = usersToDisplay;
	}
	
}
