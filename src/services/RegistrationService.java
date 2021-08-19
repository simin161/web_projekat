package services;

import beans.Administrator;
import beans.Customer;
import beans.Deliverer;
import beans.Manager;
import beans.UserInfo;
import beans.UserType;
import dao.AdministratorDAO;
import dao.CustomerDAO;
import dao.DelivererDAO;
import dao.ManagerDAO;
import dao.UserInfoDAO;

public class RegistrationService {

	private UserInfoDAO userInfoDAO = new UserInfoDAO();
	private CustomerDAO customerDAO = new CustomerDAO();
	private ManagerDAO managerDAO = new ManagerDAO();
	private AdministratorDAO administratorDAO = new AdministratorDAO();
	private DelivererDAO delivererDAO = new DelivererDAO();
	
	public boolean registerCustomer(Customer newCustomer) {
		boolean returnValue = false;
		
		if(!checkExistanceOfUsername(newCustomer.getUsername())) {
			newCustomer.setId(Integer.toString(customerDAO.getAllCustomers().size() + 1));
			newCustomer.setUserType(UserType.CUSTOMER);
			customerDAO.addCustomer(newCustomer);
			customerDAO.save();
			userInfoDAO.addUser(new UserInfo(newCustomer.getUsername(), newCustomer.getPassword(), UserType.CUSTOMER));
			userInfoDAO.save();
			returnValue = true;
		}
		return returnValue;
	}
	
	public UserType logInUser(UserInfo userForLogIn) {
		UserType returnValue = UserType.ERROR;
		for(UserInfo user : userInfoDAO.getAllUsers()) {
	    	if(userForLogIn.getUsername().equals(user.getUsername()) 
	    			&& userForLogIn.getPassword().equals(user.getPassword())) {
	    		returnValue = user.getUserType();
	    		break;
	    	}
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
	
	public Customer findCustomerForLogIn(String username) {
		return customerDAO.findCustomerByUsername(username);
	}
	
	public Manager findManagerForLogIn(String username) {
		return managerDAO.findManagerByUsername(username);
	}
	
	
	public Administrator findAdministratorForLogIn(String username) {
		return administratorDAO.findAdministratorByUsername(username);
	}
	
	public Deliverer findDelivererForLogIn(String username) {
		return delivererDAO.findDelivererByUsername(username);
	}
	 
}
