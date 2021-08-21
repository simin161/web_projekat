package dao;

import java.io.Reader;
import java.io.Writer;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.Cart;

public class CartDAO {

	private ArrayList<Cart> allCarts;
	private Gson gson = new GsonBuilder().setDateFormat("yyyy-mm-dd").setPrettyPrinting().create();
	
	private static CartDAO instance;
	
	public static CartDAO getInstance() {
		if(instance == null) {
			instance = new CartDAO();
		}
		
		return instance;
	}
	
	public CartDAO() {
		load();
	}
	
	private void load() {
		
		try {
			
			Reader reader = Files.newBufferedReader(Paths.get("data/carts.json"));
			allCarts = new ArrayList<Cart>(Arrays.asList(gson.fromJson(reader, Cart.class)));
			reader.close();
		
		}catch(Exception e){
			allCarts = new ArrayList<Cart>();
			e.printStackTrace();
		}
		
	}
	
	public ArrayList<Cart> getAllCarts(){
		return allCarts;
	}
	
	public void saveCarts() {
		try {
			
			Writer writer;
			writer = Files.newBufferedWriter(Paths.get("data/carts.json"));
			gson.toJson(allCarts, writer);
			writer.close();
			
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	public void addCart(Cart newCart) {
		allCarts.add(newCart);
	}
	
	
	
}
