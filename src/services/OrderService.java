package services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import beans.Article;
import beans.Cart;
import beans.Customer;
import beans.Order;
import beans.OrderStatus;
import beans.Restaurant;
import dao.CustomerDAO;
import dao.OrderDAO;
import dao.RestaurantDAO;
import dto.OrderDTO;
import dto.SearchCustomerOrdersDTO;

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

	public List<OrderDTO> searchCustomerOrders(String customerId, SearchCustomerOrdersDTO searchParams) {

		List<OrderDTO> searchedOrders = new ArrayList<OrderDTO>();

		Pattern patternName = Pattern.compile(searchParams.getRestaurantName(), Pattern.CASE_INSENSITIVE);
		// Pattern patternDateBottom = Pattern.compile(searchParams.getDateBottom(),
		// Pattern.CASE_INSENSITIVE);
		// Pattern patternDateTop = Pattern.compile(searchParams.getDateTop(),
		// Pattern.CASE_INSENSITIVE);
		// Pattern patternPriceBottom = Pattern.compile(searchParams.getPriceBottom(),
		// Pattern.CASE_INSENSITIVE);
		// Pattern patternPriceTop = Pattern.compile(searchParams.getPriceTop(),
		// Pattern.CASE_INSENSITIVE);

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

			}
			else if(matcherName.find()) {
				searchedOrders.add(o);
			}

		}

		return searchedOrders;

	}

}
