package services;

import beans.Customer;
import dao.CustomerDAO;

public class CustomerService {
	
	public boolean editCustomer(Customer editedCustomer) {
		boolean returnValue = false;
		
		for(Customer customer : CustomerDAO.getInstance().getAllCustomers()) {
			if(customer.getId().equals(editedCustomer.getId())) {
				CustomerDAO.getInstance().getAllCustomers().set(Integer.parseInt((customer.getId()))-1, editedCustomer);
				CustomerDAO.getInstance().save();
				returnValue = true;
				break;
			}
		}
		
		return returnValue;
	}
}
