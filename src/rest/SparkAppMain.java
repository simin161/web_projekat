package rest;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.staticFiles;

import java.io.File;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.Administrator;
import beans.Article;
import beans.Comment;
import beans.CommentStatus;
import beans.Cart;
import beans.Customer;
import beans.Deliverer;
import beans.Manager;
import beans.Order;
import beans.Restaurant;
import beans.SortType;
import beans.User;
import beans.UserInfo;
import dto.ArticleDTO;
import services.*;
import dto.SearchRestaurantDTO;
import services.RegistrationService;
import services.RestaurantService;
import spark.Session;

public class SparkAppMain {

	private static Gson gson = new GsonBuilder().setDateFormat("yyyy-mm-dd").setPrettyPrinting().create();
	private static RegistrationService registrationService = new RegistrationService();
	private static RestaurantService restaurantService = new RestaurantService();
	private static CustomerService customerService = new CustomerService();
	private static ManagerService managerService = new ManagerService();
	private static AdministratorService administratorService = new AdministratorService();
	private static DelivererService delivererService = new DelivererService();
	private static ArticleService articleService = new ArticleService();
	private static CommentService commentService = new CommentService();
	private static CartService cartService = new CartService();
	private static OrderService orderService = new OrderService();

	
	public static void main(String[] args) throws Exception {
		port(9000);
		staticFiles.externalLocation(new File("./static").getCanonicalPath());

		post("/registerUser", (req, res) -> {
			res.type("application/json");

			String returnValue = "FAILURE";

			if (registrationService.registerCustomer((Customer) gson.fromJson(req.body(), Customer.class))) {
				returnValue = "SUCCESS";

				Session session = req.session(true);
				session.attribute("loggedUser", registrationService
						.findCustomerForLogIn(((Customer) gson.fromJson(req.body(), Customer.class)).getUsername()));
			}

			return returnValue;
		});

		post("/logInUser", (req, res) -> {
			res.type("application/json");
			String returnValue = "SUCCESS";
			Session session = req.session(true);
			UserInfo user = (UserInfo) gson.fromJson(req.body(), UserInfo.class);
			switch (registrationService.logInUser(user)) {
			case CUSTOMER:
				session.attribute("loggedUser", registrationService.findCustomerForLogIn(user.getUsername()));
				break;
			case MANAGER:
				session.attribute("loggedUser", registrationService.findManagerForLogIn(user.getUsername()));
				break;
			case DELIVERER:
				session.attribute("loggedUser", registrationService.findDelivererForLogIn(user.getUsername()));
				break;
			case ADMINISTRATOR:
				session.attribute("loggedUser", registrationService.findAdministratorForLogIn(user.getUsername()));
				break;
			default:
				returnValue = "FAILURE";
			}

			return returnValue;
		});

		get("/logOutUser", (req, res) -> {

			Session session = req.session(true);
			User user = req.attribute("loggedUser");

			if (user != null) {
				session.invalidate();
			}
			return true;
		});
		
		get("/getAllRestaurants", (req, res) -> {
			res.type("application/json");
			return gson.toJson(restaurantService.getAllRestaurants());
		});

		get("/getLoggedUser", (req, res) -> {
			
			res.type("application/json");
			Session session = req.session(true);
			ArrayList<User> users = new ArrayList<User>();
			users.add(session.attribute("loggedUser"));
			return gson.toJson(users);
			
		});

		post("/editProfile", (req, res) -> {
			res.type("application/json");
			Session session = req.session(true);
			User editedUser = null;
			try {
				editedUser = gson.fromJson(req.body(), User.class);
			} catch (Exception e) {
				return "Pogresni podaci";
			}
			boolean returnValue = false;

			if (editedUser.getDateOfBirth() != null && !editedUser.getName().trim().equals("")
					&& !editedUser.getSurname().trim().equals("") && !editedUser.getUsername().trim().equals("")
					&& !editedUser.getPassword().trim().equals("")) {

				User user = session.attribute("loggedUser");
				if (user != null) {
					switch (user.getUserType()) {
					case CUSTOMER:
						returnValue = customerService.editCustomer(gson.fromJson(req.body(), Customer.class));
						if (returnValue)
							session.attribute("loggedUser", registrationService
									.findCustomerForLogIn(gson.fromJson(req.body(), Customer.class).getUsername()));
						break;
					case MANAGER:
						returnValue = managerService.editManager(gson.fromJson(req.body(), Manager.class));
						if (returnValue)
							session.attribute("loggedUser", registrationService
									.findManagerForLogIn(gson.fromJson(req.body(), Manager.class).getUsername()));
						break;
					case DELIVERER:
						returnValue = delivererService.editDeliverer(gson.fromJson(req.body(), Deliverer.class));
						if (returnValue)
							session.attribute("loggedUser", registrationService
									.findDelivererForLogIn(gson.fromJson(req.body(), Deliverer.class).getUsername()));
						break;
					case ADMINISTRATOR:
						returnValue = administratorService
								.editAdministrator(gson.fromJson(req.body(), Administrator.class));
						if (returnValue)
							session.attribute("loggedUser", registrationService.findAdministratorForLogIn(
									gson.fromJson(req.body(), Administrator.class).getUsername()));
						break;
					default:
					}
				}
			}

			return returnValue ? "Uspesna izmena podataka" : "Pogresni podaci!";
		});

		get("/restaurantForManager", (req, res) -> {
			res.type("application/json");
			Session session = req.session(true);
			Manager loggedManager = session.attribute("loggedUser");
			Restaurant restaurant = managerService.findRestaurantForManager(loggedManager);
			ArrayList<Restaurant> returnValue = new ArrayList<Restaurant>();
			returnValue.add(restaurant);
			return gson.toJson(returnValue);
		});

		post("/placeOrder", (req, res)-> {
			res.type("application/json");
			Session session = req.session(true);
			Customer loggedCustomer = session.attribute("loggedUser");
			Cart cart = loggedCustomer.getCart();
			cart.setCartId(loggedCustomer.getId());
			boolean ret = orderService.createOrderFromCart(cart);
			Restaurant restaurant = restaurantService.findRestaurantById(cart.getArticles().get(0).getRestaurant().getId());
			restaurantService.addCustomerToRestaurant(restaurant.getId(), loggedCustomer.getId());
			customerService.refreshCart(loggedCustomer.getId());
			return ret ? "Uspešno ste kreirali porudžbinu!" : "Došlo je do greške prilikom kreiranja porudžbine!";
			
		});
		
		post("/addArticle", (req, res) -> {
			res.type("application/json");
			Article article = new Article(gson.fromJson(req.body(), ArticleDTO.class));
			Session session = req.session(true);
			Manager loggedManager = session.attribute("loggedUser");
			boolean ret = restaurantService.addArticleToRestaurant(loggedManager.getRestaurant().getId(), article);
			
			return ret ? "Uspešno ste dodali artikal!" : "Naziv artikla već postoji!";
		});

		get("/getArticlesForRestaurant", (req, res) -> {
			Session session = req.session(true);
			Manager loggedManager = session.attribute("loggedUser");
			return gson.toJson(articleService.getArticlesForRestaurant(loggedManager.getRestaurant().getId()));
		});
		
		get("/getSelectedRestaurant", (req, res)-> {
			
			res.type("application/json");
			Session session = req.session(true);
			Restaurant selectedRestaurant = session.attribute("selectedRestaurant");
			return gson.toJson(articleService.getArticlesForRestaurant(selectedRestaurant.getId()));
			
		});
		
		get("/getCartArticles", (req, res) ->{
			
			res.type("application/json");
			Session session = req.session(true);
			Customer loggedCustomer = session.attribute("loggedUser");
			return gson.toJson(cartService.getAllArticles(loggedCustomer.getId()));
			
		});
		
		get("/getCustomerOrders", (req, res)-> {
			
			res.type("application/json");
			Session session = req.session(true);
			Customer loggedCustomer = session.attribute("loggedUser");
			return gson.toJson(orderService.findAllOrdersFromCustomer(loggedCustomer.getId()));
			
		});
		
		get("/getUndelivered", (req, res)-> {
			
			res.type("application/json");
			Session session = req.session(true);
			Customer loggedCustomer = session.attribute("loggedUser");
			return gson.toJson(orderService.findUndeliveredOrdersForCustomer(loggedCustomer.getId()));
			
		});
		
		get("/getTotalPoints", (req, res)->{
			
			res.type("application/json");
			Session session = req.session(true);
			Customer loggedCustomer= session.attribute("loggedUser");
			
			return gson.toJson(customerService.getPoints(loggedCustomer.getId()));
			
		});
		
		post("/cancelOrder", (req, res) -> {
			res.type("application/json");
			orderService.deleteOrder(gson.fromJson(req.body(), Order.class));
			Session session = req.session(true);
			Customer loggedCustomer = session.attribute("loggedUser");
			return gson.toJson(orderService.findAllOrdersFromCustomer(loggedCustomer.getId()));
		});
		
		post("/createRestaurant", (req, res) -> {
			res.type("application/json");
			Session session = req.session(true);
			
			String returnValue = "FAILURE";

			if(restaurantService.createRestaurant((Restaurant) gson.fromJson(req.body(), Restaurant.class))){
				returnValue = "SUCCESS";
			}

			return returnValue;
		});
		
		get("/restaurantForManager", (req, res)->{
		
			return "FAILURE";
		
		});

		post("/editRestaurant", (req, res) -> {

			res.type("application/json");
			restaurantService.editRestaurant(gson.fromJson(req.body(), Restaurant.class));
			
			Session session = req.session(true);
			Manager loggedManager = session.attribute("loggedUser");
			Restaurant restaurant = managerService.findRestaurantForManager(loggedManager);
			ArrayList<Restaurant> returnValue = new ArrayList<Restaurant>();
			returnValue.add(restaurant);
			return gson.toJson(returnValue);
		});
		
		post("/deleteArticle", (req, res) -> {
			res.type("application/json");
			articleService.deleteArticle(gson.fromJson(req.body(), Article.class));
			Session session = req.session(true);
			Manager loggedManager = session.attribute("loggedUser");
			Restaurant restaurant = managerService.findRestaurantForManager(loggedManager);
			return gson.toJson(articleService.getArticlesForRestaurant(restaurant.getId()));
		});
		
		post("/removeFromCart", (req, res) -> {
			
			res.type("application/json");
			Session session = req.session(true);
			Customer loggedCustomer = session.attribute("loggedUser");
			cartService.removeArticleFromCart(gson.fromJson(req.body(), Article.class), loggedCustomer.getId());
			return gson.toJson(cartService.getAllArticles(loggedCustomer.getId()));
			
		});
		
		post("/selectRestaurant", (req, res) -> {
			Session session = req.session(true);
			Restaurant restaurant = gson.fromJson(req.body(), Restaurant.class);
			restaurant.setArticles(articleService.getArticlesForRestaurant(restaurant.getId()));
			session.attribute("selectedRestaurant", gson.fromJson(req.body(), Restaurant.class));
			return "SUCCESS";
		});
		
		post("/updateCart", (req, res) -> {
			Session session = req.session(true);
			Article article = new Article(gson.fromJson(req.body(), ArticleDTO.class));
			Customer loggedCustomer = session.attribute("loggedUser");
			
			loggedCustomer.setCart(cartService.addArticle(article, loggedCustomer.getId()));
			session.attribute("loggedUser", loggedCustomer);
			return "SUCCESS";
		});
		
		post("/showArticle", (req, res) -> {
			Session session = req.session(true);
			session.attribute("article", gson.fromJson(req.body(), Article.class));
			return "SUCCESS";
		});
		
		get("/getChoosenArticle", (req, res) -> {
			res.type("application/json");
			Session session = req.session(true);
			ArrayList<Article> articles = new ArrayList<Article>();
			articles.add(session.attribute("article"));
			return gson.toJson(articles);
		});
		
		post("/editArticle", (req, res) -> {
			res.type("application/json");
			Article editedArticle = new Article(gson.fromJson(req.body(), ArticleDTO.class));
			articleService.editArticle(editedArticle);
			Session session = req.session(true);
			session.attribute("article", articleService.findById(editedArticle.getId()));
			ArrayList<Article> articles = new ArrayList<Article>();
			articles.add(session.attribute("article"));
			return gson.toJson(articles);
		});
		
		post("/saveSelectedRestaurant", (req, res) -> {
			res.type("application/json");
			Session session = req.session(true);
			session.attribute("selectedRestaurant", gson.fromJson(req.body(), Restaurant.class));
			return "SUCCESS"; 
		});
		
		get("/getSelectedRestaurant", (req, res) -> {
			res.type("application/json");
			Session session = req.session(true);
			Restaurant selectedRestaurant =session.attribute("selectedRestaurant");
			selectedRestaurant.setArticles(articleService.getArticlesForRestaurant(selectedRestaurant.getId()));
			ArrayList<Restaurant> retVal = new ArrayList<Restaurant>();
			retVal.add(selectedRestaurant);
			return gson.toJson(retVal);
		});
		
		get("/getCommentsForRestaurant", (req, res) -> {
			res.type("application/json");
			Session session = req.session(true);
			Restaurant selectedRestaurant = session.attribute("selectedRestaurant");
			ArrayList<Comment> comments = restaurantService.getAcceptedCommentsForRestaurant(selectedRestaurant.getId());
			return gson.toJson(comments);
		});
		
		get("getAllCommentsForRestaurant", (req, res)->{
			res.type("application/json");
			Session session = req.session(true);
			Manager loggedManager = session.attribute("loggedUser");
			return gson.toJson(restaurantService.getAllCommentsForRestaurant(loggedManager.getRestaurant().getId()));
		});
		
		post("/declineComment", (req, res)->{
			res.type("application/json");
			commentService.changeStatus(gson.fromJson(req.body(), String.class), CommentStatus.DECLINED);
			Session session = req.session(true);
			Manager loggedManager = session.attribute("loggedUser");
			return gson.toJson(restaurantService.getAllCommentsForRestaurant(loggedManager.getRestaurant().getId()));
		});
		
		post("/acceptComment", (req, res)->{
			res.type("application/json");
			commentService.changeStatus(gson.fromJson(req.body(), String.class), CommentStatus.ACCEPTED);
			Session session = req.session(true);
			Manager loggedManager = session.attribute("loggedUser");
			restaurantService.calculateAndSaveAverageMark(loggedManager.getRestaurant().getId());
			return gson.toJson(restaurantService.getAllCommentsForRestaurant(loggedManager.getRestaurant().getId()));
		});
		
		get("/getOpened", (req, res)->{
			res.type("application/json");
			return gson.toJson(restaurantService.getOpenRestaurants());
		
		});
		
		post("/sortRestaurantsByName", (req, res) -> {
			res.type("application/json");
			SortType type = gson.fromJson(req.body(), SortType.class);
			return gson.toJson(restaurantService.sortByName(type));
		});
		
		post("/sortRestaurantsByAverageMark", (req, res) -> {
			res.type("application/json");
			SortType type = gson.fromJson(req.body(), SortType.class);
			return gson.toJson(restaurantService.sortByAverageMark(type));
		});
		
		post("/searchRestaurants", (req, res) -> {
			res.type("application/json");
			SearchRestaurantDTO searchParams = gson.fromJson(req.body(), SearchRestaurantDTO.class);
			return gson.toJson(restaurantService.search(searchParams));
		});
		
		get("/getCustomersForRestaurant", (req, res) -> {
			res.type("application/json");
			Session session = req.session(true);
			Manager loggedManager = session.attribute("loggedUser");
			return gson.toJson(restaurantService.getAllCustomersForRestaurant(loggedManager.getRestaurant().getId()));
		});
		
		get("/getOrdersForRestaurant", (req, res) -> {
			res.type("application/json");
			Session session = req.session(true);
			Manager loggedManager = session.attribute("loggedUser");
			return gson.toJson(orderService.getAllOrdersForRestaurant(loggedManager.getRestaurant().getId()));
		});
		
		post("/changeOrderStatus", (req, res) -> {
			res.type("application/json");
			orderService.changeOrderStatus(gson.fromJson(req.body(), String.class), true);
			Session session = req.session(true);
			Manager loggedManager = session.attribute("loggedUser");
			return gson.toJson(orderService.getAllOrdersForRestaurant(loggedManager.getRestaurant().getId()));
		});
		
		get("/getDeliverersOrders", (req, res) -> {
			res.type("application/json");
			Session session = req.session(true);
			Deliverer loggedDeliverer = session.attribute("loggedUser");
			return gson.toJson(delivererService.getDeliverersOrders(loggedDeliverer.getId()));
		});
		
		get("/getDeliverersDeliveredOrders", (req, res) -> {
			res.type("application/json");
			Session session = req.session(true);
			Deliverer loggedDeliverer = session.attribute("loggedUser");
			return gson.toJson(delivererService.getDeliverersDeliveredOrders(loggedDeliverer.getId()));
		});
		
		get("/getDeliverersUndeliveredOrders", (req, res) -> {
			res.type("application/json");
			Session session = req.session(true);
			Deliverer loggedDeliverer = session.attribute("loggedUser");
			return gson.toJson(delivererService.getDeliverersUndeliveredOrders(loggedDeliverer.getId()));
		});
		
		get("/getOrdersWithoutDeliverer", (req, res) -> {
			res.type("application/json");
			return gson.toJson(orderService.getOrdersWithoutDeliverer());
		});
		
		post("/sendRequest", (req, res) -> {
			res.type("application/json");
			String id = gson.fromJson(req.body(), String.class);
			orderService.changeOrderStatus(gson.fromJson(req.body(), String.class), true);
			Session session = req.session(true);
			Deliverer loggedDeliverer = session.attribute("loggedUser");
			orderService.setDelivererForOrder(id, loggedDeliverer.getId());
			return gson.toJson(orderService.getOrdersWithoutDeliverer());
		});
		
		get("/getRequests", (req, res) -> {
			res.type("application/json");
			Session session = req.session(true);
			Manager loggedManager = session.attribute("loggedUser");
			return gson.toJson(orderService.getOrdersWaitingForResponse(loggedManager.getRestaurant().getId()));
		});
		
		post("/acceptRequest", (req, res) -> {
			res.type("application/json");
			orderService.changeOrderStatus(gson.fromJson(req.body(), String.class), true);
			delivererService.addOrderToDeliverer(gson.fromJson(req.body(), String.class));
			Session session = req.session(true);
			Manager loggedManager = session.attribute("loggedUser");
			return gson.toJson(orderService.getOrdersWaitingForResponse(loggedManager.getRestaurant().getId()));
		});
		
		post("/declineRequest", (req, res) -> {
			res.type("application/json");
			orderService.changeOrderStatus(gson.fromJson(req.body(), String.class), false);
			Session session = req.session(true);
			Manager loggedManager = session.attribute("loggedUser");
			return gson.toJson(orderService.getOrdersWaitingForResponse(loggedManager.getRestaurant().getId()));
		});
		
		post("/changeOrderStatusDeliverer", (req, res) -> {
			res.type("application/json");
			orderService.changeOrderStatus(gson.fromJson(req.body(), String.class), true);
			Session session = req.session(true);
			Deliverer loggedDeliverer = session.attribute("loggedUser");
			return gson.toJson(delivererService.getDeliverersOrders(loggedDeliverer.getId()));
		});
	}
}
