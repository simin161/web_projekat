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

import beans.Deliverer;

public class DelivererDAO {
	private ArrayList<Deliverer> allDeliverers;
	
	private Gson gson = new GsonBuilder().setDateFormat("yyyy-mm-dd").setPrettyPrinting().create();
	
	private static DelivererDAO instance;
	public static DelivererDAO getInstance() {
		if(instance == null) {
			instance =  new DelivererDAO();
		}
		return instance;
	}
	
	
	public DelivererDAO() {
		load();
	}
	
	private void load() {
		try {
			Reader reader = Files.newBufferedReader(Paths.get("data/deliverers.json"));
			allDeliverers = new ArrayList<Deliverer>(Arrays.asList(gson.fromJson(reader, Deliverer[].class)));			
			reader.close();
			
		}catch(Exception e) {
			allDeliverers = new ArrayList<Deliverer>();
			 
		}
	}
	
	public ArrayList<Deliverer> getAllDeliverers(){	
		return allDeliverers;
	}
	
	public void addDeliverer(Deliverer newDeliverer) {
		
		allDeliverers.add(newDeliverer);
		
	}
	
	public void save() {
		try {
			Writer writer;
			writer = Files.newBufferedWriter(Paths.get("data/deliverers.json"));
			gson.toJson(allDeliverers, writer);
			writer.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			 
		}
	}
	
	public Deliverer findDelivererById(String id) {
		Deliverer deliverer = null;
		
		for(Deliverer d : allDeliverers) {
			if(d.getId().equals(id)) {
				deliverer = d;
				break;
			}
		}
		
		return deliverer;
	}
	
	public Deliverer findDelivererByUsername(String username) {
		Deliverer deliverer = null;
		for(Deliverer d : allDeliverers) {
			if(username.equals(d.getUsername())) {
				deliverer = d;
				break;
			}
		}
		return deliverer;
	}
}
