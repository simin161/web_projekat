Vue.component('app-modal', {
	data: function(){
		return{
			showLogIn: false,
			showRegister: false,
		    scrolled: false,
			returnMessage: "",
			returnLogInMessage: "",
			backgroundColor : "#5EAAA8",
			cursorStyle : "pointer",
			backgroundColorLogIn : "#5EAAA8",
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
			    	<li><p style="color: #f8f1f1; margin-left: 15%">Porudžbinac</p> </li>
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
							 @mouseover="mouseOver"
							 @mouseleave="mouseLeave"
							v-bind:style="{'background-color': backgroundColorLogIn,
											'color': 'white', 
											'cursor': cursorStyleLogIn, 
											'margin-top': '3%',
											'margin-right' : '3.5%',
											'width': '35%'}"
							 type="button" v-on:click="logInUser" value="Prijavite se!"> </input>

					<p style="color: red"> {{returnLogInMessage}}</p>
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
							<td> <input  id="registerPassword" type="text" v-model="userForRegistration.password"> </input> </td>
						</tr>
					</table>
					<input :disabled="!isComplete" @mouseover="mouseOver" @mouseleave="mouseLeave" v-bind:style="{'background-color': backgroundColor, 'color': 'white', 'cursor': cursorStyle}" type="submit" v-on:click="registerUser" value="Registrujte se!"> </input>
					<p style="color: red"> {{returnMessage}}</p>
				</form>
			  </div>
			</div>
		</div>`
	,
	computed : {
		  isComplete () {
		    flag = /\S/.test(this.userForRegistration.name) &&
		    /\S/.test(this.userForRegistration.surname) && 
		    /\S/.test(this.userForRegistration.dateOfBirth) && 
		    /\S/.test(this.userForRegistration.sex) && 
		    /\S/.test(this.userForRegistration.username) && 
		    /\S/.test(this.userForRegistration.password);
		    this.backgroundColor = flag ? "#5EAAA8" : "#f8f1f1";
		    this.cursorStyle = flag ? "pointer" : "default";
		    return flag;
		  },
		  isCompleteLogIn () {
			    flag = /\S/.test(this.userForLogIn.username) && /\S/.test(this.userForLogIn.password);
			    this.backgroundColorLogIn = flag ? "#5EAAA8" : "#f8f1f1";
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
			then(response =>{
				if(response.data === "SUCCESS"){
					router.push('/welcome-page');
				}
				else{
					this.returnLogInMessage = "Pogrešno korisničko ime ili lozinka!";
				}
				
			});
		},
		handleScroll () {
		    this.scrolled = window.scrollY > 0;
		  },
		  mouseOver : function(){
			  this.backgroundColorLogIn =  "#79b9b6";
			  this.backgroundColor =  "#79b9b6";
		  },
		  mouseLeave : function(){
				  this.backgroundColorLogIn =  "#5eaaa8" ;
				  this.backgroundColor =  "#5eaaa8" ;

			  }
	},
	created () {
	  window.addEventListener('scroll', this.handleScroll);
	},
	destroyed () {
	  window.removeEventListener('scroll', this.handleScroll);
	}
});
