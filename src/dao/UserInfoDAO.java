package dao;

import java.io.IOException;
import java.io.Reader;
import java.io.Writer;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.UserInfo;

public class UserInfoDAO {

	private ArrayList<UserInfo> allUsers;
	private Gson gson = new GsonBuilder().setDateFormat("yyyy-mm-dd").setPrettyPrinting().create();
	
	public UserInfoDAO() {
		load();
	}
	
	public ArrayList<UserInfo> getAllUsers(){
		return allUsers;
	}
	
	private void load() {
		try {
			Reader reader = Files.newBufferedReader(Paths.get("data/users.json"));
		    allUsers = new ArrayList<UserInfo>(Arrays.asList(gson.fromJson(reader, UserInfo[].class)));			
			reader.close();
			
		}catch(Exception e) {
			allUsers = new ArrayList<UserInfo>();
			e.printStackTrace();

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
			e.printStackTrace();
			
		}
	}
	
	public void addUser(UserInfo newUser) {
		allUsers.add(newUser);
	}
}
