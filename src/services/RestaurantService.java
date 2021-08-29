package services;

import java.util.ArrayList;

import beans.Article;
import beans.Restaurant;
import dao.ArticleDAO;
import dao.ManagerDAO;
import dao.RestaurantDAO;

public class RestaurantService {

	public ArrayList<Restaurant> getAllRestaurants() {
		return RestaurantDAO.getInstance().getAll();
	}

	public void addArticleToRestaurant(String idRestaurant, Article newArticle) {
		newArticle.setRestaurant(new Restaurant());
		newArticle.getRestaurant().setId(idRestaurant);
		if (!checkIfArticleNameExists(idRestaurant, newArticle.getName())) {
			newArticle.setId(String.valueOf(ArticleDAO.getInstance().getAll().size() + 1));
			ArticleDAO.getInstance().addArticle(newArticle);
			ArticleDAO.getInstance().save();

			Restaurant restaurant = RestaurantDAO.getInstance().findById(idRestaurant);
			restaurant.getArticles().add(newArticle);
			updateRestaurantList(restaurant);

		}

	}

	private boolean checkIfArticleNameExists(String idRestaurant, String newArticleName) {
		Restaurant restaurant = RestaurantDAO.getInstance().findById(idRestaurant);
		restaurant.setArticles(ArticleDAO.getInstance().getArticlesForRestaurant(idRestaurant));

		for (Article article : restaurant.getArticles()) {
			if (article.getName().equals(newArticleName)) {
				return true;
			}
		}

		return false;
	}

	private void updateRestaurantList(Restaurant updatedRestaurant) {
		for (Restaurant restaurant : RestaurantDAO.getInstance().getAll()) {
			if (restaurant.getId().equals(updatedRestaurant.getId())) {
				RestaurantDAO.getInstance().getAll().set(Integer.parseInt((updatedRestaurant.getId())) - 1, updatedRestaurant);
				RestaurantDAO.getInstance().save();
				break;
			}
		}
	}
}
