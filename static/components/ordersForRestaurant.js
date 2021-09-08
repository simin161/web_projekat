Vue.component("orders-for-restaurant", {
	data: function(){
		return{
			orders: null,
			showModal: false,
			sortDTO: {
				ordersToDisplay: null,
				sortType: null
			},
			filterDTO:{
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
		};
	}
	,
	template: `
		<div>
		<ul style="margin-top: 6%">
			<li><a @click="showModal = true">Pretraži</a></li>
		</ul>
			<div class="modal" v-show="showModal">
			  <div class="modal-content">
				<span class="close" @click="showModal = false">&times;</span>
				<table>
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
						<td></td>
						<td>Filtriraj</td>
					</tr>
					<tr>
						<td>Status porudžbine</td>
						<td>
							<select class="selectSearch" id="selectStatus" name="selectStatus" v-model="filterDTO.orderStatus">
								<option value="">Izaberite...</option>
								<option value="PROCESSING">U obradi</option>
								<option value="IN_PREPARATION">U pripremi</option>
								<option value="WAITING_FOR_DELIVERER">Čeka na dostavljača</option>
								<!---<option value="WAITING_FOR_RESPONSE">Dostavljač čeka odgovor</option>--->
								<option value="IN_TRANSPORT">U transportu</option>
								<option value="DELIVERED">Dostavljena</option>
							</select>
						</td>
					</tr>
					<tr>
						<td></td>
						<td><input type="button" @click="filterOrders" value="Filtriraj"></input></td>
					</tr>
				</table>
			  </div>
			</div>
		
			<div  v-for="order in orders">
				<div class="lists">
					<span>
						<span>Status: {{order.orderStatus}}</span>
						<input v-if="order.orderStatus !== 'WAITING_FOR_DELIVERER' && order.orderStatus !== 'IN_TRANSPORT' && order.orderStatus !== 'DELIVERED'" type="button" @click="changeOrderStatus(order.id)" value="Promena statusa"></input>
					</span>
					<p>{{order.customer.username}}</p>
					<p>Cena: {{order.totalPrice}} dinara</p>
					<p>Datum i vreme porudžbine: {{order.date}} {{order.time}}</p>
					<p>Poručeni artikli:</p>
				</div>
				<div class="listsArticles" v-for="article in order.articles">			
					<span style="float: left;">
						<img style="border-radius: 5px;" :src="article.articleImage" height="90px" width="90px">
					</span> 
					<p>{{article.name}}</p>
					<p>Cena: {{article.price}} dinara</p>
					<p>Količina: {{article.totalNumberOrdered}}</p>
							
				</div>
			</div>
			<div class="animated fadeIn" v-if="orders === null">
				<img class="center" src="../images/noOrders.png"/>
			</div>
		</div>
		`
		,
		methods : {
			changeOrderStatus : function(orderId){
				axios.post("/changeOrderStatus", orderId)
				.then(response => {this.orders = response.data, this.sortDTO.ordersToDisplay = this.orders})
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
			filterOrders: function(type){
				axios.post("/filterCustomerOrders", this.filterDTO)
				.then(response => {this.orders = response.data, this.sortDTO.ordersToDisplay = this.orders})
			},
			search: function(){
				axios.post("/searchOrdersForRestaurantManager", this.searchParams)
				.then(response => {this.orders = response.data, this.sortDTO.ordersToDisplay = this.orders, this.filterDTO.orders = this.orders})
			}
		}
		,
		mounted(){
		axios.get("/getOrdersForRestaurant")
		.then(response => {this.orders = response.data, this.sortDTO.ordersToDisplay = this.orders, this.filterDTO.orders = this.orders})
	}
});