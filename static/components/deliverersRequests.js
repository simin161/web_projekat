Vue.component('deliverers-requests', {
	data: function(){
		return{
			orders : null
		};
	},
template: ` <div>
			<navigation-header></navigation-header>
			<br/>
			<br/>
			<div v-if="orders != null">
					<div class="lists" style="cursor: default" v-for="item in orders">
						<p>Kupac: {{item.customer.name}} {{item.customer.surname}} </p>
						<p>Restoran: {{item.restaurant.name}}</p>
						<p>Lokacija: {{item.restaurant.location.address}}</p>
						<p>Cena: {{item.totalPrice}} </p>
						<p>Status zahteva: <span v-if="item.orderStatus === 'WAITING_FOR_RESPONSE'">Čeka na odgovor</span>
										   <span v-if="item.orderStatus === 'IN_TRANSPORT'">Prihvaćen</span>
										   <span v-if="item.orderStatus === 'WAITING_FOR_DELIVERER'">Odbijen</span>
						</p>
					</div>
				</div>
				<div class="animated fadeIn" v-if="orders === null">
					<img class="center" src="../images/noDelivery.jpg"/>
				</div>
			</div>
			</div>
		  `,
			methods:{
				 handleScroll () {
			    this.scrolled = window.scrollY > 0;
			  }
			},
			created () {
			  window.addEventListener('scroll', this.handleScroll);
			},
			destroyed () {
			  window.removeEventListener('scroll', this.handleScroll);
			},
			mounted(){
				axios.get("/getDeliverersRequests")
				.then(response => (this.orders = response.data))
			}
});