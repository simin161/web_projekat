package services;

import beans.Comment;
import beans.CommentStatus;
import dao.CommentDAO;

public class CommentService {

	public void changeStatus(String id, CommentStatus status) {
		for(Comment comment : CommentDAO.getInstance().getAll()) {
			if(comment.getId().equals(id)) {
				comment.setStatus(status);
				break;
			}
		}
		CommentDAO.getInstance().save();
		
	}

}
