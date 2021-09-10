package dao;

import java.io.IOException;
import java.io.Reader;
import java.io.Writer;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.User;
import beans.UserType;

public class UserDAO {

	private ArrayList<User> allUsers;
	private Gson gson = new GsonBuilder().setDateFormat("yyyy-mm-dd").setPrettyPrinting().create();
	
	private static UserDAO instance;
	public static UserDAO getInstance() {
		if(instance == null) {
			instance =  new UserDAO();
		}
		return instance;
	}
	
	public UserDAO() {
		load();
	}
	
	public ArrayList<User> getAllUsers(){
		return allUsers;
	}
	
	private void load() {
		try {
			Reader reader = Files.newBufferedReader(Paths.get("data/users.json"));
		    allUsers = new ArrayList<User>(Arrays.asList(gson.fromJson(reader, User[].class)));			
			reader.close();
			
		}catch(Exception e) {
			allUsers = new ArrayList<User>();
			 

		}
	}
	
	public void save() {
		try {
			Writer writer;
			writer = Files.newBufferedWriter(Paths.get("data/users.json"));
			gson.toJson(allUsers, writer);
			writer.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			 
			
		}
	}
	
	public void addUser(User newUser) {
		allUsers.add(newUser);
	}
	
	public ArrayList<User> getAllUsersExceptAdmins(){
		
		ArrayList<User> users = new ArrayList<User>();
		
		for(User u : allUsers) {
			
			if(u.getUserType() != UserType.ADMINISTRATOR)
				users.add(u);
		}
		
		return users;
		
	}
	
}
