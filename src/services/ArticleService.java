package services;

import java.util.ArrayList;

import beans.Article;
import dao.ArticleDAO;

public class ArticleService {

	public ArrayList<Article> getArticlesForRestaurant(String idRestaurant){
		return ArticleDAO.getInstance().getArticlesForRestaurant(idRestaurant);
	}
}
