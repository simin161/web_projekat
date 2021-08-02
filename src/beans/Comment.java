package beans;

public class Comment {
	private Customer customer;
	private Restaurant commentedRestaurant;
	private String text;
	private int mark;
	
	public Customer getCustomer() {
		return customer;
	}
	public Restaurant getCommentedRestaurant() {
		return commentedRestaurant;
	}
	public String getText() {
		return text;
	}
	public int getMark() {
		return mark;
	}
	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	public void setCommentedRestaurant(Restaurant commentedRestaurant) {
		this.commentedRestaurant = commentedRestaurant;
	}
	public void setText(String text) {
		this.text = text;
	}
	public void setMark(int mark) {
		this.mark = mark;
	}
	
	
}
