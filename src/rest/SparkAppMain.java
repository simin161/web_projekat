package rest;

import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.staticFiles;

import java.awt.print.Book;
import java.io.File;
import java.io.Reader;
import java.io.Writer;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.Customer;
import beans.User;

public class SparkAppMain {

	private static Gson g = new Gson();
	private static Gson gson = new GsonBuilder().setDateFormat("yyyy-mm-dd").setPrettyPrinting().create();

	public static void main(String[] args) throws Exception {
		port(9000);
		staticFiles.externalLocation(new File("./static").getCanonicalPath());
		
		post("/registerUser", (req, res) -> {
			res.type("application/json");
			Reader reader = Files.newBufferedReader(Paths.get("data/users.json"));
		    List<User> users = Arrays.asList(gson.fromJson(reader, User[].class));			User customer = gson.fromJson(req.body(), Customer.class);
			reader.close();

			customer.setId(Integer.toString(users.size() + 1));
			
			users.add((Customer)customer);
			Writer writer = Files.newBufferedWriter(Paths.get("data/users.json"));
		    gson.toJson(users, writer);
		    writer.close();
			return "a";
		});
	}
}
