package dto;

import java.io.File;

import beans.ArticleType;

public class ArticleDTO {
	private String id;
	private String name;
	private String price;
	private ArticleType articleType;
	private String quantity;
	private String description;
	private String articleImage;
	private String totalNumberOrdered;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
	}
	public ArticleType getArticleType() {
		return articleType;
	}
	public void setArticleType(ArticleType articleType) {
		this.articleType = articleType;
	}
	public String getQuantity() {
		return quantity;
	}
	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getArticleImage() {
		return articleImage;
	}
	public void setArticleImage(String articleImage) {
		this.articleImage = articleImage;
	}
	public String getTotalNumberOrdered() {
		return totalNumberOrdered;
	}
	public void setTotalNumberOrdered(String totalNumberOrdered) {
		this.totalNumberOrdered = totalNumberOrdered;
	} 
	
	
}
