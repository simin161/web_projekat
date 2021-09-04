package services;

import java.util.ArrayList;
import java.util.List;

import beans.Article;
import beans.Cart;
import dao.ArticleDAO;
import dao.CartDAO;
import dao.CustomerDAO;

public class CartService {

	@SuppressWarnings("unused")
	public Cart addArticle(Article newArticle, String id) {
		
		
		int index = 0;
		
		Cart cart = CustomerDAO.getInstance().findCustomerById(id).getCart();
		newArticle.setRestaurant(ArticleDAO.getInstance().findById(newArticle.getId()).getRestaurant());
		
		if(cart==null) {
			cart = new Cart();
		}
		
		if(cart.getArticles() == null) {
			cart.setArticles(new ArrayList<Article>());
			cart.getArticles().add(newArticle);
		}
		else {
		
			for(Article a : cart.getArticles()) {
				
				if(!checkIfArticleExists(newArticle.getId(), cart.getArticles()))
				{
					cart.getArticles().add(newArticle);
				}
				else
				{
					cart.getArticles().set(index, newArticle);
				}
				index++;
				
			}
			
			
		}
		
		
		
		CustomerDAO.getInstance().findCustomerById(id).setCart(cart);
		
		return cart;
	}
	
	
	private boolean checkIfArticleExists(String articleId, List<Article> articles) {
		
		boolean returnValue = false;
		
		for(Article a : articles) {
			if(a.getId().equals(articleId)) {
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
	
	public double totalPrice(String username) {
		
		double totalPrice=0.0;
		for(Cart c : CartDAO.getInstance().getAllCarts()) {
			if(c.getCustomer().getUsername().equals(username)) {
				for(Article a : c.getArticles()) {
					totalPrice += a.getPrice();
				}
			}
		}
		
		return totalPrice;
		
	}
	
}
