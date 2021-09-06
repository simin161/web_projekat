Vue.component("orders-for-restaurant", {
	data: function(){
		return{
			orders: null
		};
	}
	,
	template: `
		<div>
			<div class="lists" v-for="order in orders">
				<div>
					<span>
						<button class="orderStatus"></button>
					</span>
					<p>{{order.orderStatus}}</p>
					<p>Porudzbina</p>
					<p>Dostavljac</p> 
					<p>Cena</p>
				</div>
			</div>
			<div class="animated fadeIn" v-if="orders === null">
				<img class="center" src="../images/noOrders.png"/>
			</div>
		</div>
		`
		,
		mounted(){
		axios.get("/getOrdersForRestaurant")
		.then(response => (this.orders = response.data))
	}
});