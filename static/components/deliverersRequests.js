Vue.component('deliverers-requests', {
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
					<div class="lists" v-for="item in orders">
						<div>
							<table style="width: 100%">
							<tr>
								<td>Kupac: {{item.customer.name}} {{item.customer.surname}} </td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>Restoran: {{item.restaurant.name}}</td>
								<td>Lokacija</td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>Cena: {{item.totalPrice}} </td>
								<td>Status zahteva: <span v-if="item.orderStatus === 'WAITING_FOR_RESPONSE'">Čeka na odgovor</span>
													<span v-if="item.orderStatus === 'IN_TRANSPORT'">Prihvaćen</span>
													<span v-if="item.orderStatus === 'WAITING_FOR_DELIVERER'">Odbijen</span>
								</td>
								<td></td>
							</tr>					 
							</table>
						</div>
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