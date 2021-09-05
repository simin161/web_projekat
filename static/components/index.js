Vue.component('first-page', {
	data: function(){
		return{
			restaurants: null,
			showModal: false
		};
	},
template: `<div>
		<app-modal></app-modal>
				<ul :class="scrolled ? 'scrollRest' : 'rest'">
			    	<li><a @click="showModal = true">Pretraga</a></li>
			    </ul>
			   
			  <div class="modal" v-show="showModal">
			  <div class="modal-content">
				<span class="close" @click="showModal = false">&times;</span>
					<table style="text-align: left; margin: auto">
						<tr>
							<td><input type="text" placeholder="Naziv restorana..."></input></td>
						</tr>
						<tr>
							<td><input type="text" placeholder="Tip..."></input></td>
						</tr>
						<tr>
							<td><input type="text" placeholder="Lokacija..."></input></td>
						</tr>
						<tr>
							<td><input type="number" placeholder="Prosečna ocena..."></input></td>
						</tr>
						<tr>
							<td><input type="button" value="Pretraži"></input></td>
						</tr>
						<tr>
							<td><input @click="showOpened" type="button" value="Prikaži samo otvorene restorane"></input></td>
						</tr>
						<br/>
						<tr>
							<td>Sortiraj po (rastuće):</tr>
						</tr>
						<tr>
							<td><input type="button" @click="sortByName" value="nazivu restorana"></input></td>
						</tr>
						<tr>
							<td><input type="button" value="lokaciji"></input></td>
						</tr>
						<tr>
							<td><input type="button" @click="sortByAverageMark" value="prosečnoj oceni"></input></td>
						</tr>
						<br/>
						<tr>
							<td>Sortiraj po (opadajuće):</tr>
						</tr>
						<tr>
							<td><input type="button" value="nazivu restorana"></input></td>
						</tr>
						<tr>
							<td><input type="button" value="lokaciji"></input></td>
						</tr>
						<tr>
							<td><input type="button" value="prosečnoj oceni"></input></td>
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
					<p v-if="item.status === 'OPEN'">OTVORENO</p>
					<p v-if="item.status === 'CLOSED'">ZATVORENO</p>
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
		sortByName : function(){
			axios.get("/sortRestaurantsByName")
			.then(response => (this.restaurants = response.data))
		},
		sortByAverageMark : function(){
			axios.get("/sortRestaurantsByAverageMark")
			.then(response => (this.restaurants = response.data))
		}
	}
	,
	mounted(){
		axios.get("/getAllRestaurants")
		.then(response => (this.restaurants = response.data))
	}
});
