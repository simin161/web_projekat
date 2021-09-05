package services;

import java.util.ArrayList;
import java.util.List;

import beans.Article;
import beans.Customer;
import beans.Restaurant;
import beans.RestaurantStatus;
import dao.ArticleDAO;
import dao.RestaurantDAO;

public class RestaurantService {

	public boolean createRestaurant(Restaurant newRestaurant) {
		
		boolean returnValue = false;
		
		try {
			
			newRestaurant.setId(Integer.toString(RestaurantDAO.getInstance().getAll().size()) + 1);
			newRestaurant.setStatus(RestaurantStatus.CLOSED);
			newRestaurant.setArticles(new ArrayList<Article>());
			RestaurantDAO.getInstance().addRestaurant(newRestaurant);
			RestaurantDAO.getInstance().saveRestaurants();
			returnValue = true;
			
		}catch(Exception e) {
			returnValue = false;
		}
		
		return returnValue;
		
	}
	
	public List<Restaurant> findRestaurantsByName(String name){
		return RestaurantDAO.getInstance().findRestaurantByName(name);
	}
	
	public ArrayList<Restaurant> getAllRestaurants() {
		return RestaurantDAO.getInstance().getAll();
	}

	public boolean addArticleToRestaurant(String idRestaurant, Article newArticle) {
		newArticle.setRestaurant(new Restaurant());
		newArticle.getRestaurant().setId(idRestaurant);
		if (!RestaurantDAO.getInstance().checkIfArticleNameExists(idRestaurant, newArticle.getName())) {
			newArticle.setId(String.valueOf(ArticleDAO.getInstance().getAll().size() + 1));
			try {

				newArticle.setArticleImage(
						ImageService.getInstance().saveImage(newArticle.getArticleImage(), "a" + newArticle.getId()));
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			ArticleDAO.getInstance().addArticle(newArticle);
			ArticleDAO.getInstance().save();

			Restaurant restaurant = RestaurantDAO.getInstance().findById(idRestaurant);
			restaurant.getArticles().add(newArticle);
			updateRestaurantList(restaurant);
			return true;
		}
		return false;

	}

	
	private void updateRestaurantList(Restaurant updatedRestaurant) {
		for (Restaurant restaurant : RestaurantDAO.getInstance().getAll()) {
			if (restaurant.getId().equals(updatedRestaurant.getId())) {
				RestaurantDAO.getInstance().getAll().set(Integer.parseInt((updatedRestaurant.getId())) - 1,
						updatedRestaurant);
				RestaurantDAO.getInstance().save();
				break;
			}
		}
	}

	public void editRestaurant(Restaurant editedRestaurant) {
		for (Restaurant restaurant : RestaurantDAO.getInstance().getAll()) {
			if (restaurant.getId().equals(editedRestaurant.getId())) {
				if (checkIfImageChanged(restaurant.getRestaurantLogo(), editedRestaurant.getRestaurantLogo())) {
					try {
						editedRestaurant.setRestaurantLogo(ImageService.getInstance()
								.saveImage(editedRestaurant.getRestaurantLogo(), "r" + editedRestaurant.getId()));
					} catch (Exception e) {
						e.printStackTrace();
					}
				}

				RestaurantDAO.getInstance().getAll().set(Integer.parseInt(restaurant.getId()) - 1, editedRestaurant);
				RestaurantDAO.getInstance().save();
				break;
			}
		}
	}

	private boolean checkIfImageChanged(String oldImage, String newImage) {
		
		return oldImage != null && (newImage != null && !newImage.equals("")) &&  !oldImage.equals(newImage);
	}
	
	public Restaurant findRestaurantById(String restaurantId) {
		
		Restaurant restaurant = new Restaurant();
		
		for(Restaurant r : RestaurantDAO.getInstance().getAll()) {
			
			if(r.getId().equals(restaurantId)) {
				restaurant = r;
				break;
			}
			
		}
		
		
		return restaurant;
	}
	
	public void addCustomerToRestaurant(String restaurantId, String customerId) {
		
		boolean indicator = false;
		
		for(Restaurant r : RestaurantDAO.getInstance().getAll()) {
			
			if(r.getId().equals(restaurantId)) {
				
				if(r.getCustomers()==null) {
					r.setCustomers(new ArrayList<Customer>());
				}
				
				indicator = checkIfCustomerExists(r.getCustomers(), customerId);
				
				if(indicator == false) {
				
					r.getCustomers().add(new Customer(customerId));
					
				}
				
			
			}
			
		}
		
		RestaurantDAO.getInstance().saveRestaurants();
		
	}
	
	private boolean checkIfCustomerExists(List<Customer> customers, String customerId) {
		
		boolean indicator = false;
		
		for(Customer c : customers) {
			
			if(c.getId().equals(customerId)) {
				indicator = true;
				break;
			}else {
				indicator = false;
			}
			
		}
		
		return indicator;
		
	}
	
}
