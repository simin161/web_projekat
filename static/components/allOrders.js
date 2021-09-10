Vue.component('all-orders',{
	data: function(){
		return{
			orders: null,
			restaurants: null,
			sortDTO: {
				ordersToDisplay: null,
				sortType: null
			},
			filterParams:{
				 restaurantType: "",
			     orderStatus: null,
				 orders: null
			},
			searchParams: {
				
				restaurant: "",
				priceBottom: "",
				priceTop: "",
				dateBottom: "",
				dateTop: "",
				orders: null
			},
			showModalSearch : false
			
		};
	}
	,
	template: `
		 <div>
		 	<navigation-header></navigation-header>
			<ul class="rest">
				<li><a @click="loadAll">Sve porudžbine</a></li>
				<li><a @click="loadDelivered">Dostavljene porudžbine</a></li>
				<li><a @click="loadUndelivered">Nedostavljene porudžbine</a></li>
				<li><a @click="showSearch">Pretraži</a></li>
			</ul>
				<div>
				<transition name="fade" @enter="enter">
				<div class= "modal" v-show="showModalSearch">
					<div class="modal-content">
					
						<span class="close" @click="showModalSearch = false">&times;</span>
						<table style="text-align: left; margin: auto">
						
							<tr>
								<td align="center" colSpan="2">Pretraga</td>
							</tr>
							<tr>
								<td>Izaberite restoran:</td>
								<td><select class="selectSearch" id="select" name="select" v-model="searchParams.restaurant">
										<option value="">Izaberite restoran...</option>
										<option v-for="restaurant in restaurants">{{restaurant.name}}</option>
									</select>	
								</td>
							</tr>
							<tr>
								<td>Cena od: </td>
								<td><input class="selectSearch" type="number" v-model="searchParams.priceBottom"></input></td>
							</tr>
							<tr>
								<td>Cena do: </td>
								<td><input class="selectSearch" type="number" v-model="searchParams.priceTop"></input></td>
							</tr>
							<tr>
								<td>Datum od: </td>
								<td><input class="selectSearch" type="date" v-model="searchParams.dateBottom"></input></td>
							</tr>
							<tr>
								<td>Datum do: </td>
								<td><input class="selectSearch" type="date" v-model="searchParams.dateTop"></input></td>
							</tr>
							
							<tr>
								<td align="center" colSpan="2"><input type="button" class="buttonSearchInModal" @click="search" value="Pretraži"></input></td>
							</tr>
							
							</br>
							
							<tr>
								<td align="center" colSpan="2">Sortiraj opadajuće po: </td>
							</tr>
							<tr>
								<td align="center" colSpan="2"><input type="button" value="Ime restorana" class="buttonSearchInModal" @click="sortByRestaurantName('DESCENDING')"></input></td>
							</tr>
							<tr>
								<td align="center" colSpan="2"><input type="button" value="Cena" class="buttonSearchInModal" @click="sortByPrice('DESCENDING')"></input></td>
							</tr>
							<tr>
								<td align="center" colSpan="2"><input type="button" class="buttonSearchInModal" value="Datum" @click="sortByDate('DESCENDING')"></input></td>
							</tr>
							</br>
							<tr>
								<td align="center" colSpan="2">Sortiraj rastuće po: </td>
							</tr>
							<tr>
								<td align="center" colSpan="2"><input type="button" value="Ime restorana" class="buttonSearchInModal" @click="sortByRestaurantName('ASCENDING')"></input></td>
							</tr>
							<tr>
								<td align="center" colSpan="2"><input type="button" value="Cena" class="buttonSearchInModal" @click="sortByPrice('ASCENDING')"></input></td>
							</tr>
							<tr>
								<td align="center" colSpan="2"><input type="button" class="buttonSearchInModal" value="Datum" @click="sortByDate('ASCENDING')"></input></td>
							</tr>
							
							</br>
						
							<tr>
								<td align="center" colSpan="2">Filtriranje</td>
							</tr>
							<tr>
								<td>Tip restorana: </td>
								<td>
									<select class="selectSearch" id="selectType" name="selectType" v-model="filterParams.restaurantType">
										<option value="">Izaberite...</option>
										<option v-for="restaurant in restaurants">{{restaurant.restaurantType}}</option>
									</select>
								</td>
							</tr>
							<tr>
								</td>Status porudžbine:</td>
								<td>
									<select class="selectSearch" id="selectStatus" name="selectStatus" v-model="filterParams.orderStatus">
										<option value="">Izaberite...</option>
										<option value="IN_TRANSPORT">U transportu</option>
										<option value="DELIVERED">Dostavljena</option>
									</select>
								</td>
							</tr>
							<tr>
								<td align="center" colSpan="2"><input type="button" class="buttonSearchInModal" value="Filtriraj" @click="filter"></input></td>
							</tr>
							
							</br>
				
						</table>
					</div>
				</div>
				</div>
			<div style="margin-top: 6%" v-if="orders != null">
				<div class="lists" style="cursor: default" v-for="order in orders">
					<div>
						<p>Status: <span v-if="order.orderStatus === 'IN_TRANSPORT'">U transportu</span>
								   <span v-if="order.orderStatus === 'DELIVERED'">Dostavljena</span>
						</p>
						<p>{{order.customer.username}}</p>
						<p>Restoran: {{order.restaurant.name}} </p>
						<p>Lokacija: {{order.restaurant.location.address}}</p>
						<p>Cena: {{order.totalPrice}} dinara</p>
						<p>Datum i vreme porudžbine: {{order.date}} {{order.time}}</p> 
						<span v-if="order.orderStatus === 'IN_TRANSPORT'">
							<input type="button" value="Promena statusa" @click="changeStatus(order.id)"></input>
						</span>
					</div>
					<br/>
				</div>
			</div>
			<div class="animated fadeIn" v-if="orders === null">
				<img class="center" style="margin-top: 5%;" src="../images/noOrders.png"/>
			</div>
		 </div>
	`,
	methods:{

	  loadAll : function(){
		  axios.get("/getDeliverersOrders")
			.then(response => {this.orders = response.data, this.sortDTO.ordersToDisplay = this.orders, this.filterParams.orders = this.orders, this.searchParams.orders = this.orders})
	  },
	  loadDelivered : function(){
		  axios.get("/getDeliverersDeliveredOrders")
		  .then(response => {this.orders = response.data, this.sortDTO.ordersToDisplay = this.orders, this.filterParams.orders = this.orders, this.searchParams.orders = this.orders})
	  },
	  loadUndelivered : function(){
		  axios.get("/getDeliverersUndeliveredOrders")
		  .then(response => {this.orders = response.data, this.sortDTO.ordersToDisplay = this.orders, this.filterParams.orders = this.orders, this.searchParams.orders = this.orders})
	  },
	  changeStatus : function(id){
		  axios.post("/changeOrderStatusDeliverer", id)
		  .then(response => {this.orders = response.data, this.sortDTO.ordersToDisplay = this.orders, this.filterParams.orders = this.orders})
	  },
	  search: function(){
		 axios.post("/searchCustomerOrdersDeliverer", this.searchParams)
		 .then(response=>{this.orders = response.data, this.sortDTO.ordersToDisplay = this.orders, this.filterParams.orders = this.orders})
	  },
	  filter : function(){
			axios.post("/filterCustomerOrders", this.filterParams)
			.then(response=>{this.orders = response.data, this.sortDTO.ordersToDisplay = this.orders})
		
	 },
	sortByRestaurantName : function(type){
			this.sortDTO.type = type;
			axios.post("/sortOrdersByRestaurantName", this.sortDTO)
			.then(response=>(this.orders = response.data))
		
	},	
	sortByPrice : function(type){
		
		this.sortDTO.type = type;
		axios.post("/sortByPrice", this.sortDTO)
		.then(response=>(this.orders = response.data))	
		},
		
	sortByDate : function(type){		
		this.sortDTO.type = type;
		axios.post("/sortByDate", this.sortDTO)
		.then(response=>(this.orders = response.data))
		},
		showSearch : function(){
			axios.get("/getAllRestaurants")
			.then(response=>{this.restaurants = response.data, this.showModalSearch = true})
			
		},
		enter: function(el, done) {

		      var that = this;
		    }
	},
	mounted() {
		axios.get("/getDeliverersOrders")
		.then(response => {this.orders = response.data, this.sortDTO.ordersToDisplay = this.orders, this.filterParams.orders = this.orders, this.searchParams.orders = this.orders})
	}
});