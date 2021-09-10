Vue.component('orders-for-acceptance', {
	data: function(){
		return{
			orders : null,
		};
	},
template: ` <div>
			<navigation-header></navigation-header>

			<br/>
			<br/>
				<div class="lists" style="cursor: default" v-for="order in orders">
					<div>
						<p>Kupac: {{order.customer.name}} {{order.customer.name}} </p>
						<p>Dostavljač: {{order.deliverer.name}} {{order.deliverer.surname}}</p>
						<p>Cena: {{order.totalPrice}} </p>
						<input @click="accept(order.id)" class="buttonAccept" type="button" value="Prihvati"></input>
						<input @click="decline(order.id)"class="buttonDecline" type="button" value="Odbaci"></input>
					</div>
					<br/>
				</div>
				<div v-if="orders === null" class="animated fadeIn">
					<img class="center" src="../images/noDelivery.jpg"/>
				</div>
			</div>
		  `
	,
	methods : {
		accept : function(id){
			axios.post("/acceptRequest", id)
			.then(response => (this.orders = response.data))
		},
		decline : function(id){
			axios.post("/declineRequest", id)
			.then(response => (this.orders = response.data))
		}
	}
	,
	mounted(){
		axios.get("/getRequests")
		.then(response => (this.orders = response.data))
	}
});