Vue.component('create-manager', {

	data: function(){
		
		return{
			showCreate: false,
			returnMessage : "",
			returnCreateMessage: "",
			managerForCreate: {
								managerName: "",
								managerSurname: "",
								
								
			
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
			   				<td>Ime: </td>
			   				<td><input id="managerName" v-model="managerForCreate.managerName"/></td>
			   			</tr>
			   			<tr>
			   				<td>Prezime: </td>
			   				<td><input id="managerSurname" v-model="managerForCreate.managerSurname"/></td>
			   				</td>
			   			</tr>
			   			<tr>
			   				<td>Podatak 3: </td>
			   				<td></td>
			   			</tr>
			   			<tr>
			   				<td>Podatak 4: </td>
			   				<td><input type="file" name="imageFile" id="imgFile"/>
			   				
			   			
			   				</td>
			   			</tr>
			   			<tr>
			   				<td>Podatak 5: </td>
			   				<td>
			   				</td>
			   				<td><input type="button" style="background-color: #597EAA; color: white" value= "+"></input></td>
			   			</tr>
			   			<tr>
			   				<td><input type="button" style="background-color: #597EAA; color: white" value="Kreiraj restoran" @click="isDisabled = false; backgroundColor = '#597EAA'"></input></td>
			   			</tr>
			   		</table>
			   	</form>
			</div>
		</div>
	`
});