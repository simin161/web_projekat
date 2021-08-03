package beans;

public class UserInfo {
	private String username;
	private String password;
	private String userType;
	
	public UserInfo(String username, String password, String userType) {
		this.username = username;
		this.password = password;
		this.userType = userType;
	}
	public String getUsername() {
		return username;
	}
	public String getPassword() {
		return password;
	}
	public String getUserType() {
		return userType;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public void setUserType(String userType) {
		this.userType = userType;
	}
}
