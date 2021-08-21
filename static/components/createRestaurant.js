Vue.component('create-restaurant', {

	data: function(){
		
		return{
			showCreate: false,
			returnMessage : "",
			returnCreateMessage: "",
			restaurantForCreate: { name: "",
								   restaurantType: "",
								   restaurantLogo: "",
								   manager: null,
								   location: null
								 },
			managerForCreate: {
								
			
							  },
			isDisabled: true,
			backgroundColor: "#808080"
			
		};
	
	},
	
	template: `<div>
			   <header>
			   <span>Web projekat</span>
			   </header>
			   <br/>
			   
			   <div style="margin-top: 100px; margin-left: 42%; margin-bottom:23%">
			   	<form>
			   		<table style="text-align: left, margin: auto">
			   		<br/>
			   			<tr>
			   				<td>Naziv restorana: </td>
			   				<td><input id="restaurantName" v-model="restaurantForCreate.name"/></td>
			   			</tr>
			   			<tr>
			   				<td>Tip restorana: </td>
			   				<td><select name="types" id="type-select" v-model="restaurantForCreate.restaurantType">
			   						<option>Izaberite</option>
			   						<option>Tip 1</option>
			   						<option>Tip 2</option>
			   						<option>Tip 3</option>
			   						<option>Tip 4</option>
			   					</select>
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
			   				<td><input type="button" style="background-color: #597EAA; color: white" value= "+" @click="location.href='/#/createManager.js'"></input></td>
			   			</tr>
			   			<tr>
			   				<td><input type="button" style="background-color: #597EAA; color: white" value="Kreiraj restoran" @click = "createRestaurant()" backgroundColor = '#597EAA'></input></td>
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