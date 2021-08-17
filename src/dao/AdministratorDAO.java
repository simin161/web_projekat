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

import beans.Administrator;

public class AdministratorDAO {
	private ArrayList<Administrator> allAdministrators;
	
	private Gson gson = new GsonBuilder().setDateFormat("yyyy-mm-dd").setPrettyPrinting().create();
	
	public AdministratorDAO() {
		load();
	}
	
	private void load() {
		try {
			Reader reader = Files.newBufferedReader(Paths.get("data/administrators.json"));
			allAdministrators = new ArrayList<Administrator>(Arrays.asList(gson.fromJson(reader, Administrator[].class)));			
			reader.close();
			
		}catch(Exception e) {
			allAdministrators = new ArrayList<Administrator>();
			e.printStackTrace();
		}
	}
	
	public ArrayList<Administrator> getAllAdministrators(){	
		return allAdministrators;
	}
	
	public void save() {
		try {
			Writer writer;
			writer = Files.newBufferedWriter(Paths.get("data/administrators.json"));
			gson.toJson(allAdministrators, writer);
			writer.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public Administrator findAdministratorByUsername(String username) {
		Administrator administrator = null;
		for(Administrator a : allAdministrators) {
			if(username.equals(a.getUsername())) {
				administrator = a;
			}
		}
		return administrator;
	}
}
