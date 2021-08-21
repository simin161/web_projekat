package services;

import beans.Deliverer;
import beans.UserInfo;
import beans.UserType;
import dao.DelivererDAO;

public class DelivererService {
	public boolean editDeliverer(Deliverer editedDeliverer) {
		boolean returnValue = false;

		for (Deliverer deliverer : DelivererDAO.getInstance().getAllDeliverers()) {
			if (deliverer.getId().equals(editedDeliverer.getId())) {
				if (!deliverer.getUsername().equals(editedDeliverer.getUsername())) {
					if (!checkUsername(editedDeliverer.getUsername())) {
						DelivererDAO.getInstance().getAllDeliverers().set(Integer.parseInt((deliverer.getId())) - 1,
								editedDeliverer);
						DelivererDAO.getInstance().save();

						UserInfoService uService = new UserInfoService();
						uService.editUsername(deliverer.getUsername(), new UserInfo(editedDeliverer.getUsername(),
								editedDeliverer.getPassword(), UserType.DELIVERER));
						returnValue = true;
					}
				}
				else {
					DelivererDAO.getInstance().getAllDeliverers().set(Integer.parseInt((deliverer.getId())) - 1,
							editedDeliverer);
					DelivererDAO.getInstance().save();
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
