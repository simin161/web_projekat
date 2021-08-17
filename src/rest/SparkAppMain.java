package rest;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.staticFiles;

import java.io.File;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.Customer;
import beans.Restaurant;
import beans.User;
import beans.UserInfo;
import services.RegistrationService;
import services.RestaurantService;
import spark.Session;

public class SparkAppMain {

	private static Gson gson = new GsonBuilder().setDateFormat("yyyy-mm-dd").setPrettyPrinting().create();
	private static RegistrationService registrationService = new RegistrationService();
	private static RestaurantService restaurantService = new RestaurantService();
	
	public static void main(String[] args) throws Exception {
		port(8080);
		staticFiles.externalLocation(new File("./static").getCanonicalPath());
				
		post("/registerUser", (req, res) -> {
			res.type("application/json");
			
			String returnValue = "FAILURE";
			
			if(registrationService.registerCustomer((Customer) gson.fromJson(req.body(), Customer.class))) {
				returnValue = "SUCCESS";
				
				Session session = req.session(true);
				req.attribute("loggedUser", registrationService.findCustomerForLogIn(((Customer) 
						gson.fromJson(req.body(), Customer.class)).getUsername()));
			}
			
			return returnValue;
		});
		
		post("/logInUser", (req, res) -> {
			res.type("application/json");
			String returnValue = "FAILURE";
			Session session = req.session(true);
			UserInfo user = (UserInfo) gson.fromJson(req.body(), UserInfo.class);
			switch(registrationService.logInUser(user)) {
				case "customer": returnValue = "SUCCESS";
								 req.attribute("loggedUser", registrationService.findCustomerForLogIn(user.getUsername()));
					break;
				case "manager" : returnValue = "SUCCESS";
								 req.attribute("loggedUser", registrationService.findManagerForLogIn(user.getUsername()));
					break;
				case "deliverer" : returnValue = "SUCCESS";
								   req.attribute("loggedUser", registrationService.findDelivererForLogIn(user.getUsername()));

					break;
				case "administrator" : returnValue = "SUCCESS";
									   req.attribute("loggedUser", registrationService.findAdministratorForLogIn(user.getUsername()));

					break;
			}
			
			return returnValue;
		});
		
		get("/logOutUser", (req, res) -> {
			Session session = req.session(true);
			User user = req.attribute("loggedUser");
			
			if(user != null) {
				session.invalidate();
			}
			return true;
		});
		
		get("/getAllRestaurants", (req, res) -> {
			res.type("application/json");
			return gson.toJson(restaurantService.getAllRestaurants());
		});
	}
}
