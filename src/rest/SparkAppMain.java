package rest;

import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.staticFiles;

import java.io.File;
import java.io.Reader;
import java.io.Writer;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.Customer;
import beans.UserInfo;

public class SparkAppMain {

	private static Gson g = new Gson();
	private static Gson gson = new GsonBuilder().setDateFormat("yyyy-mm-dd").setPrettyPrinting().create();

	public static void main(String[] args) throws Exception {
		port(9000);
		staticFiles.externalLocation(new File("./static").getCanonicalPath());
		
		post("/registerUser", (req, res) -> {
			res.type("application/json");
			
			Reader reader = Files.newBufferedReader(Paths.get("data/customers.json"));
		    List<UserInfo> users = new ArrayList<UserInfo>(Arrays.asList(gson.fromJson(reader, UserInfo[].class)));			
			reader.close();
			
		    Customer newUser = (Customer) gson.fromJson(req.body(), Customer.class);		    
		    for(UserInfo user : users) {
		    	if(newUser.getUsername().equals(user.getUsername())) {
		    		return "EXISTING USERNAME";
		    	}
		    }
		   
			Reader reader1 = Files.newBufferedReader(Paths.get("data/customers.json"));
		    List<Customer> customers = new ArrayList<Customer>(Arrays.asList(gson.fromJson(reader1, Customer[].class)));			
			reader1.close();
			
			newUser.setId(Integer.toString(customers.size() + 1));
			customers.add(newUser);
			Writer writer = Files.newBufferedWriter(Paths.get("data/customers.json"));
			gson.toJson(customers, writer);
			writer.close();
			users.add(new UserInfo(newUser.getUsername(), newUser.getPassword(), "customer"));
			Writer writer1 = Files.newBufferedWriter(Paths.get("data/users.json"));
			gson.toJson(users, writer1);
			writer1.close();
			return "SUCCESS";
		});
	}
}
