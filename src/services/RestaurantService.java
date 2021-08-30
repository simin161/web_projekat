package services;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;

import beans.Article;
import beans.Restaurant;
import dao.ArticleDAO;
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
			newArticle.setArticleImage("../upload/" + newArticle.getArticleImage());
			/*try {
				newArticle.setArticleImage(saveImage(newArticle.getArticleImage()));
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			/*
			 * catch (IOException e) { // TODO Auto-generated catch block
			 * e.printStackTrace(); }
			 */
			ArticleDAO.getInstance().addArticle(newArticle);
			ArticleDAO.getInstance().save();

			Restaurant restaurant = RestaurantDAO.getInstance().findById(idRestaurant);
			restaurant.getArticles().add(newArticle);
			updateRestaurantList(restaurant);
		}

	}

	private String saveImage(String imageName) throws Exception {

		String imagePath = ".." + File.separator + "upload";

		// Files.copy(file.getInputStream(),filePath);
		InputStream is = null;
		OutputStream os = null;
		try {
			is = new FileInputStream(new File("/" + imageName));
			os = new FileOutputStream(new File(imagePath));
			byte[] buffer = new byte[1024];
			int length;
			while ((length = is.read(buffer)) > 0) {
				os.write(buffer, 0, length);
			}
		} finally {
			is.close();
			os.close();
		}

		return imagePath;
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
				RestaurantDAO.getInstance().getAll().set(Integer.parseInt((updatedRestaurant.getId())) - 1,
						updatedRestaurant);
				RestaurantDAO.getInstance().save();
				break;
			}
		}
	}
}
