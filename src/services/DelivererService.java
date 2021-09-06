package services;

import java.util.ArrayList;

import com.google.gson.JsonElement;

import beans.Deliverer;
import beans.Order;
import beans.OrderStatus;
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
	
	public ArrayList<Order> getDeliverersOrders(String id){
		Deliverer deliverer = DelivererDAO.getInstance().findDelivererById(id);
		return deliverer.getOrdersForDelivery();
	}
	
	public ArrayList<Order> getDeliverersDeliveredOrders(String id){
		ArrayList<Order> retVal = new ArrayList<Order>();
		Deliverer deliverer = DelivererDAO.getInstance().findDelivererById(id);
		
		for(Order order : deliverer.getOrdersForDelivery()) {
			if(order.getOrderStatus() == OrderStatus.DELIVERED) {
				retVal.add(order);
			}
		}
		
		return retVal;
	}

	private boolean checkUsername(String newUsername) {
		RegistrationService regService = new RegistrationService();
		return regService.checkExistanceOfUsername(newUsername);
	}

	public ArrayList<Order> getDeliverersUndeliveredOrders(String id) {
		ArrayList<Order> retVal = new ArrayList<Order>();
		Deliverer deliverer = DelivererDAO.getInstance().findDelivererById(id);
		
		for(Order order : deliverer.getOrdersForDelivery()) {
			if(order.getOrderStatus() == OrderStatus.IN_TRANSPORT) {
				retVal.add(order);
			}
		}
		
		return retVal;
	}
}
