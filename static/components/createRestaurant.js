Vue.component('create-restaurant', {

	data: function(){
		
		return{
			showCreate: false,
			returnMessage : "",
			returnCreateMessage: "",
			restaurantForCreate: { name: "",
								   restaurantType: "",
								   location:{
								   
								   		address: ""
								   	
								   },
								   manager: {
								   
								   	id: ""
								   
								   },
								   restaurantLogo: null
								 },
			managers: null,
			isDisabled: true,
			backgroundColor: "#808080",
			message: "",
			showModal: false,
			newManager: {
			
				name: "",
				username: "",
				password: "",
				surname: "",
				sex: "",
				dateOfBirth: "",
				userType: "MANAGER"
			
			}
			
		};
	
	},
	
	template: `<div>
	
				<app-modal></app-modal>
				<div class="modal" v-show="showModal">
					<div class="modal-content">
					
						<span class="close" @click="showModal = false">&times;</span>
						<table style="text-align: left; margin: auto">
						
							<tr >
								<td>Ime: </td>
								<td> <input class="selectSearch" type="text" v-model="newManager.name"> </input> </td>
							</tr>
							<br/>
							<tr>
								<td>Prezime: </td>
								<td><input class="selectSearch" type="text" v-model="newManager.surname"></input></td>
							</tr>
							<br/>
							<tr>
								<td>Datum rođenja:</td>
								<td><input class="selectSearch" type="date" v-model="newManager.dateOfBirth"></input> </td>
							</tr>
							<br/>
							<tr>
								<td>Pol:</td>
								<td>
									<select class="selectSearch" v-model="newManager.sex" >
										<option>Muško</option>
										<option>Žensko</option>
									</select>
								</td>
							</tr>
							<br/>
							<tr>
								<td>Korisničko ime: </td>
								<td><input class="selectSearch" type="text" v-model="newManager.username"></input></td>
							</tr>
							<br/>
							<tr>
								<td>Lozinka: </td>
								<td><input class="selectSearch" type="password" v-model="newManager.password"></input></td>
							</tr>
							</br>
							</br>
							<tr>
								<td></td>
								<td><input type="button" class="buttonSearchInModal" value="Registruj korisnika" @click="registerUser()"></input></td>
							</tr>
						
						</table>
					
					</div>
				</div>
	
	
			   	<navigation-header></navigation-header>
				<br/>
			   
			   <div style="margin-top: 100px; margin-bottom:23%">
			   	<form class="formBackground">
			   		<table class="tableCreateRestaurant">
			   		<tr>
			   			<th colSpan="3" text-align="center" class="header">Unesite podatke za novi restoran</th>
			   		</tr>
			   		<br/>
			   			<tr>
			   				<td>Naziv restorana: </td>
			   				<td><input class="selectRestaurant" type="text" id="restaurantName" v-model="restaurantForCreate.name"></input></td>
			   			</tr>
			   			</br>
			   			<tr>
			   				<td>Tip restorana: </td>
			   				<td><input class="selectRestaurant" type="text" v-model="restaurantForCreate.restaurantType"></input>
			   				</td>
			   			</tr>
			   			</br>
			   			<tr>
			   				<td>Lokacija: </td>
			   				<td><input class="selectRestaurant" type="text" v-model="restaurantForCreate.location.address"></input></td>
			   			</tr>
			   			</br>
			   			<tr>
			   				<td>Logo: </td>
			   				<td><input class="selectRestaurant" type="file" @change="imageSelected"/>
			   					
			   			
			   				</td>
			   			</tr>
			   			</br>
			   			<tr>
			   				<td>Menadžer: </td>
			   				<td><select class="selectRestaurant" v-if="restaurantForCreate.manager.id === ''" v-model="restaurantForCreate.manager.id">
			   						<option value="">Izaberite</option>
			   						<option :value="manager.id" v-for="manager in managers">{{manager.name}} {{manager.surname}}</option>
			   					</select>	
			   					<select class="selectRestaurant" v-if="restaurantForCreate.manager.id != ''" v-model="restaurantForCreate.manager.id">
			   						<option :value="manager.id" v-if="restaurantForCreate.manager.id === manager.id" v-for="manager in managers">{{manager.name}} {{manager.surname}}</option>
			   					</select>
			   				</td>
			   				
			   				<td><input title="Dodaj menadžera" class="buttonAddManager" type="button" @click="showModalCreateManager()" value= "+"></input></td>
			   			</tr>
			   			</br>
			   			<tr>
			   				<td colSpan="3" align="center"><input class="buttonCreateRestaurant" type="button" value="Kreiraj restoran"  v-on:click="createRestaurant"></input></input></td>
			   			</tr>
			   		</table>
			   		<p>{{message}}</p>
			   	</form>
			</div>
		</div>`
		,
		methods: {
		
			showModalCreateManager : function(){
			
				this.showModal = true;
			
			},
			
			registerUser : function(){
			
				axios.post("/registerManagerFromRestaurant", this.newManager)
			.then(response => {alert("Menadžer je uspešno kreiran!"), this.restaurantForCreate.manager.id = response.data, mounted()})
			
			},
		
			createRestaurant : function(){
			
				axios.post("/createRestaurant", this.restaurantForCreate)
				.then(response=>(this.message= response.data))
			},
			
			imageSelected(event){
			const file = document.querySelector('input[type=file]').files[0]
			const reader = new FileReader()

			let rawImg;
			reader.onloadend = () => {
			   this.restaurantForCreate.restaurantLogo = reader.result;
			   console.log(this.restaurantForCreate.restaurantLogo);
			}
			reader.readAsDataURL(file);
			
		}
		
		},
		mounted() {
		
			axios.get("/getManagersWithoutRestaurants")
		.then(response => (this.managers = response.data))
		
		
		}
});