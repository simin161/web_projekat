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
			showModal: false
			
		};
	
	},
	
	template: `<div>
	
				<app-modal></app-modal>
				<div class="modal" v-show="showModal">
					<div class="modal-content">
					
						
					
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
			   				<td><select class="selectRestaurant" v-model="restaurantForCreate.manager.id">
			   						<option value="">Izaberite</option>
			   						<option :value="manager.id" v-for="manager in managers">{{manager.name}} {{manager.surname}}</option>
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