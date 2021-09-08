package dto;

import beans.Restaurant;

public class EditedRestaurantDTO {
		Restaurant restaurant;
		boolean edited;
		public EditedRestaurantDTO(Restaurant restaurant, boolean edited) {
			this.restaurant = restaurant;
			this.edited = edited;
		}
		public Restaurant getRestaurant() {
			return restaurant;
		}
		public void setRestaurant(Restaurant restaurant) {
			this.restaurant = restaurant;
		}
		public boolean isEdited() {
			return edited;
		}
		public void setEdited(boolean edited) {
			this.edited = edited;
		}
		
		
}
