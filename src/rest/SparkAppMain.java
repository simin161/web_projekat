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
			}
			
			return returnValue;
		});
		
		post("/logInUser", (req, res) -> {
			res.type("application/json");
			String returnValue = "FAILURE";
			
			if(registrationService.logInUser((UserInfo) gson.fromJson(req.body(), UserInfo.class))) {
				returnValue = "SUCCESS";
			}
			
			return returnValue;
		});
	}
}
