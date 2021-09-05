package dao;

import java.io.IOException;
import java.io.Reader;
import java.io.Writer;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.Comment;

public class CommentDAO {

	private ArrayList<Comment> allComments;
	private Gson gson = new GsonBuilder().setDateFormat("yyyy-mm-dd").setPrettyPrinting().create();
	
	private static CommentDAO instance;
	public static CommentDAO getInstance() {
		if(instance == null) {
			instance =  new CommentDAO();
		}
		return instance;
	}
	
	public CommentDAO() {
		load();
	}
	
	public ArrayList<Comment> getAll(){
		return allComments;
	}
	
	private void load() {
		try {
			Reader reader = Files.newBufferedReader(Paths.get("data/comments.json"));
			allComments = new ArrayList<Comment>(Arrays.asList(gson.fromJson(reader, Comment[].class)));			
			reader.close();
			
		}catch(Exception e) {
			allComments = new ArrayList<Comment>();
			e.printStackTrace();

		}
	}
	
	public void save() {
		try {
			Writer writer;
			writer = Files.newBufferedWriter(Paths.get("data/comments.json"));
			gson.toJson(allComments, writer);
			writer.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			
		}
	}
}
