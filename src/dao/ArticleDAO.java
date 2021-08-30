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

import beans.Article;
import beans.Customer;

public class ArticleDAO {
	
	private ArrayList<Article> allArticles;
	private Gson gson = new GsonBuilder().setPrettyPrinting().create();
	
	private static ArticleDAO instance;
	
	public static ArticleDAO getInstance() {
		if(instance == null) {
			instance = new ArticleDAO();
		}
		
		return instance;
	}
	
	public ArticleDAO() {
		load();
	}
	
	private void load() {
		try {
			Reader reader = Files.newBufferedReader(Paths.get("data/articles.json"));
		    allArticles = new ArrayList<Article>(Arrays.asList(gson.fromJson(reader, Article[].class)));			
			reader.close();
			
		}catch(Exception e) {
			allArticles = new ArrayList<Article>();
			e.printStackTrace();
		}
	}
	
	public ArrayList<Article> getArticlesForRestaurant(String idRestaurant){	
		
		if(idRestaurant == null) {
			return null;
		}
		
		ArrayList<Article> articles = new ArrayList<Article>();
		
		for(Article article : allArticles) {
			if(article.getRestaurant().getId().equals(idRestaurant) && !article.isDeleted()) {
				articles.add(article);
			}
		}
		
		return articles;
	}
	
	public ArrayList<Article> getAll(){
		return allArticles;
	}
	
	public void addArticle(Article newArticle) {
		allArticles.add(newArticle);
	}
	
	public void save() {
		try {
			Writer writer;
			writer = Files.newBufferedWriter(Paths.get("data/articles.json"));
			gson.toJson(allArticles, writer);
			writer.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public Article findById(String id) {
		if(id == null)
			return null;
		
		Article retVal = new Article();
		
		for(Article article : allArticles) {
			if(article.getId().equals(id)) {
				retVal = article;
				break;
			}
		}
		
		return retVal;
	}
}
