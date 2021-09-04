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
				<option value="">Tip 1</option>
				<option>Tip 2</option>
				<option>Tip 3</option>
			</select>
			<input type="text" placeholder="Lokacija..."/> 
			<input type="text" placeholder="Prosečna ocena"/>
			<input type="button" class="buttonSearch"/>
		</form>
		<hr>
			<div>
				<div class="lists" v-for="item in restaurats">
					<span style="float: left; margin-top: 2.5px">
						<img style="border-radius: 5px;" :src="item.restaurantLogo" height="150px" width="150px">
					</span> 
					<span>
						<button class="infoRestaurant" @click="show(item)"> </button> 
					</span>
					<p>{{item.name}}</p>
					<p>{{item.restaurantType}} </p>
					<p>POSTAVITI LOKACIJU KAD BUDE LOKACIJE</p> 
					<br/>
					<br/>
				</div>
			</div>
		</div>`
	,
	methods : {
		show : function(item){
			axios.post("/saveSelectedRestaurant", item)
			.then(respone => (router.push("/restaurant-detail")))
		}
	}
	,
	mounted(){
		axios.get("/getAllRestaurants")
		.then(response => (this.restaurats = response.data))
	}
});
