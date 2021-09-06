Vue.component('orders-without-deliverer', {
	data: function(){
		return{
			orders : null
		};
	},
template: ` <div>
			<navigation-header></navigation-header>
			<div class="searchForm">
			</div>
			<hr/>
			<div v-if="orders != null">
				<div class="lists" v-for="order in orders">
					<div>
						<table style="width: 100%">
						<tr>
							<td>Restoran: {{order.restaurant.name}} </td>
							<td>Korisnik: {{order.customer.username}} </td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>Lokacija restorana</td>
							<td></td>
							<td>
								<input type="button" @click="sendRequest(order.id)" value="Pošalji zahtev"></input>
							 </td>
							<td></td>
						</tr>
						<tr>
							<td>Cena porudzbine </td>
							<td></td>
							<td></td>
						</tr>					 
							</table>
						</div>
					</div>
				</div>
				<div class="animated fadeIn" v-if="orders === null">
					<img class="center" src="../images/noOrders.png"/>
				</div>
			</div>
		  `,
			methods:{
				 handleScroll () {
			    this.scrolled = window.scrollY > 0;
			  },
			  sendRequest : function(id){
				  axios.post("/sendRequest", id)
				  .then(response => (this.orders = response.data))
			  }
			},
			created () {
			  window.addEventListener('scroll', this.handleScroll);
			},
			destroyed () {
			  window.removeEventListener('scroll', this.handleScroll);
			},
			mounted(){
				axios.get("/getOrdersWithoutDeliverer")
				.then(response => (this.orders = response.data))
			}
});