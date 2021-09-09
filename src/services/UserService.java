package services;

import java.util.ArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import beans.Customer;
import beans.Deliverer;
import beans.Manager;
import beans.Restaurant;
import dao.CustomerDAO;
import dao.DelivererDAO;
import dao.ManagerDAO;
import dao.RestaurantDAO;
import dto.SearchUsersDTO;
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
	
}
