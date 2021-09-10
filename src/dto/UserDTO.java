package dto;

import beans.CustomerType;
import beans.UserType;

public class UserDTO {

	private String id;
	private String username;
	private String name;
	private String surname;
	private int collectedPoints;
	private UserType userType;
	private CustomerType customerType;
	private boolean isDeleted;
	
	public UserDTO() {
		
	}
	
	public UserDTO(String id, String username, String name, String surname, int collectedPoints, CustomerType customerType) {
		
		this.id = id;
		this.username= username;
		this.name= name;
		this.surname = surname;
		this.collectedPoints = collectedPoints;
		this.customerType = customerType;
		this.userType = UserType.CUSTOMER;
		
	}
	
	public UserDTO(String id, String username, String name, String surname, UserType userType ) {
		
		this.id = id;
		this.username= username;
		this.name= name;
		this.surname = surname;
		this.userType = userType;
		this.customerType = new CustomerType("",0,0);
		
	}
	
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSurname() {
		return surname;
	}
	public void setSurname(String surname) {
		this.surname = surname;
	}
	public int getCollectedPoints() {
		return collectedPoints;
	}
	public void setCollectedPoints(int collectedPoints) {
		this.collectedPoints = collectedPoints;
	}
	public UserType getUserType() {
		return userType;
	}
	public void setUserType(UserType userType) {
		this.userType = userType;
	}
	public CustomerType getCustomerType() {
		return customerType;
	}
	public void setCustomerType(CustomerType customerType) {
		this.customerType = customerType;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public boolean isDeleted() {
		return isDeleted;
	}

	public void setDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}
	
}
