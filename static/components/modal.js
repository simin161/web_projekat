Vue.component('app-modal', {
	data: function(){
		return{
			showLogIn: false,
			showRegister: false,
		    scrolled: false,
			returnMessage: "",
			returnLogInMessage: "",
			backgroundColor : "#597EAA",
			cursorStyle : "pointer",
			backgroundColorLogIn : "#597EAA",
			cursorStyleLogIn : "pointer",
			userForRegistration : {id : "",
								   username : "",
								   password : "",
								   name : "",
								   surname : "",
								   sex : "",
								   dateOfBirth : ""},
			userForLogIn : {username : "",
							password : "",
							userType : ""							
			}
		};
	},
template: `<div>
			    <ul :class="scrolled ? 'scroll' : ''">
			    	<li><p style="color: #666; margin-left: 15%">Porudžbinac</p> </li>
			    	<li class="right"><a @click="showLogIn = true">Prijava</a></li>
			    	<li class="right"><a @click="showRegister = true">Registracija</a></li>
			    </ul>
			   
			  <div id="logInModal" class="modal" v-show="showLogIn">
			  <div class="modal-content">
				<span class="close" @click="showLogIn = false">&times;</span>
				<form>
					<table style="text-align: left; margin: auto">
					<br/>
						<tr>
							<td><input placeholder="Korisnicko ime..." id="logInUsername" v-model="userForLogIn.username" type="text"></input></td>
						</tr>
						<tr>
							<td><input placeholder="Lozinka..." id="logInPassword" v-model="userForLogIn.password" type="password"></input></td>
						</tr>
					</table>
					<input :disabled="!isCompleteLogIn" 
							v-bind:style="{'background-color': backgroundColorLogIn,
											'color': 'white', 
											'cursor': cursorStyleLogIn, 
											'margin-top': '3%',
											'margin-right' : '3.5%',
											'width': '35%'}"
							 type="submit" v-on:click="logInUser" value="Prijavite se!"> </input>

					<p> {{returnLogInMessage}}</p>
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
		  },
		  isCompleteLogIn () {
			  flag = this.userForLogIn.username && this.userForLogIn.password;
			    this.backgroundColorLogIn = flag ? "#597EAA" : "#808080";
			    this.cursorStyleLogIn = flag ? "pointer" : "default";
			    return flag;
		  }
	},
		
	methods : {
		registerUser : function(){
			event.preventDefault();
			axios.post('/registerUser', this.userForRegistration).
			then(response =>(
				this.returnMessage = response.data == "SUCCESS" ? router.push('/welcome-page') : "Postojece korisnicko ime ili nevalidni podaci!"
			));
		},
		logInUser : function(){
			event.preventDefault();
			axios.post('/logInUser', this.userForLogIn).
			then(response =>(
					this.returnLogInMessage = response.data == "SUCCESS" ? router.push('/welcome-page') : "Pogresno korisnicko ime ili lozinka!"
					));
		},
		handleScroll () {
		    this.scrolled = window.scrollY > 0;
		  }
	},
	created () {
	  window.addEventListener('scroll', this.handleScroll);
	},
	destroyed () {
	  window.removeEventListener('scroll', this.handleScroll);
	}
});
