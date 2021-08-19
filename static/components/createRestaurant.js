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
								
			
							  }
			
		};
	
	},
	
	template: `<div>
			   <header>
			   <span>Web projekat</span>
			   </header>
			   <br/>
			   <form>
			   	<table style=""text-align: left, margin: auto">
			   	<br/>
			   		<tr>
			   			<td>Naziv restorana: </td>
			   			<td><input id="restaurantName" v-model="restaurantForCreate.restaurantName"/></td>
			   		</tr>
			   		<tr>
			   			<td>Tip restorana: </td>
			   			<td><select name="types" id="type-select">
			   					<option value="">Izaberite</option>
			   					<option value="">Tip 1</option>
			   					<option value="">Tip 2</option>
			   					<option value="">Tip 3</option>
			   					<option value="">Tip 4</option>
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
			   		</tr>
	
	`
});