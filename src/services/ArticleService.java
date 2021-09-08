package services;

import java.io.IOException;
import java.util.ArrayList;

import beans.Article;
import dao.ArticleDAO;

public class ArticleService {

	public ArrayList<Article> getArticlesForRestaurant(String idRestaurant) {
		return ArticleDAO.getInstance().getArticlesForRestaurant(idRestaurant);
	}

	public void deleteArticle(Article article) {

		article.setDeleted(true);
		ArticleDAO.getInstance().getAll().set(Integer.parseInt(article.getId()) - 1, article);
		ArticleDAO.getInstance().save();
	}

	public boolean editArticle(Article editedArticle) {
		boolean retVal = true;
		for (Article article : ArticleDAO.getInstance().getAll()) {
			if (article.getId().equals(editedArticle.getId())) {
				if (checkIfImageChanged(article.getArticleImage(), editedArticle.getArticleImage())) {
					try {
						editedArticle.setArticleImage(ImageService.getInstance()
								.saveImage(editedArticle.getArticleImage(), "a" + editedArticle.getId()));
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
						retVal = false;
					}
				}
				editedArticle.setRestaurant(article.getRestaurant());
				ArticleDAO.getInstance().getAll().set(Integer.parseInt(article.getId()) - 1, editedArticle);
				ArticleDAO.getInstance().save();
				break;
			}
		}
		return retVal;
	}
	
	public Article findById(String id) {
		return ArticleDAO.getInstance().findById(id);
	}

	private boolean checkIfImageChanged(String oldImage, String newImage) {

		return oldImage != null && (newImage != null && !newImage.equals("")) && !oldImage.equals(newImage);
	}
}
