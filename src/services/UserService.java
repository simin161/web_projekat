package services;

import java.util.ArrayList;

import beans.Customer;
import beans.Deliverer;
import beans.Manager;
import dao.CustomerDAO;
import dao.DelivererDAO;
import dao.ManagerDAO;
import dto.UserDTO;

public class UserService {

	public ArrayList<UserDTO> getAllUsersExceptAdmins(){
		
		ArrayList<UserDTO> users = new ArrayList<UserDTO>();
		
		for(Customer c : CustomerDAO.getInstance().getAllCustomers()) {
			
			users.add(new UserDTO(c.getId(), c.getUsername(), c.getName(), c.getSurname(), c.getCollectedPoints(), c.getCustomerType()));
			
		}
		
		for(Manager m : ManagerDAO.getInstance().getAllManagers()) {
			
			users.add(new UserDTO(m.getId(), m.getUsername(), m.getName(), m.getSurname(), m.getUserType()));
			
		}
		
		for(Deliverer d : DelivererDAO.getInstance().getAllDeliverers()){
			
			users.add(new UserDTO(d.getId(), d.getUsername(), d.getName(), d.getSurname(), d.getUserType()));
			
		}
		
		return users;
		
	}
	
}
