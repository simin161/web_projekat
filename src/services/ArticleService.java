package services;

import java.util.ArrayList;

import beans.Article;
import dao.ArticleDAO;

public class ArticleService {

	public ArrayList<Article> getArticlesForRestaurant(String idRestaurant){
		return ArticleDAO.getInstance().getArticlesForRestaurant(idRestaurant);
	}
	
	public void deleteArticle(Article article) {
		
		article.setDeleted(true);
		ArticleDAO.getInstance().getAll().set(Integer.parseInt(article.getId()) - 1, article);
		ArticleDAO.getInstance().save();
	}
}
