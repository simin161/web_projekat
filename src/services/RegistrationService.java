package services;

import beans.Administrator;
import beans.Customer;
import beans.Deliverer;
import beans.Manager;
import beans.Restaurant;
import beans.User;
import beans.UserInfo;
import beans.UserType;
import dao.AdministratorDAO;
import dao.CustomerDAO;
import dao.DelivererDAO;
import dao.ManagerDAO;
import dao.UserInfoDAO;

public class RegistrationService {	
	public boolean registerCustomer(Customer newCustomer) {
		boolean returnValue = false;
		
		if(!checkExistanceOfUsername(newCustomer.getUsername())) {
			newCustomer.setId(Integer.toString(CustomerDAO.getInstance().getAllCustomers().size() + 1));
			newCustomer.setUserType(UserType.CUSTOMER);
			CustomerDAO.getInstance().addCustomer(newCustomer);
			CustomerDAO.getInstance().save();
			UserInfoDAO.getInstance().addUser(new UserInfo(newCustomer.getUsername(), newCustomer.getPassword(), UserType.CUSTOMER));
			UserInfoDAO.getInstance().save();
			returnValue = true;
		}
		return returnValue;
	}
	
	public boolean registerDeliverer(Deliverer newDeliverer) {
		
		boolean retVal = false;
		
		if(!checkExistanceOfUsername(newDeliverer.getUsername())) {
			
			newDeliverer.setId(Integer.toString(DelivererDAO.getInstance().getAllDeliverers().size() + 1));
			DelivererDAO.getInstance().addDeliverer(newDeliverer);
			DelivererDAO.getInstance().save();
			UserInfoDAO.getInstance().addUser(new UserInfo(newDeliverer.getUsername(), newDeliverer.getPassword(), UserType.DELIVERER));
			UserInfoDAO.getInstance().save();
			retVal = true;
		}
		
		return retVal;
		
	}
	
	public boolean registerManager(Manager newManager) {
		
		boolean retVal = false;
		
		if(!checkExistanceOfUsername(newManager.getUsername())) {
			
			newManager.setId(Integer.toString(ManagerDAO.getInstance().getAllManagers().size() + 1));
			newManager.setRestaurant(new Restaurant());
			ManagerDAO.getInstance().addManager(newManager);
			ManagerDAO.getInstance().save();
			UserInfoDAO.getInstance().addUser(new UserInfo(newManager.getUsername(), newManager.getPassword(), UserType.MANAGER));
			UserInfoDAO.getInstance().save();
			retVal = true;
			
		}
		
		return retVal;
		
	}
	
	public void registerManagerFromRestaurant(Manager newManager) {
		
	
		
		if(!checkExistanceOfUsername(newManager.getUsername())) {
			
			newManager.setId(Integer.toString(ManagerDAO.getInstance().getAllManagers().size() + 1));
			newManager.setRestaurant(new Restaurant());
			ManagerDAO.getInstance().addManager(newManager);
			ManagerDAO.getInstance().save();
			UserInfoDAO.getInstance().addUser(new UserInfo(newManager.getUsername(), newManager.getPassword(), UserType.MANAGER));
			UserInfoDAO.getInstance().save();
			
			
		}
		
		
		
	}
	
	public UserType logInUser(UserInfo userForLogIn) {
		UserType returnValue = UserType.ERROR;
		for(UserInfo user : UserInfoDAO.getInstance().getAllUsers()) {
	    	if(userForLogIn.getUsername().equals(user.getUsername()) 
	    			&& userForLogIn.getPassword().equals(user.getPassword())) {
	    		returnValue = user.getUserType();
	    		break;
	    	}
	}
		return returnValue;
	}

	public boolean checkExistanceOfUsername(String username) {
		boolean returnValue = false;
		
		for(UserInfo user : UserInfoDAO.getInstance().getAllUsers()) {
		    	if(username.equals(user.getUsername())) {
		    		returnValue = true;
		    		break;
		    	}
		}
		
		return returnValue;
	}
	
	public Customer findCustomerForLogIn(String username) {
		return CustomerDAO.getInstance().findCustomerByUsername(username);
	}
	
	public Manager findManagerForLogIn(String username) {
		return ManagerDAO.getInstance().findManagerByUsername(username);
	}
	
	
	public Administrator findAdministratorForLogIn(String username) {
		return AdministratorDAO.getInstance().findAdministratorByUsername(username);
	}
	
	public Deliverer findDelivererForLogIn(String username) {
		return DelivererDAO.getInstance().findDelivererByUsername(username);
	}
	 
}
