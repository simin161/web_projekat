package services;

import java.util.List;

import beans.Manager;
import beans.Restaurant;
import beans.UserInfo;
import beans.UserType;
import dao.ManagerDAO;
import dao.RestaurantDAO;

public class ManagerService {
	public boolean editManager(Manager editedManager) {
		boolean returnValue = false;

		for (Manager manager : ManagerDAO.getInstance().getAllManagers()) {
			if (manager.getId().equals(editedManager.getId())) {
				if (!manager.getUsername().equals(editedManager.getUsername())) {
					if (!checkUsername(editedManager.getUsername())) {
						ManagerDAO.getInstance().getAllManagers().set(Integer.parseInt((manager.getId())) - 1,
								editedManager);
						ManagerDAO.getInstance().save();

						UserInfoService uService = new UserInfoService();
						uService.editUsername(manager.getUsername(), new UserInfo(editedManager.getUsername(),
								editedManager.getPassword(), UserType.MANAGER));
						returnValue = true;
					}
				}
				else {
					ManagerDAO.getInstance().getAllManagers().set(Integer.parseInt((manager.getId())) - 1,
							editedManager);
					ManagerDAO.getInstance().save();
					returnValue = true;
				}
				break;
			}
		}

		return returnValue;
	}
	
	public Restaurant findRestaurantForManager(Manager loggedManager) {
		return RestaurantDAO.getInstance().findById(loggedManager.getRestaurant().getId());
	}
	
	private boolean checkIfEmptyOrNull(String str) {
		if(str == null || str.equals(""))
			return true;
		
		return false;
	}

	private boolean checkUsername(String newUsername) {
		RegistrationService regService = new RegistrationService();
		return regService.checkExistanceOfUsername(newUsername);
	}
	
	public List<Manager> getAllManagersWithoutRestaurants(){
		
		return ManagerDAO.getInstance().getAllManagersWithoutRestaurants();
		
	}
	
}
