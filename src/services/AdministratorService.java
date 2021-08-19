package services;

import beans.Administrator;
import beans.UserInfo;
import beans.UserType;
import dao.AdministratorDAO;

public class AdministratorService {

	public boolean editAdministrator(Administrator editedAdministrator) {
		boolean returnValue = false;

		for (Administrator administrator : AdministratorDAO.getInstance().getAllAdministrators()) {
			if (administrator.getId().equals(editedAdministrator.getId())) {
				if (!administrator.getUsername().equals(editedAdministrator.getUsername())) {
					if (!checkUsername(editedAdministrator.getUsername())) {
						AdministratorDAO.getInstance().getAllAdministrators().set(Integer.parseInt((administrator.getId())) - 1,
								editedAdministrator);
						AdministratorDAO.getInstance().save();

						UserInfoService uService = new UserInfoService();
						uService.editUsername(administrator.getUsername(), new UserInfo(editedAdministrator.getUsername(),
								editedAdministrator.getPassword(), UserType.ADMINISTRATOR));
						returnValue = true;
					}
				}
				else {
					AdministratorDAO.getInstance().getAllAdministrators().set(Integer.parseInt((administrator.getId())) - 1,
							editedAdministrator);
					AdministratorDAO.getInstance().save();
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
