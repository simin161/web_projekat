Vue.component('create-restaurant', {

	data: function(){
		
		return{
			showCreate: false,
			returnMessage : "",
			returnCreateMessage: "",
			restaurantForCreate: { restaurantName: "",
								   restaurantType: "",
								   restaurantLocation: "",
								   restaurantLogo: "",
								   restaurantManager: ""
								 },
			managerForCreate: {
								
			
							  },
			isDisabled: true,
			backgroundColor: "#808080"
			
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
			   				<td><input id="restaurantName" v-model="restaurantForCreate.restaurantName"></input></td>
			   			</tr>
			   			<tr>
			   				<td>Tip restorana: </td>
			   				<td><input type="text" v-model="restaurantForCreate.restaurantType"></input>
			   				</td>
			   			</tr>
			   			<tr>
			   				<td>Lokacija: </td>
			   				<td></td>
			   			</tr>
			   			<tr>
			   				<td>Logo: </td>
			   				<td><input type="file" name="imageFile" id="imgFile"/>
			   				
			   			
			   				</td>
			   			</tr>
			   			<tr>
			   				<td>Menadžer: </td>
			   				<td><select name="managers" id="managerSelect">
			   						<option value="">Izaberite</option>
			   					</select>	
			   				</td>
			   				<td><input type="button" style="background-color: #597EAA; color: white" value= "+" on-click="location.href='/#/createManager.js'"></input></td>
			   			</tr>
			   			<tr>
			   				<td><input type="button" style="background-color: #597EAA; color: white" value="Kreiraj restoran" @click="isDisabled = false; backgroundColor = '#597EAA'" on-click = "createRestaurant()"></input></td>
			   			</tr>
			   		</table>
			   	</form>
			</div>
		</div>`
		,
		methods: {
		
			createRestaurant : function(){
			
				event.preventDefault();
				axios.post('/createRestaurant', this.restaurantForCreate).
				then(response =>(this.returnMessage = response.data == "SUCCESS" 
				 ? router.push('/welcome-page') : "Nevalidni podaci!"));
				
			
			}
		
		}
});