Vue.component('edit-profile', {
	data: function(){
		return{
			loggedUser: { type: Object, default: () => ({}) },
			isDisabled: true,
			backgroundColor: "#f8f1f1",
			message : ""
		};
	},
template: `<div>
			<navigation-header></navigation-header>
			<ul :class="scrolled ? 'scrollRest' : 'rest'">
				<li><a @click="isDisabled = false; backgroundColor = '#5eaaa8'">Izmeni nalog</a> </li>
			</ul>
			<br/>
		
		<div style="margin-top: 100px; margin-left: 42%; margin-bottom:23%">
			<form>
				<table>
					<tr>
						<td> </td>
						<!--<td> <input type="button" style="background-color: #597EAA; color: white" value="Izmeni nalog" @click="isDisabled = false; backgroundColor = '#597EAA'"></input> </td>-->
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
						<td><input type="password" v-model="loggedUser.password" :disabled="isComplete"></input></td>
					</tr>
					<tr>
						<td></td>
						<td><input type="button" v-bind:style="{'background-color': backgroundColor, 'color': 'white'}" value="Sačuvaj" :disabled="isDisabled" v-on:click="save"></input></td>
						<td></td>
					</tr>
				</table>
			</form>
			<p>{{message}} </p>
		</div>
		</div>`
	,
	methods : {
		save : function(){
			axios.post("/editProfile", this.loggedUser)
			.then(response => (this.message = response.data))
		}
	}
	,
	mounted(){
	axios.get("/getLoggedUser")
	.then(response => (this.loggedUser = response.data[0]))
}
});