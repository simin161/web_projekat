Vue.component('edit-profile', {
	data: function(){
		return{
			loggedUser: { type: Object, default: () => ({}) },
			user: null,
			isDisabled: true,
			visibility: "hidden",
			backgroundColor: "#f8f1f1",
			message : ""
		};
	},
template: `<div>
			<navigation-header></navigation-header>
			<ul :class="scrolled ? 'scrollRest' : 'rest'">
				<li><a @click="isDisabled = false; backgroundColor = '#5eaaa8'; visibility = 'visible'">Izmeni nalog</a> </li>
			</ul>
			<br/>
		
		<div style="margin-top: 100px; margin-left: 38%; margin-bottom:23%" >
			<form>
				<table style="width: 50%">
					<tr >
						<td>Ime: </td>
						<td> <input type="text" v-model="loggedUser.name" :disabled="isDisabled"> </input> </td>
					</tr>
					<br/>
					<tr>
						<td>Prezime: </td>
						<td><input type="text" v-model="loggedUser.surname" :disabled="isDisabled"></input></td>
					</tr>
					<br/>
					<tr>
						<td>Datum rođenja:</td>
						<td><input style="width:57%" type="date" v-model="loggedUser.dateOfBirth" :disabled="isDisabled"></input> </td>
					</tr>
					<br/>
					<tr>
						<td>Pol:</td>
						<td>
							<select v-model="loggedUser.sex" style="width:57%" :disabled="isDisabled">
								<option>Muško</option>
								<option>Žensko</option>
							</select>
						</td>
					</tr>
					<br/>
					<tr>
						<td>Korisničko ime: </td>
						<td><input type="text" v-model="loggedUser.username" :disabled="isDisabled"></input></td>
					</tr>
					<br/>
					<tr>
						<td>Lozinka: </td>
						<td><input type="password" v-model="loggedUser.password" :disabled="isDisabled"></input></td>
					</tr>
					<br v-if="loggedUser.userType === 'CUSTOMER'"/>
					<tr v-if="loggedUser.userType === 'CUSTOMER'">
						<td>Osvojeni poeni: </td>
						<td><p>{{loggedUser.collectedPoints}}</p></td>
					</tr>
					<br/>
				</table>
				<input @mouseover="mouseOver" @mouseleave="mouseLeave" type="button" v-bind:style="{'background-color': backgroundColor, 'color': 'white', 'visibility': visibility, 'width':'37%'}" value="Sačuvaj"  v-on:click="save"></input>
			</form>
			<p>{{message}} </p>
		</div>
		</div>`
	,
	methods : {
		save : function(){
			axios.post("/editProfile", this.loggedUser)
			.then(response => (this.message = response.data))
		},
		  mouseOver : function(){
			  this.backgroundColor =  "#79b9b6";
		  },
		  mouseLeave : function(){
				  this.backgroundColor =  "#5eaaa8" ;
		  }
	}
	,
	mounted(){
	axios.get("/getLoggedUser")
	.then(response => (this.loggedUser = response.data[0] ))
}
});