package services;

import beans.UserInfo;
import dao.CustomerDAO;
import dao.UserInfoDAO;

public class UserInfoService {

	public boolean editUsername(String oldUsername, UserInfo editedUser) {
		boolean returnValue = false;
		int i = 0;
		for(UserInfo user : UserInfoDAO.getInstance().getAllUsers()) {
			if(user.getUsername().equals(oldUsername)) {
					UserInfoDAO.getInstance().getAllUsers().set(i, editedUser);
					UserInfoDAO.getInstance().save();
					returnValue = true;
				}
			++i;
			break;
		}
		
		return returnValue;
	}
}
