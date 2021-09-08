package services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import beans.Article;
import beans.Cart;
import beans.Customer;
import beans.Deliverer;
import beans.Order;
import beans.OrderStatus;
import beans.Restaurant;
import beans.SortType;
import dao.CustomerDAO;
import dao.DelivererDAO;
import dao.OrderDAO;
import dao.RestaurantDAO;
import dto.FilterOrdersDTO;
import dto.OrderDTO;
import dto.SearchCustomerOrdersDTO;
import dto.SortDTO;

public class OrderService {

	public List<OrderDTO> findAllOrdersFromCustomer(String id) {

		return OrderDAO.getInstance().getAllOrdersFromCustomer(id);

	}

	public List<OrderDTO> findUndeliveredOrdersForCustomer(String id) {

		return OrderDAO.getInstance().getUndeliveredOrdersForCustomer(id);

	}

	public boolean createOrderFromCart(Cart cart) {

		boolean returnValue = false;

		Order order = new Order();
		order.setId(String.valueOf(OrderDAO.getInstance().getAllOrders().size() + 1));
		order.setArticles(cart.getArticles());
		order.setCustomer(new Customer(cart.getCartId()));

		order.setOrderDateAndTime(LocalDateTime.now());

		order.setOrderStatus(OrderStatus.PROCESSING);
		order.setDeleted(false);
		order.setTotalPrice(calculateCost(cart.getArticles()));
		order.setRestaurant(new Restaurant(cart.getArticles().get(0).getRestaurant().getId()));
		order.getRestaurant().setName(RestaurantDAO.getInstance().findById(order.getRestaurant().getId()).getName());
		OrderDAO.getInstance().addOrder(order);

		calculatePoints(order, cart.getCartId());

		return returnValue;

	}

	private double calculateCost(List<Article> articles) {

		double price = 0;

		for (Article a : articles) {

			price += (a.getPrice() * a.getTotalNumberOrdered());

		}

		return price;

	}

	private void calculatePoints(Order o, String customerId) {

		double points = CustomerDAO.getInstance().findCustomerById(customerId).getCollectedPoints();
		double pointsToAssign = 0;
		double totalPrice = 0;
		double articlePrice = 0;

		for (Article a : o.getArticles()) {

			articlePrice = a.getPrice() * a.getTotalNumberOrdered();
			totalPrice += articlePrice;
		}

		pointsToAssign = totalPrice / 1000 * 133;

		points += pointsToAssign;

		CustomerDAO.getInstance().findCustomerById(customerId).setCollectedPoints((int) points);

	}

	public void deleteOrder(String orderId) {
		OrderDAO.getInstance().deleteOrder(orderId);
	}

	public void changeOrderStatus(String id, boolean toIncrement) {
		for (Order order : OrderDAO.getInstance().getAllOrders()) {
			if (order.getId().equals(id)) {
				if (toIncrement) {
					order.setOrderStatus(OrderStatus.values()[order.getOrderStatus().ordinal() + 1]);
				} else {
					order.setOrderStatus(OrderStatus.values()[order.getOrderStatus().ordinal() - 1]);
				}
				break;
			}
		}
		OrderDAO.getInstance().save();
	}

	public ArrayList<OrderDTO> getOrdersWithoutDeliverer() {
		ArrayList<OrderDTO> retVal = new ArrayList<OrderDTO>();
		
		for(Order order : OrderDAO.getInstance().getAllOrders()) {
			if(order.getOrderStatus() == OrderStatus.WAITING_FOR_DELIVERER) {
				OrderDTO o = new OrderDTO(order);
			}
		}

		return retVal;
	}

	public void setDelivererForOrder(String idOrder, String idDeliverer) {
		for (Order order : OrderDAO.getInstance().getAllOrders()) {
			if (order.getId().equals(idOrder)) {
				Deliverer deliverer = new Deliverer();
				deliverer.setId(idDeliverer);
				order.setDeliverer(deliverer);
			}
		}
		OrderDAO.getInstance().save();
	}
	
	public ArrayList<OrderDTO> getAllOrdersForRestaurant(String id){
		ArrayList<OrderDTO> retVal = new ArrayList<OrderDTO>();
		
		for(Order order : OrderDAO.getInstance().getAllOrders()) {
			if(order.getRestaurant().getId().equals(id)) {
				OrderDTO o = new OrderDTO(order);
				retVal.add(o);
			}
		}

		return retVal;
	}

	public ArrayList<OrderDTO> getOrdersWaitingForResponse(String id) {
		ArrayList<OrderDTO> retVal = new ArrayList<OrderDTO>();
		
		for(OrderDTO order : getAllOrdersForRestaurant(id)) {
			if(order.getOrderStatus() == OrderStatus.WAITING_FOR_RESPONSE) {
				order.setDeliverer(DelivererDAO.getInstance().findDelivererById(order.getDeliverer().getId()));
				retVal.add(order);
			}
		}

		return retVal;
	}

	public List<OrderDTO> searchCustomerOrders(String customerId, SearchCustomerOrdersDTO searchParams) {

		List<OrderDTO> searchedOrders = new ArrayList<OrderDTO>();

		Pattern patternName = Pattern.compile(searchParams.getRestaurantName(), Pattern.CASE_INSENSITIVE);

		LocalDate dateBottom = null;
		LocalDate dateTop = null;
		double priceBottom = -1;
		double priceTop = -1;

		try {

			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

			if (!searchParams.getDateBottom().isEmpty()) {
				dateBottom = LocalDate.parse(searchParams.getDateBottom(), formatter);
			}
			if (!searchParams.getDateTop().isEmpty()) {
				dateTop = LocalDate.parse(searchParams.getDateTop(), formatter);
			}

			if (!searchParams.getPriceBottom().isEmpty())
				priceBottom = Double.valueOf(searchParams.getPriceBottom());
			if (!searchParams.getPriceTop().isEmpty())
				priceTop = Double.valueOf(searchParams.getPriceTop());

		} catch (Exception e) {

			e.printStackTrace();

		}

		boolean priceBottomCheck = priceBottom != -1 ? true : false;
		boolean priceTopCheck = priceTop != -1 ? true : false;

		for (OrderDTO o : OrderDAO.getInstance().getAllOrdersFromCustomer(customerId)) {

			Matcher matcherName = patternName.matcher(o.getRestaurant().getName());
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
			LocalDate orderDate = LocalDate.parse(o.getDate(), formatter);

			if (priceBottomCheck && priceTopCheck) {

				if (dateBottom != null && dateTop != null) {

					if (dateBottom.isBefore(orderDate)) {

						if (dateTop.isAfter(orderDate)) {

							if (o.getTotalPrice() >= priceBottom) {

								if (o.getTotalPrice() <= priceTop) {

									if (matcherName.find()) {

										searchedOrders.add(o);

									}

								}

							}

						}

					}

				} else {

					if (o.getTotalPrice() >= priceBottom) {

						if (o.getTotalPrice() <= priceTop) {

							if (matcherName.find()) {

								searchedOrders.add(o);

							}

						}

					}

				}

			}

			else if (dateBottom != null && dateTop != null) {

				if (dateBottom.isBefore(orderDate)) {

					if (dateTop.isAfter(orderDate)) {

						if (matcherName.find()) {

							searchedOrders.add(o);

						}

					}

				}

			} else if (matcherName.find()) {
				searchedOrders.add(o);
			}

		}

		return searchedOrders;

	}

	public List<OrderDTO> filterOrders(FilterOrdersDTO filterParams) {

		List<OrderDTO> filteredOrders = new ArrayList<OrderDTO>();

		boolean checkType = filterParams.getRestaurantType().isEmpty() ? false : true;
		if (filterParams.getOrderStatus() == null) {
			filterParams.setOrderStatus(OrderStatus.ERROR);
		}
		boolean checkStatus = filterParams.getOrderStatus() == OrderStatus.ERROR ? false : true;

		for (OrderDTO o : filterParams.getOrders()) {

			if (checkType && checkStatus) {

				if (o.getRestaurant().getRestaurantType().equals(filterParams.getRestaurantType())) {

					if (o.getOrderStatus().equals(filterParams.getOrderStatus())) {

						filteredOrders.add(o);

					}

				}

			} else if (checkType) {

				if (o.getRestaurant().getRestaurantType().equals(filterParams.getRestaurantType()))
					filteredOrders.add(o);

			} else if (checkStatus) {
				if (o.getOrderStatus().equals(filterParams.getOrderStatus()))
					filteredOrders.add(o);
			} else
				filteredOrders.add(o);

		}

		return filteredOrders;
	}

	public ArrayList<OrderDTO> sortByRestaurantName(SortDTO sortData) {

		ArrayList<OrderDTO> sortedOrders = sortData.getOrdersToDisplay();
		
		if ( sortData.getType() == SortType.ASCENDING) {

			Collections.sort(sortedOrders, new Comparator<OrderDTO>() {
				@Override
				public int compare(final OrderDTO object1, final OrderDTO object2) {
					return object1.getRestaurant().getName().compareTo(object2.getRestaurant().getName());
				}
			});
		} else {
			Collections.sort(sortedOrders, new Comparator<OrderDTO>() {
				@Override
				public int compare(final OrderDTO object1, final OrderDTO object2) {
					return -object1.getRestaurant().getName().compareTo(object2.getRestaurant().getName());
				}
			});
		}

		return sortedOrders;

	}

	public ArrayList<OrderDTO> sortByOrderPrice(SortDTO sortData) {

		ArrayList<OrderDTO> sortedOrders = sortData.getOrdersToDisplay();
		
		if (sortData.getType() == SortType.ASCENDING) {
			
			Collections.sort(sortedOrders, new Comparator<OrderDTO>() {

				@Override
				public int compare(OrderDTO o1, OrderDTO o2) {

					return Double.compare(o1.getTotalPrice(), o2.getTotalPrice());

				}

			});

		} else {
			

			Collections.sort(sortedOrders, new Comparator<OrderDTO>() {

				@Override
				public int compare(OrderDTO o1, OrderDTO o2) {

					return -Double.compare(o1.getTotalPrice(), o2.getTotalPrice());
				}

			});

		}
		
		return sortedOrders;

	}
	
	public ArrayList<OrderDTO> sortByDate(SortDTO sortData){
		
		ArrayList<OrderDTO> sortedOrders = sortData.getOrdersToDisplay();
		
		if(sortData.getType() == SortType.ASCENDING) {
			
			Collections.sort(sortedOrders, new Comparator<OrderDTO>() {

				@Override
				public int compare(OrderDTO o1, OrderDTO o2) {

					return o1.getDate().compareTo(o2.getDate());

				}

			});
			
		} else {
			
			Collections.sort(sortedOrders, new Comparator<OrderDTO>() {

				@Override
				public int compare(OrderDTO o1, OrderDTO o2) {

					return -o1.getDate().compareTo(o2.getDate());

				}

			});
			
		}
		
		return sortedOrders;
		
	}

}
