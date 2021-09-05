package services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

import beans.Article;
import beans.Comment;
import beans.CommentStatus;
import beans.Restaurant;
import beans.RestaurantStatus;
import dao.ArticleDAO;
import dao.CommentDAO;
import dao.RestaurantDAO;

public class RestaurantService {

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

	public ArrayList<Comment> getAcceptedCommentsForRestaurant(String id) {
		ArrayList<Comment> retVal = new ArrayList<Comment>();

		for (Comment comment : CommentDAO.getInstance().getAll()) {
			if (comment.getCommentedRestaurant().getId().equals(id)) {
				if (comment.getStatus() == CommentStatus.ACCEPTED) {
					retVal.add(comment);
				}
			}
		}

		return retVal;
	}

	public ArrayList<Comment> getAllCommentsForRestaurant(String id) {
		ArrayList<Comment> retVal = new ArrayList<Comment>();

		for (Comment comment : CommentDAO.getInstance().getAll()) {
			if (comment.getCommentedRestaurant().getId().equals(id)) {
				retVal.add(comment);
			}
		}

		return retVal;
	}

	private boolean checkIfImageChanged(String oldImage, String newImage) {

		return oldImage != null && (newImage != null && !newImage.equals("")) && !oldImage.equals(newImage);
	}

	public ArrayList<Restaurant> getOpenRestaurants() {
		ArrayList<Restaurant> retVal = new ArrayList<Restaurant>();

		for (Restaurant r : RestaurantDAO.getInstance().getAll()) {
			if (r.getStatus() == RestaurantStatus.OPEN) {
				retVal.add(r);
			}
		}

		return retVal;
	}

	public ArrayList<Restaurant> sortByName() {
		Collections.sort(RestaurantDAO.getInstance().getAll(), new Comparator<Restaurant>() {
			@Override
			public int compare(final Restaurant object1, final Restaurant object2) {
				return object1.getName().compareTo(object2.getName());
			}
		});

		return RestaurantDAO.getInstance().getAll();
	}
	
	public ArrayList<Restaurant> sortByAverageMark(){
		Collections.sort(RestaurantDAO.getInstance().getAll(), new Comparator<Restaurant>() {
			@Override
			public int compare(final Restaurant object1, final Restaurant object2) {
				return Double.compare(object1.getAverageMark(), object2.getAverageMark());
			}
		});

		return RestaurantDAO.getInstance().getAll();
	}

	public void calculateAndSaveAverageMark(String id) {
		double sum = 0;
		double avg = 0;
		ArrayList<Comment> comments = getAcceptedCommentsForRestaurant(id);
		Restaurant restaurant = RestaurantDAO.getInstance().findById(id);
		if (comments.size() != 0) {
			for (Comment comment : comments) {
				sum += comment.getMark();
			}
			
			avg = sum/comments.size();
		}
		restaurant.setAverageMark(avg);
		RestaurantDAO.getInstance().getAll().set(Integer.parseInt(id) - 1, restaurant);
		RestaurantDAO.getInstance().save();
	}
}
