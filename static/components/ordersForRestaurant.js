Vue.component("orders-for-restaurant", {
	data: function(){
		return{
			orders: null,
			showModal: false,
			sortDTO: {
				ordersToDisplay: null,
				sortType: null
			}
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
						<td><input type="number" min="0" placeholder="od..."></input> </td>
						<td><input type="number" min="0" placeholder="do..."></input></td>
					</tr>
					<tr>
						<td>Datum porudžbine</td>
						<td><input type="date" placeholder="od..."></input> do </td>
						<td><input type="date" placeholder="do..."></input></td>
					</tr>
					<tr>
						<td></td>
						<td><input type="button" value="Pretraži/Filtriraj"></input></td>
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
			}
		}
		,
		mounted(){
		axios.get("/getOrdersForRestaurant")
		.then(response => {this.orders = response.data, this.sortDTO.ordersToDisplay = this.orders})
	}
});