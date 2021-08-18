package rest;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.staticFiles;

import java.io.File;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.Customer;
import beans.User;
import beans.UserInfo;
import services.RegistrationService;
import spark.Session;

public class SparkAppMain {

	private static Gson g = new Gson();
	private static Gson gson = new GsonBuilder().setDateFormat("yyyy-mm-dd").setPrettyPrinting().create();
	private static RegistrationService registrationService = new RegistrationService();
	public static void main(String[] args) throws Exception {
		port(9000);
		staticFiles.externalLocation(new File("./static").getCanonicalPath());
				
		post("/registerUser", (req, res) -> {
			res.type("application/json");
			
			String returnValue = "FAILURE";
			
			if(registrationService.registerCustomer((Customer) gson.fromJson(req.body(), Customer.class))) {
				returnValue = "SUCCESS";
				
				Session session = req.session(true);
				session.attribute("loggedUser", registrationService.findCustomerForLogIn(((Customer) 
						gson.fromJson(req.body(), Customer.class)).getUsername()));
			}
			
			return returnValue;
		});
		
		post("/logInUser", (req, res) -> {
			res.type("application/json");
			String returnValue = "SUCCESS";
			Session session = req.session(true);
			UserInfo user = (UserInfo) gson.fromJson(req.body(), UserInfo.class);
			switch(registrationService.logInUser(user)) {
				case CUSTOMER: session.attribute("loggedUser", registrationService.findCustomerForLogIn(user.getUsername()));
					break;
				case MANAGER: session.attribute("loggedUser", registrationService.findManagerForLogIn(user.getUsername()));
					break;
				case DELIVERER: session.attribute("loggedUser", registrationService.findDelivererForLogIn(user.getUsername()));
					break;
				case ADMINISTRATOR : session.attribute("loggedUser", registrationService.findAdministratorForLogIn(user.getUsername()));
					break;
				default: returnValue = "FAILURE";
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
		
		get("/getLoggedUser", (req,res) ->{
			res.type("application/json");
			Session session = req.session(true);
			ArrayList<User> users = new ArrayList<User>();
			users.add(session.attribute("loggedUser"));
			return gson.toJson(users);
		});
	}
}
