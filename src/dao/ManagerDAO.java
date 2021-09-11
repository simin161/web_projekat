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

import beans.Manager;
import beans.Restaurant;

public class ManagerDAO {

	private ArrayList<Manager> allManagers;
	
	private Gson gson = new GsonBuilder().setDateFormat("yyyy-mm-dd").setPrettyPrinting().create();
	
	private static ManagerDAO instance;
	public static ManagerDAO getInstance() {
		if(instance == null) {
			instance =  new ManagerDAO();
		}
		return instance;
	}
	
	public ManagerDAO() {
		load();
	}
	
	private void load() {
		try {
			Reader reader = Files.newBufferedReader(Paths.get("data/managers.json"));
			allManagers = new ArrayList<Manager>(Arrays.asList(gson.fromJson(reader, Manager[].class)));			
			reader.close();
			
		}catch(Exception e) {
			allManagers = new ArrayList<Manager>();
			 
		}
	}
	
	public ArrayList<Manager> getAllManagers(){	
		return allManagers;
	}
	
	public void save() {
		try {
			Writer writer;
			writer = Files.newBufferedWriter(Paths.get("data/managers.json"));
			gson.toJson(allManagers, writer);
			writer.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			 
		}
	}
	
	public Manager findManagerByUsername(String username) {
		Manager manager = null;
		for(Manager m : allManagers) {
			if(username.equals(m.getUsername())) {
				manager = m;
			}
		}
		return manager;
	}
	
	public void addManager(Manager newManager) {
		
		allManagers.add(newManager);
		
	}
	
	public List<Manager> getAllManagersWithoutRestaurants(){
		
		List<Manager> managers = new ArrayList<Manager>();
		
		for(Manager m : allManagers) {
			
			if(m.getRestaurant() == null && !m.getDeleted()) {
				
				m.setRestaurant(new Restaurant());
				managers.add(m);
				
			}
			else if(m.getRestaurant().getId().equals("") && !m.getDeleted()) {
				
				managers.add(m);
				
			}
			
		}
		
		return managers;
		
	}
	
	public Manager findManagerById(String managerId) {
		
		for(Manager m : allManagers) {
			if(m.getId().equals(managerId)) {
				
				return m;
				
			}
		}
		
		return new Manager();
		
	}
	
}
