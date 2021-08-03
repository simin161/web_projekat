Vue.component('app-modal', {
	data: function(){
		return{
			showLogIn: false,
			showRegister: false,
			returnMessage: "",
			backgroundColor : "#597EAA",
			cursorStyle : "pointer",
			userForRegistration : {id : "",
								   username : "",
								   password : "",
								   name : "",
								   surname : "",
								   sex : "",
								   dateOfBirth : ""}
		};
	},
template: `<div>
				<div class="topnav"> 
				<button  id="logInOpenModal" @click="showLogIn = true;">Prijavite se!</button>
				<button  id="registerOpenModal" @click="showRegister = true;">Registrujte se!</button>
			    </div>
			   
			  <div id="logInModal" class="modal" v-show="showLogIn">
			  <div class="modal-content">
				<span class="close" @click="showLogIn = false">&times;</span>
				<form>
					<table style="text-align: left; margin: auto">
					<br/>
						<tr>
							<td> Korisničko ime:</td>
							<td><input id="logInUsername" type="text"></input></td>
						</tr>
						<tr>
							<td> Lozinka:</td>
							<td><input id="logInPassword" type="password"></input></td>
						</tr>
						<tr style="text-align: right">
							<td> </td>
							<td> <input style="background-color: #597EAA; color: white; cursor: pointer;" type="submit" value="Prijavite se!"> </input> </td>
						</tr>
					</table>
				</form>
			  </div>
			</div>
			
			<div id="registerModal" class="modal" v-if="showRegister">
			  <div class="modal-content">
				<span class="close" @click="showRegister = false">&times;</span>
				<form id="register">
					<table style="text-align: left; margin: auto">
					<br/>
						<tr>
							<td> Ime:</td>
							<td><input id="name" v-model="userForRegistration.name" type="text"></input></td>
						</tr>
						<tr>
							<td> Prezime:</td>
							<td><input id="surname" v-model="userForRegistration.surname" type="text"></input></td>
						</tr>
						<tr>
							<td>Datum rođenja: </td>
							<td> <input id="dateOfBirth" v-model="userForRegistration.dateOfBirth" type="date"> </input> </td>
						</tr>
						<tr>
							<td> Pol: </td>
							<td>
								<select id="sex" v-model="userForRegistration.sex">
									<option id="male">Muško</option>
									<option id="female">Žensko</option>
								</select>
							</td>
						</tr>
						<tr>
							<td>Korisničko ime:</td>
							<td> <input id="registerUsername" type="text" v-model="userForRegistration.username"> </input> </td>
						</tr>
						<tr>
							<td>Lozinka: </td>
							<td> <input id="registerPassword" type="text" v-model="userForRegistration.password"> </input> </td>
						</tr>
						<tr style="text-align: right">
							<td> </td>
							<td> <input :disabled="!isComplete" v-bind:style="{'background-color': backgroundColor, 'color': 'white', 'cursor': cursorStyle}" type="submit" v-on:click="registerUser" value="Registrujte se!"> </input> </td>
						</tr>
					</table>
					<p> {{returnMessage}}</p>
				</form>
			  </div>
			</div>
		</div>`
	,
	computed : {
		  isComplete () {
		    flag = this.userForRegistration.name && this.userForRegistration.surname && this.userForRegistration.dateOfBirth && this.userForRegistration.sex && this.userForRegistration.username && this.userForRegistration.password;
		    this.backgroundColor = flag ? "#597EAA" : "#808080";
		    this.cursorStyle = flag ? "pointer" : "default";
		    return flag;
		  }
	},
		
	methods : {
		registerUser : function(){
			event.preventDefault();
			axios.post('/registerUser', this.userForRegistration).
			then(response =>(
				this.returnMessage = response.data == "SUCCESS" ? "Uspesno ste se registrovali!" : "Postojece korisnicko ime ili nevalidni podaci!"
			));
		}
		
	}
});
