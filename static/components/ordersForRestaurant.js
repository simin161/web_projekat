Vue.component("orders-for-restaurant", {
	data: function(){
		return{
			orders: null
		};
	}
	,
	template: `
		<div>
			<div  v-for="order in orders">
				<div class="lists">
					<span>
						<span>Status: {{order.orderStatus}}</span>
						<input v-if="order.orderStatus !== 'WAITING_FOR_DELIVERER'" type="button" @click="changeOrderStatus(order.id)" value="Promena statusa"></input>
					</span>
					<p>{{order.customer.username}}</p>
					<!---<p v-if="order.deliverer === null">Nema dostavljača</p>
					<p v-if="order.deliverer !== null">{{order.deliverer.name}} {{order.deliverer.surname}}</p>--->
					<p>Cena</p>
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
				.then(response => (this.orders = response.data))
			}
		}
		,
		mounted(){
		axios.get("/getOrdersForRestaurant")
		.then(response => (this.orders = response.data))
	}
});