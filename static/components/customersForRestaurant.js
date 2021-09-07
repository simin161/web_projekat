Vue.component("customers-for-restaurant", {
	data: function(){
		return{
			customers: null
		};
	}
	,
	template: `
		<div>
			<div v-if="customers != null">
				<div class="lists" v-for="customer in customers">
					<div>
						<p>{{customer.username}}</p>
						<p>{{customer.name}} {{customer.surname}}</p> 
					</div>
				</div>
			</div>
			<div class="animated fadeIn" v-if="customers === null">
				<img class="center" src="../images/noCustomers.png"/>
			</div>
		</div>
		`
		,
		mounted(){
			axios.get("/getCustomersForRestaurant")
			.then(response => (this.customers = response.data))
	}
});