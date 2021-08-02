package beans;

public class Location {
	private double longitude; //geografska duzina
	private double latitude; //geografska sirina
	private String address;
	
	public double getLongitude() {
		return longitude;
	}
	public double getLatitude() {
		return latitude;
	}
	public String getAddress() {
		return address;
	}
	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}
	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	
	
}
