package services;

import java.util.ArrayList;

import com.google.gson.JsonElement;

import beans.Deliverer;
import beans.Order;
import beans.OrderStatus;
import beans.UserInfo;
import beans.UserType;
import dao.DelivererDAO;
import dao.OrderDAO;

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
		ArrayList<Order> orders = new ArrayList<Order>();
		if(deliverer.getOrdersForDelivery() == null)
			return null;
		
		for(Order order : deliverer.getOrdersForDelivery()) {
			orders.add(OrderDAO.getInstance().findOrderById(order.getId()));
		}
		
		return orders;
	}
	
	public ArrayList<Order> getDeliverersDeliveredOrders(String id){
		ArrayList<Order> retVal = new ArrayList<Order>();
		Deliverer deliverer = DelivererDAO.getInstance().findDelivererById(id);
		if(deliverer.getOrdersForDelivery() == null)
			return retVal;
		
		for(Order order : deliverer.getOrdersForDelivery()) {
			if(order.getOrderStatus() == OrderStatus.DELIVERED) {
				retVal.add(OrderDAO.getInstance().findOrderById(order.getId()));
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
		if(deliverer.getOrdersForDelivery() == null)
			return retVal;
		
		for(Order order : deliverer.getOrdersForDelivery()) {
			if(order.getOrderStatus() == OrderStatus.IN_TRANSPORT) {
				retVal.add(OrderDAO.getInstance().findOrderById(order.getId()));
			}
		}
		
		return retVal;
	}
	
	public void addOrderToDeliverer(String orderId) {
		Order order = OrderDAO.getInstance().findOrderById(orderId);
		for(Deliverer deliverer : DelivererDAO.getInstance().getAllDeliverers()) {
			if(deliverer.getId().equals(order.getDeliverer().getId())) {
				if(deliverer.getOrdersForDelivery() == null)
					deliverer.setOrdersForDelivery(new ArrayList<Order>());
				
				deliverer.getOrdersForDelivery().add(OrderDAO.getInstance().findOrderById(orderId));
			}
		}
		
		DelivererDAO.getInstance().save();
	}
}
