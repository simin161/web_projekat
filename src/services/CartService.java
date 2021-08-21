package services;

import java.util.ArrayList;
import java.util.List;

import beans.Article;
import beans.Cart;
import dao.CartDAO;

public class CartService {

	public boolean addArticle(Article newArticle, String username) {
		
		boolean returnValue = false;
		for(Cart c : CartDAO.getInstance().getAllCarts()) {
			if(c.getCustomer().getUsername().equals(username)) {
				c.getArticles().add(newArticle);
				returnValue = true;
				break;
			}
		}
		
		
		return returnValue;
	}
	
	public boolean deleteArticle(Article articleToDelete, String username) {
		
		boolean returnValue = false;
		for(Cart c: CartDAO.getInstance().getAllCarts()) {
			if(c.getCustomer().getUsername().equals(username)) {
				c.getArticles().remove(articleToDelete);
				returnValue = true;
			}
		}
		
		return returnValue;
		
	}
	
	public boolean addMultiple(Article newArticle, int numberOfTimes, String username) {
		
		boolean returnValue = false;
		
		for(int i=0; i< numberOfTimes; i++) {
			returnValue = addArticle(newArticle, username);
		}
		
		return returnValue;
		
	}
	
	public boolean deleteMultiple(Article articleToDelete, int numberOfTimes, String username) {

		boolean returnValue = false;
		
		for(int i=0; i< numberOfTimes; i++) {
			returnValue = deleteArticle(articleToDelete, username);
		}
		
		return returnValue;
	}
	
	public List<Article> listAllArticles(String username){
		
		for(Cart c : CartDAO.getInstance().getAllCarts()) {
			if(c.getCustomer().getUsername().equals(username)) {
				return c.getArticles();
			}
		}
		
		return new ArrayList<Article>();
	}
	
}
