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
import beans.Cart;
import beans.Customer;
import beans.Deliverer;
import beans.Manager;
import beans.Order;
import beans.Restaurant;
import beans.User;
import beans.UserInfo;
import dto.ArticleDTO;
import services.AdministratorService;
import services.ArticleService;
import services.CartService;
import services.CustomerService;
import services.DelivererService;
import services.ManagerService;
import services.OrderService;
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
	private static CartService cartService = new CartService();
	private static OrderService orderService = new OrderService();
	
	public static void main(String[] args) throws Exception {
		port(8080);
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
			cart.setArticles(new ArrayList<Article>());
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
		
	}
}
