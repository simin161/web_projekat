Vue.component('first-page', {
	data: function(){
		return{
			restaurats: null
		};
	},
template: `<div>
		<app-modal></app-modal>
		<br/>
		<form class="searchForm" style="">
			<input type="text" placeholder="Naziv restorana..."/>
			<select id="tipRestorana">
				<option value="">Tip restorana</option>
			</select>
			<input type="text" placeholder="Lokacija..."/> 
			<input type="text" placeholder="Prosečna ocena"/>
			<input type="button" class="buttonSearch"/>
		</form>
		<hr>
			<div>
				<div class="restaurants" v-for="item in restaurats">
					<span style="float: left; margin-top: 15px">
						<img style="border-radius: 5px;" :src="item.restaurantLogo" height="90px" width="90px">
					</span> 
					<span>
						<button class="infoRestaurant"> </button> 
					</span>
					<p>{{item.name}}</p>
					<p>{{item.restaurantType}} </p>
					<p>POSTAVITI LOKACIJU KAD BUDE LOKACIJE</p> 
				</div>
			</div>
		</div>`
	,
	mounted(){
		axios.get("/getAllRestaurants")
		.then(response => (this.restaurats = response.data))
	}
});
