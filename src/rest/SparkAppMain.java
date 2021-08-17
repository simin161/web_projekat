package rest;

import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.staticFiles;

import java.io.File;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.Customer;
import beans.UserInfo;
import services.RegistrationService;
import spark.Session;

public class SparkAppMain {

	private static Gson g = new Gson();
	private static Gson gson = new GsonBuilder().setDateFormat("yyyy-mm-dd").setPrettyPrinting().create();
	private static RegistrationService registrationService = new RegistrationService();
	public static void main(String[] args) throws Exception {
		port(8080);
		staticFiles.externalLocation(new File("./static").getCanonicalPath());
				
		post("/registerUser", (req, res) -> {
			res.type("application/json");
			
			String returnValue = "FAILURE";
			
			if(registrationService.registerCustomer((Customer) gson.fromJson(req.body(), Customer.class))) {
				returnValue = "SUCCESS";
				
				Session session = req.session(true);
				req.attribute("loggedUser", registrationService.findCustomerForLogin(((Customer) 
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
								 req.attribute("loggedUser", registrationService.findCustomerForLogin(user.getUsername()));
					break;
				case "manager" : returnValue = "SUCCESS";
					break;
				case "deliverer" : returnValue = "SUCCESS";
					break;
				case "administrator" : returnValue = "SUCCESS";
					break;
			}
			
			return returnValue;
		});
	}
}
