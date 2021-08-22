package services;

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

	private boolean checkUsername(String newUsername) {
		RegistrationService regService = new RegistrationService();
		return regService.checkExistanceOfUsername(newUsername);
	}
	
	public boolean createManager(Manager newManager, String restaurantId) {
		
		boolean returnValue= false;
		
		try {
			
			newManager.setId(Integer.toString(ManagerDAO.getInstance().getAllManagers().size()) + 1);
			newManager.setPassword(newManager.getUsername());
			//newManager.setRestaurant();
			
			returnValue = true;
			
		}catch(Exception e){
			
			e.printStackTrace();
			returnValue = false;
			
		}
		
		return returnValue;
		
	}
	
}
