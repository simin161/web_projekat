package services;

import beans.Comment;
import beans.CommentStatus;
import beans.Customer;
import beans.Restaurant;
import dao.CommentDAO;
import dao.CustomerDAO;
import dao.RestaurantDAO;
import dto.CommentDTO;

public class CommentService {

	private RestaurantService restaurantService = new RestaurantService();
	
	public void changeStatus(String id, CommentStatus status) {
		for(Comment comment : CommentDAO.getInstance().getAll()) {
			if(comment.getId().equals(id)) {
				comment.setStatus(status);
				break;
			}
		}
		CommentDAO.getInstance().save();
		
	}
	
	public boolean fillComment(String customerId, CommentDTO commentDTO) {
		
		boolean retVal = false;
		
		try {
			
			Comment commentToPost = new Comment();
			
			commentToPost.setCommentedRestaurant(new Restaurant(commentDTO.getCommentedRestaurant()));
			commentToPost.setCustomer(new Customer(customerId));
			commentToPost.getCustomer().setName(CustomerDAO.getInstance().findCustomerById(customerId).getName());
			commentToPost.setId(String.valueOf(CommentDAO.getInstance().getAll().size()+1));
			commentToPost.setMark(Integer.valueOf(commentDTO.getMark()));
			commentToPost.setStatus(CommentStatus.PENDING);
			commentToPost.setText(commentDTO.getComment());
			commentToPost.setDeleted(false);
			postComment(commentToPost);
			
			retVal = true;
			
		}catch(Exception e) {
			
			e.printStackTrace();
			retVal = false;
			
		}
		
		return retVal;
		
	}
	
	private void postComment(Comment comment) {
		
		
		
		CommentDAO.getInstance().getAll().add(comment);
		CommentDAO.getInstance().save();
		
		
	}

	public void deleteComment(Comment comment) {
		
		for(Comment c : CommentDAO.getInstance().getAll()) {
			
			if(c.getId().equals(comment.getId())) {
				
				c.setDeleted(true);
				CommentDAO.getInstance().save();
				restaurantService.calculateAndSaveAverageMark(c.getCommentedRestaurant().getId());
				break;
			}
			
		}
		
	}
	
}
