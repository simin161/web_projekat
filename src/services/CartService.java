package services;

import java.util.ArrayList;
import java.util.List;

import beans.Article;
import beans.Cart;
import beans.Customer;
import dao.ArticleDAO;
import dao.CartDAO;
import dao.CustomerDAO;

public class CartService {

	private CustomerService customerService = new CustomerService();
	
	@SuppressWarnings("unused")
	public Cart addArticle(Article newArticle, String id) {
		
		
		int index = 0;
		
		Cart cart = CustomerDAO.getInstance().findCustomerById(id).getCart();
		newArticle.setRestaurant(ArticleDAO.getInstance().findById(newArticle.getId()).getRestaurant());
		newArticle.setDeletedFromCart(false);
		
		if(cart==null) {
			cart = new Cart();
		}
		
		if(cart.getArticles() == null) {
			cart.setArticles(new ArrayList<Article>());
			cart.getArticles().add(newArticle);
		}
		else {
			
			if(!checkIfArticleExists(newArticle.getId(), cart.getArticles())){
				
				cart.getArticles().add(newArticle);
				
			}
			else {
				cart.getArticles().set(getIndexOfArticle(newArticle.getId(),cart.getArticles()), newArticle);
			}
		}
		
		
		
		CustomerDAO.getInstance().findCustomerById(id).setCart(cart);
		customerService.saveCustomerCart(CustomerDAO.getInstance().findCustomerById(id));
		
		return cart;
	}
	
	private int getIndexOfArticle(String articleId, List<Article> articles) {
		
		int index = 0;
		
		for(Article a : articles) {
			if(a.getId().equals(articleId)) {
				break;
			}
			else {
				index++;
			}
		}
		
		return index;
		
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
	
	public List<Article> getAllArticles(String userId){
		
		List<Article> articles = new ArrayList<Article>();
		
		for(Customer c : CustomerDAO.getInstance().getAllCustomers()) {
			
			if(c.getId().equals(userId)) {
				
				if(c.getCart() != null) {
					articles = c.getCart().getArticles();
				}
				else {
					
					return null;
				}
				
				break;
			}
			
		}
		
		
		
		return articles;
		
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
	
	public void removeArticleFromCart(Article article, String userId) {
		
		Cart cart = getUserCart(userId);
		
		if(cart == null) {
			cart = new Cart();
		}
		
		for(Article a : cart.getArticles()) {
			
			if(a.getId().equals(article.getId())) {
				a.setDeletedFromCart(true);
				break;
			}
			
		}
		
		customerService.saveCustomerCart(CustomerDAO.getInstance().findCustomerById(userId));
		
	}
	
	public Cart getUserCart(String userId) {
		
		Cart cart = new Cart();
		
		cart = CustomerDAO.getInstance().findCustomerById(userId).getCart();
				
		return cart;
	}
	
}
