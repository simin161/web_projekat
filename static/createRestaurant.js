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
			   			<td><input id="restaurantName" v-model="restaurantForCreate.restaurantName"</td>
			   		</tr>
			   		<tr>
			   			<td>Tip restorana: </td>
			   			<td></td>
			   		</tr>
			   		<tr>
			   			<td>Lokacija: </td>
			   			<td></td>
			   		</tr>
			   		<tr>
			   			<td>Logo: </td>
			   			<td></td>
			   		</tr>
			   		<tr>
			   			<td>Menadžer: </td>
			   			<td></td>
			   		</tr>
	
	`
});