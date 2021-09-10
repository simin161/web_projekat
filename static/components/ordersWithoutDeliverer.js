Vue.component('orders-without-deliverer', {
	data: function(){
		return{
			orders : null,
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
				dateTop: ""
			},
			restaurants: null,
			showModal: false
		};
	},
template: ` <div>
			<navigation-header></navigation-header>
			<ul style="margin-top: 3%">
			<li><a @click="showSearch">Pretraži</a></li>
		</ul>
		<br/>
		<br/>
		<br/>
		<br/>
		<transition name="fade" v-on:enter="enter">
			<div class="modal" v-show="showModal">
			  <div class="modal-content">
				<span class="close" @click="showModal = false">&times;</span>
				<table>
					<tr>
						<td>Izaberite restoran:</td>
						<td><select class="selectSearch" id="select" name="select" v-model="searchParams.restaurant">
								<option value="">Izaberite restoran...</option>
								<option v-for="restaurant in restaurants">{{restaurant.name}}</option>
							</select>	
						</td>
					</tr>
					<tr>
						<td>Cena porudžbine</td>
						<td><input type="number" v-model="searchParams.priceBottom" min="0" placeholder="od..."></input> </td>
						<td><input type="number" v-model="searchParams.priceTop" min="0" placeholder="do..."></input></td>
					</tr>
					<tr>
						<td>Datum porudžbine</td>
						<td><input type="date" v-model="searchParams.dateBottom"></input> do </td>
						<td><input type="date" v-model="searchParams.dateTop"></input></td>
					</tr>
					<tr>
						<td></td>
						<td><input type="button" @click="search" value="Pretraži"></input></td>
					</tr>
					<br/>
					<tr>
						<td></td>
						<td>Sortiraj po: (rastuće)</td>
					</tr>
					<tr>
						<td></td>
						<td><input type="button" @click="sortByPrice('ASCENDING')" value="ceni porudžbine"></input></td>
					</tr>
					<tr>
						<td></td>
						<td><input type="button" @click="sortByDate('ASCENDING')" value="datumu porudžbine"></input></td>
					</tr>
					<br/>
					<tr>
						<td></td>
						<td>Sortiraj po: (opadajuće)</td>
					</tr>
					<tr>
						<td></td>
						<td><input type="button" @click="sortByPrice('DESCENDING')" value="ceni porudžbine"></input></td>
					</tr>
					<tr>
						<td></td>
						<td><input type="button" @click="sortByDate('DESCENDING')" value="datumu porudžbine"></input></td>
					</tr>
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
						<td align="center" colSpan="2"><input type="button" class="buttonSearchInModal" value="Filtriraj" @click="filter"></input></td>
					</tr>
				</table>
			  </div>
			</div>
			</transition>
			<div v-if="orders != null">
				<div class="lists" v-for="order in orders" @click="sendRequest(order.id)">
					<div>
						<p>Restoran: {{order.restaurant.name}} </p>
						<p>Korisnik: {{order.customer.username}} </p>
						<p>Lokacija restorana: {{order.restaurant.location.address}}</p>
						<p>Cena: {{order.totalPrice}} </td>
						<p class="details">Kliknite za slanje zahteva!</p>
						</div>
					</div>
				</div>
				<div class="animated fadeIn" v-if="orders === null">
					<img class="center" src="../images/noOrders.png"/>
				</div>
			</div>
		  `,
			methods:{
			  sendRequest : function(id){
				  axios.post("/sendRequest", id)
				.then(response => {this.orders = response.data, this.sortDTO.ordersToDisplay = this.orders, this.filterParams.orders = this.orders, this.searchParams.orders = this.orders})
			  },
				sortByPrice: function(type){
					this.sortDTO.type = type;
					axios.post("/sortByPrice", this.sortDTO)
					.then(response => {this.orders = response.data})
				},
				sortByDate: function(type){
					this.sortDTO.type = type;
					axios.post("/sortByDate", this.sortDTO)
					.then(response => {this.orders = response.data})
				},
				search: function(){
					axios.post("/searchOrdersWithoutDeliverer", this.searchParams)
					.then(response => {this.orders = response.data, this.filterParams.orders = this.orders, this.sortDTO.ordersToDisplay = this.orders})
				},
				showSearch : function(){
					axios.get("/getAllRestaurants")
					.then(response=>{this.restaurants = response.data, this.showModal = true})
					
				},
				  filter : function(){
						axios.post("/filterCustomerOrders", this.filterParams)
						.then(response=>{this.orders = response.data, this.sortDTO.ordersToDisplay = this.orders})
					
				 },
				enter: function(el, done) {

				      var that = this;
				    }
			},
			mounted(){
				axios.get("/getOrdersWithoutDeliverer")
				.then(response => {this.orders = response.data, this.sortDTO.ordersToDisplay = this.orders, this.filterParams.orders = this.orders, this.searchParams.orders = this.orders})
			}
});