package dto;

public class SearchRestaurantDTO {
	private String name;
	private String type;
	private String location;
	private String averageMark;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getAverageMark() {
		return averageMark;
	}
	public void setAverageMark(String averageMark) {
		this.averageMark = averageMark;
	}
	
	
}
