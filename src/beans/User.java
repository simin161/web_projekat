package beans;

import java.util.Date;

import com.google.gson.annotations.Expose;

public class User {
	@Expose
	protected String id;
	protected String username;
	protected String password;
	protected String name;
	protected String surname;
	protected String sex;
	protected UserType userType;
	protected Date dateOfBirth;
	protected boolean isDeleted;
	
	public boolean getDeleted() {
		
		return isDeleted;
		
	}
	public void setDeleted(boolean deleted) {
		
		this.isDeleted = deleted;
		
	}
	
	public String getId() {
		return id;
	}
	public String getUsername() {
		return username;
	}
	public String getPassword() {
		return password;
	}
	public String getName() {
		return name;
	}
	public String getSurname() {
		return surname;
	}
	public String getSex() {
		return sex;
	}
	public UserType getUserType() {
		return userType;
	}
	public Date getDateOfBirth() {
		return dateOfBirth;
	}
	public void setId(String id) {
		this.id = id;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setSurname(String surname) {
		this.surname = surname;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public void setUserType(UserType userType) {
		this.userType = userType;
	}
	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}
	
	public User() {
		
	}
	
	public User(String username, boolean isDeleted) {
		
		this.username = username;
		this.isDeleted = isDeleted;
		
	}
	
}
