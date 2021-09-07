Vue.component('orders-for-acceptance', {
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
				<div class="lists" v-for="order in orders">
					<div>
						<table style="width: 100%">
						<tr>
							<td>{{order.customer.username}} </td>
							<td> </td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>Lokacija restorana</td>
							<td></td>
							<td>
								<input type="button" @click="accept(order.id)" class="buttonAccept"></input>
								<input type="button" @click="decline(order.id)"class="buttonDecline"></input>
							 </td>
							<td></td>
						</tr>
						<tr>
							<td>Cena porudzbine </td>
							<td>{{order.deliverer.name}} {{order.deliverer.surname}}</td>
							<td></td>
							<td></td>
						</tr>					 
						</table>
					</div>
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