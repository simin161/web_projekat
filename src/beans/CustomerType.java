package beans;

public class CustomerType {
	private String name;
	private double discount;
	private int neededPoints;
	
	public CustomerType(String name, double discount, int neededPoints) {
		
		this.name = name;
		this.discount = discount;
		this.neededPoints = neededPoints;
		
	}
	
	public String getName() {
		return name;
	}
	public double getDiscount() {
		return discount;
	}
	public int getNeededPoints() {
		return neededPoints;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setDiscount(double discount) {
		this.discount = discount;
	}
	public void setNeededPoints(int neededPoints) {
		this.neededPoints = neededPoints;
	}
	
}
