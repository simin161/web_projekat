Vue.component('customerOrders', {
	data: function(){
		return{
			ordersToDisplay: null,
			showUndeliveredOnly: false
		};
	},
template: `<div>
		<navigation-header></navigation-header>
		<form class="searchForm" style="">
			<input type="checkbox" id="checkbox" v-model="showUndeliveredOnly">
			<label for="checkbox">Prikaži samo nedostavljene porudžbine</label>
		</form>
		<hr>
			<div>
				<div class="lists" v-for="item in ordersToDisplay">
					<p>Ime restorana: {{item.restaurant.name}}</p>
					<p>Datum kreiranja porudžbine: {{item.orderDate}} </p>
					<p>Stanje porudžbine: {{item.orderStatus}}</p> 
						<div class="listsArticles" v-for="article in item.articles">
							
						</div>
					<br/>
					<br/>
				</div>
			</div>
		</div>`
	,
	methods: {
	
		
	
	}
	,
	mounted(){
		axios.get("/getCustomerOrders")
		.then(response => (this.ordersToDisplay = response.data))
	}
});