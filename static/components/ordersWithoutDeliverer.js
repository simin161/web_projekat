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