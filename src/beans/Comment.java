package beans;

public class Comment {
	private String id;
	private Customer customer;
	private Restaurant commentedRestaurant;
	private String text;
	private int mark;
	private boolean accepted;
	
	public boolean isAccepted() {
		return accepted;
	}
	public void setAccepted(boolean accepted) {
		this.accepted = accepted;
	}
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
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	
	
}
