Vue.component('users', {
	data: function() {
		return {
			usersToDisplay: null,
			selectedUser: null,
			searchParams: {

				name: "",
				surname: "",
				username: "",
				userType: null,
				customerType: null
			},
			showModalSearch: false,
			
			sortUsersDTO: {
			
				type: null,
				usersToDisplay: null
			
			}
		};
	},
	template: `<div>

		<app-modal></app-modal>

		<div class ="modal" v-show="showModalSearch">
			
			<div class="modal-content">
			
				<span class="close" @click="showModalSearch = false">&times;</span>
				
				<table style="text-align: right; margin: auto">
					<tr>
						<td align="center" colSpan="2">Pretraga</td>
					</tr>
					<tr>
						<td>Unesite ime:</td>
						<td>
							<input class="selectSearch" type="text" v-model="searchParams.name"></input>
						</td>
					</tr>
					<tr>
						<td>Unesite prezime: </td>
						<td><input class="selectSearch" type="text" v-model="searchParams.surname"></input></td>
					</tr>
					<tr>
						<td>Unesite korisničko ime: </td>
						<td><input class="selectSearch" type="text" v-model="searchParams.username"></input></td>
					</tr>
					<tr>
						<td align="center" colSpan="2"><input type="button" class="buttonSearchInModal" value="Pretraži" @click="search"></input></td>
					</tr>
					
					</br>
					
					<tr>
						<td align="center" colSpan="2">Sortiraj opadajuće po: </td>
					</tr>
					<tr>
						<td align="center" colSpan="2"><input type="button" value="Ime korisnika" class="buttonSearchInModal" @click="sortByUserName('DESCENDING')"></input></td>
					</tr>
					<tr>
						<td align="center" colSpan="2"><input type="button" value="Prezime korisnika" class="buttonSearchInModal" @click="sortByUserSurname('DESCENDING')"></input></td>
					</tr>
					<tr>
						<td align="center" colSpan="2"><input type="button" class="buttonSearchInModal" value="Korisničko ime" @click="sortByUserUsername('DESCENDING')"></input></td>
					</tr>
					<tr>
						<td align="center" colSpan="2"><input type="button" class="buttonSearchInModal" value="Broj bodova" @click="sortByPointsCollected('DESCENDING')"></input></td>
					</tr>
					
					</br>
					
					<tr>
						<td align="center" colSpan="2">Sortiraj rastuće po: </td>
					</tr>
					<tr>
						<td align="center" colSpan="2"><input type="button" value="Ime korisnika" class="buttonSearchInModal" @click="sortByUserName('ASCENDING')"></input></td>
					</tr>
					<tr>
						<td align="center" colSpan="2"><input type="button" value="Prezime korisnika" class="buttonSearchInModal" @click="sortByUserSurname('ASCENDING')"></input></td>
					</tr>
					<tr>
						<td align="center" colSpan="2"><input type="button" class="buttonSearchInModal" value="Korisničko ime" @click="sortByUserUsername('ASCENDING')"></input></td>
					</tr>
					<tr>
						<td align="center" colSpan="2"><input type="button" class="buttonSearchInModal" value="Broj bodova" @click="sortByPointsCollected('ASCENDING')"></input></td>
					</tr>
					
					</br>
				
					<tr>
						<td align="center" colSpan="2">Filtriranje</td>
					</tr>
					<tr>
						<td>Uloga: </td>
						<td>
							<select class="selectSearch" id="selectUser" name="selectUser" v-model="searchParams.userType">
								<option value="">Izaberite...</option>
								<option value="DELIVERER">Dostavljač</option>
								<option value="CUSTOMER">Kupac</option>
								<option value="MANAGER">Menadžer</option>
							</select>
						</td>
					</tr>
					<tr>
						</td>Tip kupca:</td>
						<td>
							<select class="selectSearch" id="selectCustomer" name="selectCustomer" v-model="searchParams.customerType">
								<option value="" selected="selected">Izaberite...</option>
								<option value="STANDARD">Standard</option>
								<option value="PREMIUM">Premium</option>
								<option value="LEGENDARY">Legendary</option>
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
			<button class="buttonSearchDelivery" @click="showModalSearchFunction()">Pretraži korisnike</button>
		</form>
		<hr>
		<div>
				<div v-for="item in usersToDisplay">
					<div class="lists">
						<span style="float: left; margin-top: 2.5px">
							<img style="border-radius: 5px;" src="../images/user.png" height="150px" width="150px">
						</span> 
						<span>
							<button title="Obriši korisnika" class="deleteArticle" @click="deleteUser(item)"> </button> 
						</span>
						<p>Korisničko ime: 	{{item.username}}</p>
						<p>Ime: 			{{item.name}} </p>
						<p>Prezime:			{{item.surname}} </p> 
						<p>Tip korisnika: 	{{item.userType}}</p>
						<p v-if="item.userType === 'CUSTOMER'">Broj osvojenih bodova: {{item.collectedPoints}}</p>
						<p v-if="item.userType === 'CUSTOMER'">Tip kupca: {{item.customerType}}</p>
						<br/>
						<br/>
					
					</div>
				</div>
			</div>
		</div>`
	,
	methods: {

		deleteUser: function(item) {

			axios.post("/deleteUser", item)
				.then(response => {alert("Korisnik je uspešno izbrisan!"), this.usersToDisplay = response.data})

		},
		showModalSearchFunction: function() {

			event.preventDefault();
			axios.get("/getAllUsers")
				.then(response => { this.usersToDisplay = response.data, this.showModalSearch = true; })

		},
		search : function(){
		
			axios.post("/searchUsers", this.searchParams)
			.then(response=>{this.usersToDisplay = response.data, this.sortUsersDTO.usersToDisplay = this.usersToDisplay})
		
		
		},
		
		sortByUserName : function(type){
		
			this.sortUsersDTO.type = type;
			axios.post("/sortUsersByName", this.sortUsersDTO)
			.then(response=>(this.usersToDisplay = response.data))
		
		
		},
		
		sortByUserSurname : function(type){
		
			this.sortUsersDTO.type = type;
			axios.post("/sortUsersBySurname", this.sortUsersDTO)
			.then(response=>(this.usersToDisplay = response.data))
		
		
		},
		
		sortByUserUsername : function(type){
		
			this.sortUsersDTO.type = type;
			axios.post("/sortUsersByUsername", this.sortUsersDTO)
			.then(response=>(this.usersToDisplay = response.data))
		
		
		},
		
		sortByPointsCollected : function(type){
		
			this.sortUsersDTO.type = type;
			axios.post("/sortUsersByPoints", this.sortUsersDTO)
			.then(response=>(this.usersToDisplay = response.data))
		
		
		
		},
		
		filter : function(){
		
			axios.post("/searchUsers", this.searchParams)
			.then(response=>{this.usersToDisplay = response.data, this.sortUsersDTO.usersToDisplay = this.usersToDisplay})
		
		
		}
	}
	,
	mounted() {
		axios.get("/getAllUsers")
			.then(response => {this.usersToDisplay = response.data, this.sortUsersDTO.usersToDisplay = this.usersToDisplay})
	}
});