Vue.component('app-modal', {
	data: function(){
		return{
			showLogIn: false,
			showRegister: false,
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
			    <ul class="scroll">
			    	<li><a class="active" href="#/">Porudžbinac</a> </li>
			    	<li class="right"><a @click="fadeLogIn">Prijava</a></li>
			    	<li class="right"><a @click="fadeRegister">Registracija</a></li>
			    </ul>
			   <transition name="fade" v-on:enter="enter">
			  <div id="logInModal" class="modal" v-show="showLogIn">
			  <div class="modal-content">
				<span class="close" @click="fadeLogIn">&times;</span>
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
			</transition>
			<transition name="fade" v-on:enter="enter">
			<div id="registerModal" class="modal" v-show="showRegister">
			  <div class="modal-content">
				<span class="close" @click="fadeRegister">&times;</span>
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
			</transition>
		</div>`
	,
	computed : {
		  isComplete () {  
		    correctName = /\S/.test(this.userForRegistration.name) && /^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,0-9]{1,20}$/.test(this.userForRegistration.name);
		    correctSurname = /\S/.test(this.userForRegistration.surname) && /^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,0-9]{1,20}$/.test(this.userForRegistration.surname);
		    
		    flag = correctName && correctSurname && 
		    /\S/.test(this.userForRegistration.dateOfBirth) && 
		    /\S/.test(this.userForRegistration.sex) && 
		    /^[a-z0-9_-]{3,16}$/.test(this.userForRegistration.username) && 
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
			then(response =>{
				if(response.data == "SUCCESS"){
					router.push('/welcome-page');
				}
				else{
					this.returnMessage = "Postojeće korisničko ime/nevalidni podaci!";
				}
			});
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
		  mouseOver : function(){
			  this.backgroundColorLogIn =  "#79b9b6";
			  this.backgroundColor =  "#79b9b6";
		  },
		  mouseLeave : function(){
				  this.backgroundColorLogIn =  "#5eaaa8" ;
				  this.backgroundColor =  "#5eaaa8" ;

		 },
		 fadeLogIn: function() {
		      this.showLogIn = !this.showLogIn
		    },
		 fadeRegister: function() {
			      this.showRegister = !this.showRegister
		 },
		 enter: function(el, done) {

		      var that = this;
		    }
	}
});
