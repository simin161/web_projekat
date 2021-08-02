package beans;

import java.sql.Time;
import java.util.ArrayList;
import java.util.Date;

public class Order {
	private String id;
	private ArrayList<Article> articles;
	private Restaurant restaurant;
	private Date orderDate;
	private Time orderTime;
	private Customer customer;
	private OrderStatus orderStatus;
}
