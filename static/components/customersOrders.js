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
			<button class="aaa" @click="showUndelivered()">Prikaži nedostavljene porudžbine</button>
			<button class="aaa" @click="showAll()">Prikaži sve porudžbine</button>
		</form>
		<hr>
			<div v-for="item in ordersToDisplay">
				<div class="lists">
					<span v-if="item.orderStatus === 'PROCESSING'">
							<button class="deleteArticle" @click="cancelOrder(item)" title="Otkaži porudžbinu"></button> 
					</span>
					<p>Ime restorana: {{item.restaurant.name}}</p>
					<p>Datum kreiranja porudžbine: {{item.orderDate}} </p>
					<p>Stanje porudžbine: {{item.orderStatus}}</p> 
					<p>Artikli koji su naručeni:</p>
					
				</div>
				<div class="listsArticles" v-for="article in item.articles">
							
							<span style="float: left;">
								<img style="border-radius: 5px;" :src="article.articleImage" height="90px" width="90px">
							</span> 
							<p>{{article.name}}</p>
							<p>Cena: {{article.price}} dinara</p>
							<p>Količina: {{article.totalNumberOrdered}}</p>
							
						</div>
			</div>
		</div>`
	,
	methods: {
	
		showAll : function(){
		
			axios.get("/getCustomerOrders")
			.then(response => (this.ordersToDisplay = response.data))
			
		},
		
		showUndelivered : function(){
		
			axios.get("/getUndelivered")
			.then(response => (this.ordersToDisplay = response.data))
		
		},
		
		cancelOrder : function(item){
		
			axios.post("/cancelOrder", item)
			.then(response =>{this.ordersToDisplay = response.data, alert("Porudžbina je uspešno otkazana!")})
		
		}
	
	}
	,
	mounted(){
		axios.get("/getCustomerOrders")
		.then(response => (this.ordersToDisplay = response.data))
	}
});