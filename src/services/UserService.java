package services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import beans.Administrator;
import beans.Comment;
import beans.Customer;
import beans.Deliverer;
import beans.Manager;
import beans.Order;
import beans.OrderStatus;
import beans.Restaurant;
import beans.RestaurantStatus;
import beans.SortType;
import beans.User;
import beans.UserType;
import dao.AdministratorDAO;
import dao.CommentDAO;
import dao.CustomerDAO;
import dao.DelivererDAO;
import dao.ManagerDAO;
import dao.OrderDAO;
import dao.RestaurantDAO;
import dto.SearchUsersDTO;
import dto.SortUsersDTO;
import dto.UserDTO;

public class UserService {

	public ArrayList<UserDTO> getAllUsersExceptAdmins(){
		
		ArrayList<UserDTO> users = new ArrayList<UserDTO>();
		
		for(Customer c : CustomerDAO.getInstance().getAllCustomers()) {
			
			if(!c.getDeleted())
				users.add(new UserDTO(c.getId(), c.getUsername(), c.getName(), c.getSurname(), c.getCollectedPoints(), c.getCustomerType()));
			
		}
		
		for(Manager m : ManagerDAO.getInstance().getAllManagers()) {
			
			if(!m.getDeleted())
				users.add(new UserDTO(m.getId(), m.getUsername(), m.getName(), m.getSurname(), m.getUserType()));
			
		}
		
		for(Deliverer d : DelivererDAO.getInstance().getAllDeliverers()){
			
			if(!d.getDeleted())
				users.add(new UserDTO(d.getId(), d.getUsername(), d.getName(), d.getSurname(), d.getUserType()));
			
		}
		
		return users;
		
	}
	
	public User getUserByUsername(String username) {
		
		User user = new User();
		
		List<UserDTO> allUsers = getAllUsersExceptAdmins();
		
		for(Administrator a : AdministratorDAO.getInstance().getAllAdministrators()) {
			
			allUsers.add(new UserDTO(a.getId(), a.getUsername(), a.getName(), a.getSurname(), UserType.ADMINISTRATOR));
			
		}
		
		for(UserDTO u : allUsers) {
			
			if(u.getUsername().equals(username)) {
				
				user = new User(u.getUsername(), false);
				return user;
			}
		}
		
		user = new User(username, true);
		
		return user;
		
	}
	
	public ArrayList<UserDTO> search(SearchUsersDTO searchParams){
		
		ArrayList<UserDTO> retVal = new ArrayList<UserDTO>();
		
		Pattern patternName = Pattern.compile(searchParams.getName(), Pattern.CASE_INSENSITIVE);		
		Pattern patternSurname = Pattern.compile(searchParams.getSurname(), Pattern.CASE_INSENSITIVE);
		Pattern patternUsername = Pattern.compile(searchParams.getUsername(), Pattern.CASE_INSENSITIVE);
		
		if(searchParams.getCustomerType() == null)
			searchParams.setCustomerType("");
		if(searchParams.getUserType() == null)
			searchParams.setUserType("");
		
		for(UserDTO u : getAllUsersExceptAdmins()) {
		    Matcher matcherName = patternName.matcher(u.getName());
		    Matcher matcherSurname = patternSurname.matcher(u.getSurname());
		    Matcher matcherUsername = patternUsername.matcher(u.getUsername());
		    
		    if(searchParams.getCustomerType().equals("") && searchParams.getUserType().equals("")) {
		    	
		    	if(matcherName.find() && matcherSurname.find() && matcherUsername.find()) {
			    	retVal.add(u);
			    }
		    	
		    }
		    else if(searchParams.getCustomerType().equals("")) {
		    	
		    	if(u.getUserType().toString().toLowerCase().equals(searchParams.getUserType().toLowerCase())) {
		    		if(matcherName.find() && matcherSurname.find() && matcherUsername.find()) {
				    	retVal.add(u);
				    }
		    	}
		    	
		    }
		    else if(searchParams.getUserType().equals("")) {
		    	
		    	if(u.getCustomerType().getName().toLowerCase().equals(searchParams.getCustomerType())) {
		    		
		    		if(matcherName.find() && matcherSurname.find() && matcherUsername.find()) {
				    	retVal.add(u);
				    }
		    		
		    	}
		    	
		    }
		    else {
		    	
		    	if(u.getCustomerType().getName().toLowerCase().equals(searchParams.getCustomerType()))
		    		if(u.getUserType().toString().toLowerCase().equals(searchParams.getUserType().toLowerCase())) {
		    			
		    			if(matcherName.find() && matcherSurname.find() && matcherUsername.find()) {
					    	retVal.add(u);
					    }
		    			
		    		}
		    }
		    
		    
		}
		
		
		return retVal;
		
	}
	
	
	public ArrayList<UserDTO> sortUsersByName(SortUsersDTO sortData){
		
		ArrayList<UserDTO> sortedUsers = sortData.getUsersToDisplay();
		
		if (sortData.getType() == SortType.ASCENDING) {

			Collections.sort(sortedUsers, new Comparator<UserDTO>() {
				@Override
				public int compare(final UserDTO object1, final UserDTO object2) {
					return object1.getName().compareTo(object2.getName());
				}
			});
		} else {
			Collections.sort(sortedUsers, new Comparator<UserDTO>() {
				@Override
				public int compare(final UserDTO object1, final UserDTO object2) {
					return -object1.getName().compareTo(object2.getName());
				}
			});
		}
		
		return sortedUsers;
		
	}
	
	public ArrayList<UserDTO> sortUsersBySurname(SortUsersDTO sortData){
		
		ArrayList<UserDTO> sortedUsers = sortData.getUsersToDisplay();
		
		if (sortData.getType() == SortType.ASCENDING) {

			Collections.sort(sortedUsers, new Comparator<UserDTO>() {
				@Override
				public int compare(final UserDTO object1, final UserDTO object2) {
					return object1.getSurname().compareTo(object2.getSurname());
				}
			});
		} else {
			Collections.sort(sortedUsers, new Comparator<UserDTO>() {
				@Override
				public int compare(final UserDTO object1, final UserDTO object2) {
					return -object1.getSurname().compareTo(object2.getSurname());
				}
			});
		}
		
		return sortedUsers;
		
	}
	
	public ArrayList<UserDTO> sortUsersByUsername(SortUsersDTO sortData){
		
		ArrayList<UserDTO> sortedUsers = sortData.getUsersToDisplay();
		
		if (sortData.getType() == SortType.ASCENDING) {

			Collections.sort(sortedUsers, new Comparator<UserDTO>() {
				@Override
				public int compare(final UserDTO object1, final UserDTO object2) {
					return object1.getUsername().compareTo(object2.getUsername());
				}
			});
		} else {
			Collections.sort(sortedUsers, new Comparator<UserDTO>() {
				@Override
				public int compare(final UserDTO object1, final UserDTO object2) {
					return -object1.getUsername().compareTo(object2.getUsername());
				}
			});
		}
		
		return sortedUsers;
		
	}
	
	public ArrayList<UserDTO> sortUsersByPoints(SortUsersDTO sortData){
		
		ArrayList<UserDTO> sortedUsers = sortData.getUsersToDisplay();
		
		for(UserDTO u : sortedUsers) {
			
			if(u.getUserType() != UserType.CUSTOMER)
				u.setCollectedPoints(0);
		}
		
		if (sortData.getType() == SortType.ASCENDING) {

			Collections.sort(sortedUsers, new Comparator<UserDTO>() {
				@Override
				public int compare(final UserDTO object1, final UserDTO object2) {
					return Integer.compare(object1.getCollectedPoints(), object2.getCollectedPoints());
				}
			});
		} else {
			Collections.sort(sortedUsers, new Comparator<UserDTO>() {
				@Override
				public int compare(final UserDTO object1, final UserDTO object2) {
					return -Integer.compare(object1.getCollectedPoints(), object2.getCollectedPoints());
				}
			});
		}
		
		return sortedUsers;
		
	}
	
	public void deleteUser(String userId, UserType type) {
		
		if(type == UserType.CUSTOMER) {
			
			deleteCustomer(userId);
			
		}
		else if(type == UserType.MANAGER) {
			
			deleteManager(userId);
			
		}
		else {
			
			deleteDeliverer(userId);
			
		}
		
	}
	
	private void deleteDeliverer(String userId) {
		
		for(Deliverer d : DelivererDAO.getInstance().getAllDeliverers()) {
			
			if(d.getId().equals(userId)) {
				
				d.setDeleted(true);
				break;
				
			}
			
		}
		DelivererDAO.getInstance().save();
		
		for(Order o : OrderDAO.getInstance().getAllOrders()) {
			
			if(o.getDeliverer()!= null)
			if(o.getDeliverer().getId().equals(userId)) {
				
				o.setDeleted(false);
				o.setOrderStatus(OrderStatus.WAITING_FOR_DELIVERER);
			}
			
		}
		
		OrderDAO.getInstance().save();
		
	}
	
	private void deleteManager(String userId) {
		
		for(Manager m : ManagerDAO.getInstance().getAllManagers()) {
			
			if(m.getId().equals(userId)) {
				
				m.setDeleted(true);
				break;
			}
			
		}
		
		ManagerDAO.getInstance().save();
		
		for(Restaurant r : RestaurantDAO.getInstance().getAll()) {
			
			if(r.getId().equals(ManagerDAO.getInstance().findManagerById(userId).getRestaurant().getId())) {
				
				r.setStatus(RestaurantStatus.CLOSED);
				
			}
			
		}
		
		RestaurantDAO.getInstance().save();
		
	}
	
	private void deleteCustomer(String userId) {
		
		for(Customer c : CustomerDAO.getInstance().getAllCustomers()) {
			
			if(c.getId().equals(userId)) {
				
				c.setDeleted(true);
				break;
			}
			
		}
		
		CustomerDAO.getInstance().save();
		
		for(Order o : OrderDAO.getInstance().getAllOrders()) {
			
			if(o.getCustomer().getId().equals(userId)) {
				
				o.getCustomer().setDeleted(true);
				if(o.getOrderStatus() != OrderStatus.DELIVERED)
					o.setOrderStatus(OrderStatus.CANCELED);
				
			}
			
		}
		
		OrderDAO.getInstance().save();
		
		for(Restaurant r : RestaurantDAO.getInstance().getAll()) {
			
			if(r.getCustomers() != null)
			for(Customer c : r.getCustomers()) {
				
				if(c.getId().equals(userId)) {
					c.setDeleted(true);
					break;
				}
				
			}
			
		}
		
		RestaurantDAO.getInstance().save();
		
		for(Comment c : CommentDAO.getInstance().getAll()) {
			
			if(c.getCustomer().getId().equals(userId)) {
				
				c.getCustomer().setName("Izbrisan korisnik");
				c.getCustomer().setDeleted(true);
				
			}
			
		}
		
		CommentDAO.getInstance().save();
		
	}
	
}
