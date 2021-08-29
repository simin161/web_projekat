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
			   <navigation-header></navigation-5header>
			   
			   <div style="margin-top: 100px; margin-left: 38%; margin-bottom:23%">
			   	<form>
			   		<table style="text-align: left, margin-left:auto;margin-right:auto;">
			   		<br/>
			   			<tr>
			   				<td style="font-size: 20px">Naziv restorana: </td>
			   				<td><input style="font-size: 20px" id="restaurantName" v-model="restaurantForCreate.name"/></td>
			   			</tr>
			   			<tr>
			   				<td style="font-size: 20px">Tip restorana: </td>
			   				
			   				<td>
			   					<select style="font-size: 20px" name="types" id="type-select" v-model="restaurantForCreate.restaurantType">
			   						<option>Tip 1</option>
			   						<option>Tip 2</option>
			   						<option>Tip 3</option>
			   						<option>Tip 4</option>
			   					</select>
			   				</td>
			   				
			   			</tr>
			   			<tr>
			   				<td style="font-size: 20px">Lokacija: </td>
			   				<td></td>
			   			</tr>
			   			<tr>
			   				<td style="font-size: 20px">Logo: </td>
			   				<td><input style="font-size: 20px" type="file" name="imageFile" id="imgFile"/>
			   				
			   			
			   				</td>
			   			</tr>
			   			<tr>
			   				<td style="font-size: 20px">Menadžer: </td>
			   				<td>
			   					<select style="font-size: 20px" name="managers" id="managerSelect" >
			   						<option value="">Izaberite</option>
			   					</select>	
			   				
			   				</td>
			   				<td><input type="button" style="background-color: #597EAA; color: white" value= "+" onclick="window.location.href='/#/createManager'"></input></td>
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
				 ? router.push('/createRestaurant') : "Nevalidni podaci!"));
				
			
			}
		
		}
});