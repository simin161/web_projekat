package dto;

public class CommentDTO {

	private String mark;
	private String comment;
	private String commentedRestaurant;
	
	public String getMark() {
		return mark;
	}
	public void setMark(String mark) {
		this.mark = mark;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public String getCommentedRestaurant() {
		return commentedRestaurant;
	}
	public void setCommentedRestaurant(String commentedRestaurant) {
		this.commentedRestaurant = commentedRestaurant;
	}
	
}
