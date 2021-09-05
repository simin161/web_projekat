Vue.component('first-page', {
	data: function(){
		return{
			restaurats: null
		};
	},
template: `<div>
		<app-modal></app-modal>
		<search-restaurant></search-restaurant>
		<br/> 
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
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
