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
				orderStatus: "",
				orders: null
			
			},
			restaurants: null,
			sortDTO: {
				
				type: null,
				ordersToDisplay: null
			
			}
	
		};
	},
template: `<div>

		<app-modal></app-modal>
		<transition name="fade" v-on:enter="enter">
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
		</transition>
		<transition name="fade" v-on:enter="enter">
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
								<option value="">Izaberite restoran...</option>
								<option v-for="restaurant in restaurants">{{restaurant.name}}</option>
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
								<option value="">Izaberite...</option>
								<option v-for="restaurant in restaurants">{{restaurant.restaurantType}}</option>
							</select>
						</td>
					</tr>
					<tr>
						</td>Status porudžbine:</td>
						<td>
							<select class="selectSearch" id="selectStatus" name="selectStatus" v-model="filterParams.orderStatus">
								<option value="">Izaberite...</option>
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
		</transition>
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
							<button class="buttonCommentLeave" @click="showModalDialog(item)" title="Ostavite komentar" v-if="item.orderStatus === 'DELIVERED'"></button>
							<button class="buttonCustomerCancelOrder" @click="cancelOrder(item)" title="Otkaži porudžbinu" v-if="item.orderStatus === 'PROCESSING'"></button> 
					</br>
							
					</span>
					
					<p>Ime restorana: {{item.restaurant.name}}</p>
					<p>Datum kreiranja porudžbine: {{item.date}} </p>
					<p>Vreme kreiranja porudžbine: {{item.time}} </p>
					<p v-if="item.orderStatus === 'PROCESSING'">Stanje porudžbine: u obradi</p> 
					<p v-if="item.orderStatus === 'IN_PREPARATION'">Stanje porudžbine: u pripremi</p> 
					<p v-if="item.orderStatus === 'WAITING_FOR_DELIVERER'">Stanje porudžbine: čeka dostavljača</p>
					<p v-if="item.orderStatus === 'WAITING_FOR_RESPONSE'">Stanje porudžbine: čeka dostavljača</p>
					<p v-if="item.orderStatus === 'IN_TRANSPORT'">Stanje porudžbine: u transportu</p>
					<p v-if="item.orderStatus === 'DELIVERED'">Stanje porudžbine: dostavljena</p>
					
					<p>Ukupno za platiti: {{item.totalPrice}} din.</p>
					<p>Spisak naručenih artikala možete pogledati ispod.</p>
					</br>
					
				</div>
				<div class="listsArticles" v-for="article in item.articles">
						
						<table class="tableCustOrd">
						
							<tr>
								<td>Artikal: {{article.name}}</td>
    							<td rowSpan="3"><div align="right"><img style="border-radius: 5px;" :src="article.articleImage" height="30%" width="30%"></div></td>
  							</tr>
  							<tr>
    							<td>Cena: {{article.price}} din.</td>
  							</tr>
 							<tr>
    							<td>Količina: {{article.totalNumberOrdered}}</td>
 							</tr>
						
						</table>	
							
							
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
		
			event.preventDefault();
			axios.get("/getUndelivered")
			.then(response => (this.ordersToDisplay = response.data))
		
		},
		
		cancelOrder : function(item){
		
			axios.post("/cancelOrder", item.id)
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
			.then(response=>{this.ordersToDisplay = response.data, this.sortDTO.ordersToDisplay = this.ordersToDisplay, this.filterParams.orders = this.ordersToDisplay})
		
		},
		
		showModalSearchFunction : function(){
		
			event.preventDefault();
			axios.get("/getAllRestaurants")
			.then(response=>{this.restaurants = response.data, this.showModalSearch = true;})
			
		},
		
		filter : function(){
		
			axios.post("/filterCustomerOrders", this.filterParams)
			.then(response=>{this.ordersToDisplay = response.data, this.sortDTO.ordersToDisplay = this.ordersToDisplay})
		
		},
		
		sortByRestaurantName : function(type){
		
			this.sortDTO.type = type;
			axios.post("/sortOrdersByRestaurantName", this.sortDTO)
			.then(response=>(this.ordersToDisplay = response.data))
		
		},
		
		sortByPrice : function(type){
		
			this.sortDTO.type = type;
			axios.post("/sortByPrice", this.sortDTO)
			.then(response=>(this.ordersToDisplay = response.data))
		
		},
		
		sortByDate : function(type){
		
			this.sortDTO.type = type;
			axios.post("/sortByDate", this.sortDTO)
			.then(response=>(this.ordersToDisplay = response.data))
			
		},
		enter: function(el, done) {

		      var that = this;
		    }
		
		
	},
	
	mounted(){
		axios.get("/getCustomerOrders")
		.then(response => {this.ordersToDisplay = response.data, this.sortDTO.ordersToDisplay = this.ordersToDisplay, this.filterParams.orders = this.ordersToDisplay})
		
		
	}
});