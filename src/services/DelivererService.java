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
import dto.OrderDTO;

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
				} else {
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

	public ArrayList<OrderDTO> getDeliverersOrders(String id) {
		Deliverer deliverer = DelivererDAO.getInstance().findDelivererById(id);
		ArrayList<OrderDTO> orders = new ArrayList<OrderDTO>();
		if (deliverer.getOrdersForDelivery() == null)
			return null;

		for (Order order : deliverer.getOrdersForDelivery()) {
			orders.add(new OrderDTO(OrderDAO.getInstance().findOrderById(order.getId())));
		}

		return orders;
	}

	public ArrayList<OrderDTO> getDeliverersDeliveredOrders(String id) {
		ArrayList<OrderDTO> retVal = new ArrayList<OrderDTO>();
		Deliverer deliverer = DelivererDAO.getInstance().findDelivererById(id);
		if (deliverer.getOrdersForDelivery() == null)
			return retVal;

		for (Order order : deliverer.getOrdersForDelivery()) {
			if (OrderDAO.getInstance().findOrderById(order.getId()).getOrderStatus() == OrderStatus.DELIVERED) {
				retVal.add(new OrderDTO(OrderDAO.getInstance().findOrderById(order.getId())));
			}
		}

		return retVal;
	}

	private boolean checkUsername(String newUsername) {
		RegistrationService regService = new RegistrationService();
		return regService.checkExistanceOfUsername(newUsername);
	}

	public ArrayList<OrderDTO> getDeliverersUndeliveredOrders(String id) {
		ArrayList<OrderDTO> retVal = new ArrayList<OrderDTO>();
		Deliverer deliverer = DelivererDAO.getInstance().findDelivererById(id);
		if (deliverer.getOrdersForDelivery() == null)
			return retVal;

		for (Order order : deliverer.getOrdersForDelivery()) {
			if (OrderDAO.getInstance().findOrderById(order.getId()).getOrderStatus() == OrderStatus.IN_TRANSPORT) {
				retVal.add(new OrderDTO(OrderDAO.getInstance().findOrderById(order.getId())));
			}
		}

		return retVal;
	}

	public void addOrderToDeliverer(String orderId) {
		Order order = OrderDAO.getInstance().findOrderById(orderId);
		for (Deliverer deliverer : DelivererDAO.getInstance().getAllDeliverers()) {
			if (deliverer.getId().equals(order.getDeliverer().getId())) {
				if (deliverer.getOrdersForDelivery() == null)
					deliverer.setOrdersForDelivery(new ArrayList<Order>());
				Order newOrder = new Order();
				newOrder.setId(orderId);
				deliverer.getOrdersForDelivery().add(newOrder);
			}
		}

		DelivererDAO.getInstance().save();
	}

	public ArrayList<OrderDTO> getDeliverersRequests(String id) {
		ArrayList<OrderDTO> orders = new ArrayList<OrderDTO>();

		for (Order order : OrderDAO.getInstance().getAllOrders()) {
			if(order.getOrderStatus() != OrderStatus.DELIVERED && order.getDeliverer() != null && order.getDeliverer().getId().equals(id)) {
				orders.add(new OrderDTO(order));
			}
		}

		return orders;
	}
}
