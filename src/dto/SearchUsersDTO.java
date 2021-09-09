package dto;

import beans.CustomerType;
import beans.UserType;

public class SearchUsersDTO {

	private String name;
	private String username;
	private String surname;
	private String userType;
	private String customerType;
	
	public String getName() {
		return name;
	}
	
	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
	}

	public String getCustomerType() {
		return customerType;
	}

	public void setCustomerType(String customerType) {
		this.customerType = customerType;
	}

	public void setName(String name) {
		this.name = name;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getSurname() {
		return surname;
	}
	public void setSurname(String surname) {
		this.surname = surname;
	}
	
}
