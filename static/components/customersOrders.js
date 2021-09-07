Vue.component('customerOrders', {
	data: function(){
		return{
			ordersToDisplay: null,
			showUndeliveredOnly: false,
			commentToPost: {
								mark: "",
								comment: "",
								commentedRestaurant: ""			
			},
			showModal: false,
			showModalSearch: false,
			searchParams: {
			
				restaurant: "",
				priceBottom: "",
				priceTop: "",
				dateBottom: "",
				dateTop: ""
				
			},
			
			filterParams: {
			
				restaurantType: "",
				orderStatus: ""
			
			},
			restaurants: null
		};
	},
template: `<div>

		<app-modal></app-modal>

		<div class="modal" v-show="showModal">
			<div class="modal-content">
				
				<span class="close" @click = "showModal = false">&times;</span>
					<table style="text-align: left; margin: auto">
		
						<tr>
							<td><p class="commentMarkCustomer">Unesite ocenu:</p></td>
							<td><input type="number" v-model="commentToPost.mark" min="1" max="5" onKeyDown="return false" class="numberAddToCart"></input></td>
						</tr>
					</table>
						<p style="white-space: pre-line">Vaš komentar</p>
						<textarea class="commentSection" v-model="commentToPost.comment" palceholder="Unesite Vaš komentar..."></textarea>
						</br></br>
						<button class="aaa" @click="postComment()">Postavi komentar</button>
			</div>
		</div>

		<div class= "modal" v-show="showModalSearch">
			<div class="modal-content">
			
				<span class="close" @click="showModalSearch = false">&times;</span>
				<table style="text-align: left; margin: auto">
				
					<tr>
						<td align="center" colSpan="2">Pretraga</td>
					</tr>
					<tr>
						<td>Izaberite restoran:</td>
						<td><select class="selectSearch" id="select" name="select" v-model="searchParams.restaurant">
								<option value="restaurant.id" v-for="restaurant in restaurants">{{restaurant.name}}</option>
							</select>
						
						</td>
					</tr>
					<tr>
						<td>Cena od: </td>
						<td><input class="selectSearch" type="number" v-model="searchParams.priceBottom"></input></td>
					</tr>
					<tr>
						<td>Cena do: </td>
						<td><input class="selectSearch" type="number" v-model="searchParams.priceTop"></input></td>
					</tr>
					<tr>
						<td>Datum od: </td>
						<td><input class="selectSearch" type="date" v-model="searchParams.dateBottom"></input></td>
					</tr>
					<tr>
						<td>Datum do: </td>
						<td><input class="selectSearch" type="date" v-model="searchParams.dateTop"></input></td>
					</tr>
					
					<tr>
						<td align="center" colSpan="2"><input type="button" class="buttonSearchInModal" value="Pretraži" @click="search"></input></td>
					</tr>
					
					</br>
					
					<tr>
						<td align="center" colSpan="2">Sortiraj opadajuće po: </td>
					</tr>
					<tr>
						<td align="center" colSpan="2"><input type="button" value="Ime restorana" class="buttonSearchInModal" @click="sortByRestaurantName('DESCENDING')"></input></td>
					</tr>
					<tr>
						<td align="center" colSpan="2"><input type="button" value="Cena" class="buttonSearchInModal" @click="sortByPrice('DESCENDING')"></input></td>
					</tr>
					<tr>
						<td align="center" colSpan="2"><input type="button" class="buttonSearchInModal" value="Datum" @click="sortByDate('DESCENDING')"></input></td>
					</tr>
					</br>
					<tr>
						<td align="center" colSpan="2">Sortiraj rastuće po: </td>
					</tr>
					<tr>
						<td align="center" colSpan="2"><input type="button" value="Ime restorana" class="buttonSearchInModal" @click="sortByRestaurantName('ASCENDING')"></input></td>
					</tr>
					<tr>
						<td align="center" colSpan="2"><input type="button" value="Cena" class="buttonSearchInModal" @click="sortByPrice('ASCENDING')"></input></td>
					</tr>
					<tr>
						<td align="center" colSpan="2"><input type="button" class="buttonSearchInModal" value="Datum" @click="sortByDate('ASCENDING')"></input></td>
					</tr>
					
					</br>
				
					<tr>
						<td align="center" colSpan="2">Filtriranje</td>
					</tr>
					<tr>
						<td>Tip restorana: </td>
						<td>
							<select class="selectSearch" id="selectType" name="selectType" v-model="filterParams.restaurantType">
								<option value="restaurant.restaurantType" v-for="restaurant in restaurants">{{restaurant.restaurantType}}</option>
							</select>
						</td>
					</tr>
					<tr>
						</td>Status porudžbine:</td>
						<td>
							<select class="selectSearch" id="selectStatus" name="selectStatus" v-model="filterParams.orderStatus">
								<option value="PROCESSING">U obradi</option>
								<option value="IN_PREPARATION">U pripremi</option>
								<option value="WAITING_FOR_DELIVERER">Čeka na dostavljača</option>
								<option value="IN_TRANSPORT">U transportu</option>
								<option value="DELIVERED">Dostavljena</option>
							</select>
						</td>
					</tr>
					<tr>
						<td align="center" colSpan="2"><input type="button" class="buttonSearchInModal" value="Filtriraj" @click="filter"></input></td>
					</tr>
					
					</br>
		
					
				</table>
			</div>
		</div>

		<navigation-header></navigation-header>
		
		<form class="searchForm" style="">
			<button class="aaa" @click="showUndelivered()">Prikaži nedostavljene porudžbine</button>
			<button class="aaa" @click="showAll()">Prikaži sve porudžbine</button>
			<button class="buttonSearchDelivery" @click="showModalSearchFunction()">Pretraži porudžbine</button>
		</form>
		<hr>
			<div v-for="item in ordersToDisplay">
				<div class="lists">
					<span>
							<button class="changeArticle" @click="showModalDialog(item)" title="Ostavite komentar" v-if="item.orderStatus === 'DELIVERED'"></button>
							<button class="deleteArticle" @click="cancelOrder(item)" title="Otkaži porudžbinu" v-if="item.orderStatus === 'PROCESSING'"></button> 
					</span>
					<p>Ime restorana: {{item.restaurant.name}}</p>
					<p>Datum kreiranja porudžbine: {{item.orderDate}} </p>
					<p>Stanje porudžbine: {{item.orderStatus}}</p> 
					<p>Ukupno za platiti: {{item.totalPrice}}</p>
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
		
		},
		
		showModalDialog : function(item){
		
			this.commentToPost.commentedRestaurant = item.restaurant.id;
			this.showModal = true;
		
		},
		
		postComment : function(){
		
			axios.post("/postComment", this.commentToPost)
			.then(alert(("Vaš komentar je uspešno zabeležen i čeka odobrenje!"), this.showModal = false))
			
		},
		
		search : function(){
		
			axios.post("/searchCustomerOrders", this.searchParams)
			.then(response=>(this.ordersToDisplay = response.data))
		
		},
		
		showModalSearchFunction : function(){
		
			event.preventDefault();
			axios.get("/getAllRestaurants")
			.then(response=>{this.restaurants = response.data, this.showModalSearch = true;})
			
		},
		
		filter : function(){
		
			axios.post("/filterCustomerOrders", this.filterParams)
			.then(response=>(this.ordersToDisplay = response.data))
		
		},
		
		sortByRestaurantName : function(type){
		
			axios.post("/sortByRestaurantName", type)
			.then(response=>(this.ordersToDisplay = response.data))
		
		},
		
		sortByPrice : function(type){
		
			axios.post("/sortByPrice", type)
			.then(response=>(this.ordersToDisplay = response.data))
		
		},
		
		sortByDate : function(type){
		
			axios.post("/sortByDate", type)
			.then(response=>(this.ordersToDisplay = response.data))
			
		}
		
	},
	
	mounted(){
		axios.get("/getCustomerOrders")
		.then(response => (this.ordersToDisplay = response.data))
	}
});