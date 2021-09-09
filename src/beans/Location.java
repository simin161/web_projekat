package beans;

import com.google.gson.annotations.Expose;

public class Location {
	@Expose 
	private double longitude; //geografska duzina
	@Expose
	private double latitude; //geografska sirina
	@Expose
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
