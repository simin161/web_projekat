Vue.component('edit-profile', {
	data: function(){
		return{
			loggedUser: { type: Object, default: () => ({}) },
			isDisabled: true,
			backgroundColor: "#808080"
		};
	},
template: `<div>
		<header>
		<span>Web projekat</span>
		<div class="topnav">
			<span v-if="loggedUser.userType === 'CUSTOMER'"> 
				<a>Pregled restorana </a>
			</span>
			<span v-if="loggedUser.userType === 'ADMINISTRATOR'" >
				<a>Dodavanje restorana </a>
				<a>Dodavanje korisnika</a>
				<a>Pregled restorana </a>
				<a>Pregled korisnika </a>
			</span>
			<span v-if="loggedUser.userType === 'MANAGER'">
				<a>Prikaz restorana</a>
				<a>Pregled zahteva </a>
			</span>
			<span v-if="loggedUser.userType === 'DELIVERER'">
				<a>Pregled zahteva</a>
				<a>Porudžbine bez dostavljača</a>
				<a>Pregled dostava</a>
			</span>
			<sign-out></sign-out>
		</div>
		</header>
		<br/>
		
		<div style="margin-top: 100px; margin-left: 42%; margin-bottom:23%">
			<form>
				<table>
					<tr>
						<td> </td>
						<td> <input type="button" style="background-color: #597EAA; color: white" value="Izmeni nalog" @click="isDisabled = false; backgroundColor = '#597EAA'"></input> </td>
						<td> </td>
					</tr>
					<tr>
						<td>Ime: </td>
						<td> <input type="text" v-model="loggedUser.name" :disabled="isDisabled"> </input> </td>
					</tr>
					<tr>
						<td>Prezime: </td>
						<td><input type="text" v-model="loggedUser.surname" :disabled="isDisabled"></input></td>
					</tr>
					<tr>
						<td>Datum rođenja:</td>
						<td><input type="date" v-model="loggedUser.dateOfBirth" :disabled="isDisabled"></input> </td>
					</tr>
					<tr>
						<td>Pol:</td>
						<td>
							<select v-model="loggedUser.sex" :disabled="isDisabled">
								<option>Muško</option>
								<option>Žensko</option>
							</select>
						</td>
					</tr>
					<tr>
						<td>Korisnicko ime: </td>
						<td><input type="text" v-model="loggedUser.username" :disabled="isDisabled"></input></td>
					</tr>
					<tr>
						<td>Lozinka: </td>
						<td><input type="password" v-model="loggedUser.password" :disabled="isDisabled"></input></td>
					</tr>
					<tr>
						<td></td>
						<td><input type="button" v-bind:style="{'background-color': backgroundColor, 'color': 'white'}" value="Sačuvaj" :disabled="isDisabled"></input></td>
						<td></td>
					</tr>
				</table>
			</form>
		</div>
		</div>`
	,
	mounted(){
	axios.get("/getLoggedUser")
	.then(response => (this.loggedUser = response.data[0]))
}
});