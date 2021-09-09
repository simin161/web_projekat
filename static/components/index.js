Vue.component('first-page', {
	data: function(){
		return{
			restaurants: null,
			showModal: false,
			searchParams: {
					name : "",
					type: "",
					location: "",
					averageMark: ""
					
			},
			loggedUser: null,
			sortDTO : {
				sortType: null,
				restaurants: null
			},
			filterDTO : {
				restaurantType : "",
				restaurants : null
			}
		};
	},
template: `<div>
			<navigation-header></navigation-header>
				<ul :class="scrolled ? 'scrollRest' : 'rest'">
			    	<li><a @click="showModal = true">Pretraga</a></li>
			    </ul>
			   
			  <div class="modal" v-show="showModal">
			  <div class="modal-content">
				<span class="close" @click="showModal = false">&times;</span>
					<table style="text-align: left; margin: auto">
						<tr>
							<td><input type="text" v-model="searchParams.name" placeholder="Naziv restorana..."></input></td>
						</tr>
						<tr>
							<td>
								<select v-model="searchParams.type">
									<option value="">Izaberite tip...</option>
									<option v-for="restaurant in restaurants" :value="restaurant.restaurantType">{{restaurant.restaurantType}}</option>
								</select>
							</td>
						</tr>
						<tr>
							<td><input type="text" v-model="searchParams.location" placeholder="Lokacija..."></input></td>
						</tr>
						<tr>
							<td><input type="number" min="0" v-model="searchParams.averageMark" placeholder="Prosečna ocena..."></input></td>
						</tr>
						<tr>
							<td><input type="button" @click="search" value="Pretraži"></input></td>
						</tr>
						<tr>
							<td><input @click="showOpened" type="button" value="Prikaži samo otvorene restorane"></input></td>
						</tr>
						<br/>
						<tr>
							<td>Sortiraj po (rastuće):</td>
						</tr>
						<tr>
							<td><input type="button" @click="sortByName('ASCENDING')" value="nazivu restorana"></input></td>
						</tr>
						<tr>
							<td><input type="button" @click="sortByLocation('ASCENDING')" value="lokaciji"></input></td>
						</tr>
						<tr>
							<td><input type="button" @click="sortByAverageMark('ASCENDING')" value="prosečnoj oceni"></input></td>
						</tr>
						<br/>
						<tr>
							<td>Sortiraj po (opadajuće):</td>
						</tr>
						<tr>
							<td><input type="button" @click="sortByName('DESCENDING')"  value="nazivu restorana"></input></td>
						</tr>
						<tr>
							<td><input type="button" @click="sortByLocation('DESCENDING')" value="lokaciji"></input></td>
						</tr>
						<tr>
							<td><input type="button" @click="sortByAverageMark('DESCENDING')" value="prosečnoj oceni"></input></td>
						</tr>
						<tr>
							<td>Filtriranje</td>
						</tr>
						<tr>
							<select v-model="filterDTO.restaurantType">
								<option value="">Izaberite tip...</option>
								<option v-for="restaurant in restaurants" :value="restaurant.restaurantType">{{restaurant.restaurantType}}</option>
							</select>
						</tr>
						<tr>
							<input type="button" value="Filtriraj" @click="filter"></input>
						</tr>
					</table>
			  </div>
			</div>
		<br/> 
		<br/>
		<br/>
		<br/>
		<br/>
		<br/>
			<div>
				<div class="lists" v-for="item in restaurants">
					<span style="float: left; margin-top: 2.5px">
						<img style="border-radius: 5px;" :src="item.restaurantLogo" height="150px" width="150px">
					</span> 
					<span>
						<button title="Otvori stranicu restorana" class="infoRestaurant" @click="show(item)"> </button> 
					</span>
					<p>{{item.name}}</p>
					<p>{{item.restaurantType}} </p>
					<p>Prosečna ocena: {{item.averageMark}}</p>
					<p v-if="item.status === 'OPEN'" style="color: green">OTVORENO</p>
					<p v-if="item.status === 'CLOSED'" style="color: red">ZATVORENO</p>
					<p>{{item.location.address}}</p> 
					<br/>
					<br/>
				</div>
			</div>
		</div>`
	,
	methods : {
		show : function(item){
			axios.post("/saveSelectedRestaurant", item)
			.then(respone => {
				if(this.loggedUser != null && this.loggedUser.userType == 'MANAGER' && this.loggedUser.restaurant.id == item.id){
					router.push("/show-restaurant")
				}
				else if(this.loggedUser != null && this.loggedUser.userType == 'CUSTOMER'){
					
					router.push("/showRestaurantForCustomer");
				}
				else if(this.loggedUser != null && this.loggedUser.userType == 'ADMINISTRATOR'){
				
					router.push("/restaurantPageAdmin");
				
				}
				else{
					router.push("/restaurant-detail")
				}
			})
		},
		showOpened : function(){
			axios.get("/getOpened")
			.then(response =>  {this.restaurants = response.data, this.sortDTO.restaurants = this.restaurants, this.filterDTO.restaurants = this.restaurants })
		},
		sortByName : function(type){
			this.sortDTO.sortType = type
			axios.post("/sortRestaurantsByName", this.sortDTO)
			.then(response => (this.restaurants = response.data))
		},
		sortByAverageMark : function(type){
			this.sortDTO.sortType = type
			axios.post("/sortRestaurantsByAverageMark", this.sortDTO)
			.then(response => (this.restaurants = response.data))
		},
		sortByLocation : function(type){
			this.sortDTO.sortType = type
			axios.post("/sortRestaurantsByLocation", this.sortDTO)
			.then(response => (this.restaurants = response.data))
		},
		search : function(){
			axios.post("/searchRestaurants", this.searchParams)
			.then(response =>  {this.restaurants = response.data, this.sortDTO.restaurants = this.restaurants, this.filterDTO.restaurants = this.restaurants })
		},
		filter : function(){
			axios.post("/filterRestaurantsByType", this.filterDTO)
			.then(response =>  {this.restaurants = response.data, this.sortDTO.restaurants = this.restaurants, this.filterDTO.restaurants = this.restaurants })
		}
	}
	,
	mounted(){
		axios.get("/getAllRestaurants")
		.then(response => {this.restaurants = response.data, this.sortDTO.restaurants = this.restaurants, this.filterDTO.restaurants = this.restaurants })
		
		axios.get("/getLoggedUser")
		.then(response=>(this.loggedUser = response.data[0]))
	}
});
