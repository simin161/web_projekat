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
			message: ""
			
		};
	
	},
	
	template: `<div>
			   <navigation-header></navigation-header>
				<br/>
			   
			   <div style="margin-top: 100px; margin-left: 42%; margin-bottom:23%">
			   	<form>
			   		<table style="text-align: left, margin: auto">
			   		<br/>
			   			<tr>
			   				<td>Naziv restorana: </td>
			   				<td><input type="text" id="restaurantName" v-model="restaurantForCreate.name"></input></td>
			   			</tr>
			   			<tr>
			   				<td>Tip restorana: </td>
			   				<td><input type="text" v-model="restaurantForCreate.restaurantType"></input>
			   				</td>
			   			</tr>
			   			<tr>
			   				<td>Lokacija: </td>
			   				<td><input type="text" v-model="restaurantForCreate.location.address"></input></td>
			   			</tr>
			   			<tr>
			   				<td>Logo: </td>
			   				<td><input type="file" @change="imageSelected"/>
			   					
			   			
			   				</td>
			   			</tr>
			   			<tr>
			   				<td>Menadžer: </td>
			   				<td><select v-model="restaurantForCreate.manager.id">
			   						<option value="">Izaberite</option>
			   						<option :value="manager.id" v-for="manager in managers">{{manager.name}} {{manager.surname}}</option>
			   					</select>	
			   				</td>
			   				
			   				<td><input type="button" style="background-color: #597EAA; color: white" value= "+"></input></td>
			   			</tr>
			   			<tr>
			   				<td><input type="button" value="Kreiraj restoran"  v-on:click="createRestaurant"></input></input></td>
			   			</tr>
			   		</table>
			   		<p>{{message}}</p>
			   	</form>
			</div>
		</div>`
		,
		methods: {
		
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