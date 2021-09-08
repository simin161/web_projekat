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
import dto.PasswordDTO;

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

	public boolean changePassword(User loggedUser, PasswordDTO dto) {
		
		boolean returnValue = true;
		
		switch(loggedUser.getUserType()) {
		case CUSTOMER:
			CustomerService cS = new CustomerService();
			Customer customer = CustomerDAO.getInstance().findCustomerById(loggedUser.getId());
			customer.setPassword(dto.getNewPassword());
			cS.editCustomer(customer);
			break;
		case DELIVERER:
			DelivererService dS = new DelivererService();
			Deliverer delivrer = DelivererDAO.getInstance().findDelivererById(loggedUser.getId());
			delivrer.setPassword(dto.getNewPassword());
			dS.editDeliverer(delivrer);
			break;
		case MANAGER:
			ManagerService mS = new ManagerService();
			Manager manager = ManagerDAO.getInstance().findManagerByUsername(loggedUser.getUsername());
			manager.setPassword(dto.getNewPassword());
			mS.editManager(manager);
			break;
		case ADMINISTRATOR:
			AdministratorService aS = new AdministratorService();
			Administrator admin = AdministratorDAO.getInstance().findAdministratorByUsername(loggedUser.getUsername());
			admin.setPassword(dto.getNewPassword());
			aS.editAdministrator(admin);
			break;
		default:
			returnValue = false;
		}
		
		if(returnValue) {
			UserInfoService uIS = new UserInfoService();
			returnValue = uIS.editPassword(loggedUser.getUsername(), dto.getNewPassword());
		}
		
		return returnValue;
	}
	 
}
