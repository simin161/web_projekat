package beans;

public class Article {
	private String id;
	private String name;
	private double price;
	private ArticleType articleType;
	private Restaurant restaurant;
	private double quantity;
	private String description;
	private String articleImage; //ili BufferedImage?
	
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
	
	
}
