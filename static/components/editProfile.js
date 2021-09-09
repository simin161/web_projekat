Vue.component('edit-profile', {
	data: function(){
		return{
			loggedUser: { type: Object, default: () => ({}) },
			user: null,
			isDisabled: true,
			visibility: "hidden",
			backgroundColor: "#f8f1f1",
			message : "",
			dto: {
				oldPassword: "",
				newPassword: "",
				newPasswordAgain: ""
			},
			showPasswordChange : false
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
						<td><input type="button" @click="showPasswordChange = true" value="Promeni lozinku"></input></td>
					</tr>
					<tr v-if="showPasswordChange === true">
						<td>Nova lozinka: <input type="password" v-model="dto.newPassword"></input></td>
						<td>Potvrda nove lozinke: <input type="password" v-model="dto.newPasswordAgain"></input></td>
						<td><input type="button" value="Sačuvaj lozinku" @click="changePassword"></input></td>
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
			 	correctName = /\S/.test(this.loggedUser.name) && /^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,0-9]{1,20}$/.test(this.loggedUser.name);
			    correctSurname = /\S/.test(this.loggedUser.surname) && /^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,0-9]{1,20}$/.test(this.loggedUser.surname);
			    
			    if(correctName && correctSurname && 
			    		/\S/.test(this.loggedUser.dateOfBirth) && 
			    		/\S/.test(this.loggedUser.sex) && 
			    		/^[a-z0-9_-]{3,16}$/.test(this.loggedUser.username)){
			    		axios.post("/editProfile", this.loggedUser)
			    		.then(response => (this.message = response.data))
			    }
			    else{
			    	this.message = "Nevalidni podaci/niste popunili sva polja!";
			    }
		},
		changePassword : function(){
			if(/\S/.test(this.dto.newPassword) && /\S/.test(this.dto.newPasswordAgain)){
				if(this.dto.newPassword === this.dto.newPasswordAgain){
					if(this.dto.newPassword != this.dto.oldPassword){
						axios.post("/changePassword", this.dto)
						.then(response => (this.message = response.data == "SUCCESS" ? "Uspešno promenjena lozinka!" : "Greška prilikom izmene lozinke!"));
					}
					else{
						this.message="Nova lozinka ne može biti ista kao stara!"
					}
				}
				else{
					this.message = "Pogrešna lozinka!"
				}
			}
			else{
				this.message = "Nisu popunjeni svi podaci za izmenu lozinke!";
			}
		}
		,
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
	.then(response => {this.loggedUser = response.data[0], this.dto.oldPassword = this.loggedUser.password })
}
});