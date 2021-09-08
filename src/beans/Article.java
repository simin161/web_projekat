package beans;

import java.io.File;

import com.google.gson.annotations.Expose;

import dto.ArticleDTO;

public class Article {
	@Expose
	private String id;
	private String name;
	private double price;
	private ArticleType articleType;
	private Restaurant restaurant;
	private double quantity;
	private String description;
	private String articleImage; //ili BufferedImage?
	private boolean isDeleted;
	private int totalNumberOrdered;
	private boolean isDeletedFromCart;
	
	public boolean isDeleted() {
		return isDeleted;
	}

	public void setDeleted(boolean isDeleted) {
		this.isDeleted = isDeleted;
	}

	public Article() {}
	
	@SuppressWarnings("unlikely-arg-type")
	public Article(ArticleDTO dto) {
		this.id = dto.getId();
		this.name = dto.getName();
		if(!dto.getPrice().equals(""))
			this.price = Double.parseDouble(dto.getPrice());
		
		this.articleType = dto.getArticleType();
		if(!dto.getQuantity().equals(""))
			this.quantity = Double.parseDouble(dto.getQuantity());
		
		this.description = dto.getDescription();
		this.articleImage = dto.getArticleImage();
		
	}
	
	public String getId() {
		return id;
	}
	public String getName() {
		return name;
	}
	public double getPrice() {
		return price;
	}
	public ArticleType getArticleType() {
		return articleType;
	}
	public Restaurant getRestaurant() {
		return restaurant;
	}
	public double getQuantity() {
		return quantity;
	}
	public String getDescription() {
		return description;
	}
	public String getArticleImage() {
		return articleImage;
	}
	public void setId(String id) {
		this.id = id;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public void setArticleType(ArticleType articleType) {
		this.articleType = articleType;
	}
	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}
	public void setQuantity(double quantity) {
		this.quantity = quantity;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public void setArticleImage(String articleImage) {
		this.articleImage = articleImage;
	}

	public int getTotalNumberOrdered() {
		return totalNumberOrdered;
	}

	public void setTotalNumberOrdered(int totalNumberOrdered) {
		this.totalNumberOrdered = totalNumberOrdered;
	}

	public boolean isDeletedFromCart() {
		return isDeletedFromCart;
	}

	public void setDeletedFromCart(boolean isDeletedFromCart) {
		this.isDeletedFromCart = isDeletedFromCart;
	}
	
	
}
