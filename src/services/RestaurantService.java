package services;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.util.ArrayList;
import java.util.List;


import com.google.gson.JsonElement;
import beans.Article;
import beans.Restaurant;
import beans.RestaurantStatus;
import javax.imageio.ImageIO;
import beans.Article;
import beans.Restaurant;
import dao.ArticleDAO;
import dao.RestaurantDAO;
import javaxt.utils.Base64;

public class RestaurantService {

	public boolean createRestaurant(Restaurant newRestaurant) {
		
		boolean returnValue = false;
		
		try {
			
			newRestaurant.setId(Integer.toString(RestaurantDAO.getInstance().getAllRestaurants().size()) + 1);
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

	public List<Restaurant> getAllRestaurants() {
		
		return RestaurantDAO.getInstance().getAllRestaurants();
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
}
