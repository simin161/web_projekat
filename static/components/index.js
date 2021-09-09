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
							<td><input type="text" v-model="searchParams.type" placeholder="Tip..."></input></td>
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
							<td><input type="button" value="lokaciji"></input></td>
						</tr>
						<tr>
							<td><input type="button" @click="sortByAverageMark('ASCENDING')" value="prosečnoj oceni"></input></td>
						</tr>
						<br/>
						<tr>
							<td>Sortiraj po (opadajuće):</tr>
						</tr>
						<tr>
							<td><input type="button" @click="sortByName('DESCENDING')"  value="nazivu restorana"></input></td>
						</tr>
						<tr>
							<td><input type="button" value="lokaciji"></input></td>
						</tr>
						<tr>
							<td><input type="button" @click="sortByAverageMark('DESCENDING')" value="prosečnoj oceni"></input></td>
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
						<button class="infoRestaurant" @click="show(item)"> </button> 
					</span>
					<p>{{item.name}}</p>
					<p>{{item.restaurantType}} </p>
					<p>Prosečna ocena: {{item.averageMark}}</p>
					<p v-if="item.status === 'OPEN'" style="color: green">OTVORENO</p>
					<p v-if="item.status === 'CLOSED'" style="color: red">ZATVORENO</p>
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
		},
		showOpened : function(){
			axios.get("/getOpened")
			.then(response => (this.restaurants = response.data))
		},
		sortByName : function(type){
			axios.post("/sortRestaurantsByName", type)
			.then(response => (this.restaurants = response.data))
		},
		sortByAverageMark : function(type){
			axios.post("/sortRestaurantsByAverageMark", type)
			.then(response => (this.restaurants = response.data))
		},
		search : function(){
			axios.post("/searchRestaurants", this.searchParams)
			.then(response => (this.restaurants = response.data))
		}
	}
	,
	mounted(){
		axios.get("/getAllRestaurants")
		.then(response => (this.restaurants = response.data))
	}
});
