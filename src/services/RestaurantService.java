package services;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.util.ArrayList;

import javax.imageio.ImageIO;

import beans.Article;
import beans.Restaurant;
import dao.ArticleDAO;
import dao.RestaurantDAO;
import javaxt.utils.Base64;

public class RestaurantService {

	public ArrayList<Restaurant> getAllRestaurants() {
		return RestaurantDAO.getInstance().getAll();
	}

	public void addArticleToRestaurant(String idRestaurant, Article newArticle) {
		newArticle.setRestaurant(new Restaurant());
		newArticle.getRestaurant().setId(idRestaurant);
		if (!checkIfArticleNameExists(idRestaurant, newArticle.getName())) {
			newArticle.setId(String.valueOf(ArticleDAO.getInstance().getAll().size() + 1));
			try {
				newArticle.setArticleImage(saveImage(newArticle.getArticleImage(), newArticle.getId()));
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			ArticleDAO.getInstance().addArticle(newArticle);
			ArticleDAO.getInstance().save();

			Restaurant restaurant = RestaurantDAO.getInstance().findById(idRestaurant);
			restaurant.getArticles().add(newArticle);
			updateRestaurantList(restaurant);
		}

	}

	private String saveImage(String file64, String id) throws Exception {

		String imagePath = ".." + File.separator + "upload";
		
		String base64Image = file64.split(",")[1];
		String ext = file64.split(",")[0].split("/")[1].split(";")[0];
		if(ext.equals("jpeg")) {
			ext = "jpg";
		}
		String imageName = "a" + id + "." + ext;
		byte[] imageBytes = Base64.decode(base64Image);

		BufferedImage img = ImageIO.read(new ByteArrayInputStream(imageBytes));
		File file = new File("static/upload/" + imageName);
		ImageIO.write(img, "jpg", file);
		imagePath  += File.separator +  file.getName();
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
