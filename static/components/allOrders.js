Vue.component('all-orders',{
	data: function(){
		return{
			orders: null,
			scrolled: false
		};
	}
	,
	template: `
		 <div>
		 	<navigation-header></navigation-header>
			<ul :class="scrolled ? 'scrollRest' : 'rest'">
				<li><a @click="loadAll">Sve porudžbine</a></li>
				<li><a @click="loadDelivered">Dostavljene porudžbine</a></li>
				<li><a @click="loadUndelivered">Nedostavljene porudžbine</a></li>
			</ul>

			<div style="margin-top: 6%" v-if="orders != null">
				<div class="lists" v-for="order in orders">
					<div>
						<span>Status: {{order.orderStatus}}</span>
						<span v-if="order.orderStatus === 'IN_TRANSPORT'">
							<input type="button" value="Promena statusa" @click="changeStatus(order.id)"></input>
						</span>
						<p>{{order.customer.username}}</p>
						<p>Restoran: {{order.restaurant.name}} </p>
						<p>Porudzbina</p> 
						<p>Cena</p>
					</div>
				</div>
			</div>
			<div class="animated fadeIn" v-if="orders === null">
				<img class="center" style="margin-top: 5%;" src="../images/noOrders.png"/>
			</div>
		 </div>
	`,
	methods:{
		 handleScroll () {
	    this.scrolled = window.scrollY > 0;
	  },
	  loadAll : function(){
		  axios.get("/getDeliverersOrders")
			.then(response => (this.orders = response.data))
	  },
	  loadDelivered : function(){
		  axios.get("/getDeliverersDeliveredOrders")
		  .then(response => (this.orders = response.data))
	  },
	  loadUndelivered : function(){
		  axios.get("/getDeliverersUndeliveredOrders")
		  .then(response => (this.orders = response.data))
	  },
	  changeStatus : function(id){
		  axios.post("/changeOrderStatusDeliverer", id)
		  .then(response => (this.orders = response.data))
	  }
	},
	created () {
	  window.addEventListener('scroll', this.handleScroll);
	},
	destroyed () {
	  window.removeEventListener('scroll', this.handleScroll);
	},
	mounted() {
		axios.get("/getDeliverersOrders")
		.then(response => (this.orders = response.data))
	}
});