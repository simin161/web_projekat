package services;

import beans.Customer;
import beans.UserInfo;
import beans.UserType;
import dao.CustomerDAO;

public class CustomerService {

	public boolean editCustomer(Customer editedCustomer) {
		boolean returnValue = false;

		for (Customer customer : CustomerDAO.getInstance().getAllCustomers()) {
			if (customer.getId().equals(editedCustomer.getId())) {
				if (!customer.getUsername().equals(editedCustomer.getUsername())) {
					if (!checkUsername(editedCustomer.getUsername())) {
						CustomerDAO.getInstance().getAllCustomers().set(Integer.parseInt((customer.getId())) - 1,
								editedCustomer);
						CustomerDAO.getInstance().save();

						UserInfoService uService = new UserInfoService();
						uService.editUsername(customer.getUsername(), new UserInfo(editedCustomer.getUsername(),
								editedCustomer.getPassword(), UserType.CUSTOMER));
						returnValue = true;
					}
				}
				else {
					CustomerDAO.getInstance().getAllCustomers().set(Integer.parseInt((customer.getId())) - 1,
							editedCustomer);
					CustomerDAO.getInstance().save();
					returnValue = true;
				}
				break;
			}
		}

		return returnValue;
	}

	private boolean checkUsername(String newUsername) {
		RegistrationService regService = new RegistrationService();
		return regService.checkExistanceOfUsername(newUsername);
	}
}
