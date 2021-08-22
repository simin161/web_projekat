Vue.component('create-manager', {

	data: function(){
		
		return{
			showCreate: false,
			returnMessage : "",
			returnCreateMessage: "",
			managerForCreate: {
								username: "",
								name: "",
								surname: "",
								sex: "",
								dateOfBirth: null,
								restaurant: null
			
							  },
			isDisabled: true,
			backgroundColor: "#808080"
			
		};
	
	},
	
	template: `<div>
			   <navigation-header></navigation-header>
			   
			   <div style="margin-top: 100px; margin-left: 42%; margin-bottom:23%">
			   	<form>
			   		<table style="text-align: left, margin: auto">
			   		<br/>
			   			<tr>
			   				<td>Korisničko ime:</td>
			   				<td><input id="managerUsername" v-model="managerForCreate.username"/></td>
			   			</tr>
			   			<tr>
			   				<td>Ime: </td>
			   				<td><input id="managerName" v-model="managerForCreate.name"/></td>
			   			</tr>
			   			<tr>
			   				<td>Prezime: </td>
			   				<td><input id="surname" v-model="managerForCreate.managerSurname"/></td>
			   				</td>
			   			</tr>
			   			<tr>
			   				<td><input type="button" style="background-color: #597EAA; color: white" value="Kreiraj menadžera" @click="createManager()"></input></td>
			   			</tr>
			   		</table>
			   	</form>
			</div>
		</div>
	`
	,
	methods: {
	
		createManager : function(){
		
			event.preventDefault();
			axios.post('/createManager', this.managerForCreate).
			then(response =>(this.returnMessage = response.data == "SUCCESS"
			 ? router.push('/createManager') : "Nevalidni podaci!"));
		
		}
	
	}
});