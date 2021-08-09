package services;

import beans.Customer;
import beans.UserInfo;
import dao.CustomerDAO;
import dao.UserInfoDAO;

public class RegistrationService {

	private UserInfoDAO userInfoDAO = new UserInfoDAO();
	private CustomerDAO customerDAO = new CustomerDAO();
	
	public boolean registerCustomer(Customer newCustomer) {
		boolean returnValue = false;
		
		if(!checkExistanceOfUsername(newCustomer.getUsername())) {
			newCustomer.setId(Integer.toString(customerDAO.getAllCustomers().size() + 1));
			customerDAO.addCustomer(newCustomer);
			customerDAO.save();
			userInfoDAO.addUser(new UserInfo(newCustomer.getUsername(), newCustomer.getPassword(), "customer"));
			userInfoDAO.save();
			returnValue = true;
		}
		return returnValue;
	}
	
	public boolean logInUser(UserInfo user) {
		boolean returnValue = false;
		if(checkLogInParameters(user.getUsername(), user.getPassword())){
			returnValue = true;
		}
		return returnValue;
	}

	private boolean checkExistanceOfUsername(String username) {
		boolean returnValue = false;
		
		for(UserInfo user : userInfoDAO.getAllUsers()) {
		    	if(username.equals(user.getUsername())) {
		    		returnValue = true;
		    		break;
		    	}
		}
		
		return returnValue;
	}
	
	private boolean checkLogInParameters(String username, String password) {
		boolean returnValue = false;
		
		for(UserInfo user : userInfoDAO.getAllUsers()) {
			if(username.equals(user.getUsername()) && password.equals(user.getPassword())) {
				returnValue = true;
				break;
			}
		}
		
		return returnValue;
	}
}
