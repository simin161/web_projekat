package beans;

import java.util.Date;

public abstract class User {
	protected String id;
	protected String username;
	protected String password;
	protected String name;
	protected String surname;
	protected String sex;
	protected Date dateOfBirth;
	
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
	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}
	
	
}
