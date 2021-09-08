package dto;

import beans.Article;

public class EditedArticleDTO {

	private Article article;
	private boolean edited;
	
	public EditedArticleDTO(Article article, boolean edited) {
		this.article = article;
		this.edited = edited;
	}

	public Article getArticle() {
		return article;
	}

	public void setArticle(Article article) {
		this.article = article;
	}

	public boolean isEdited() {
		return edited;
	}

	public void setEdited(boolean edited) {
		this.edited = edited;
	}
}
