Vue.component('create-User', {
	data: function(){
		return{
			createdUser: {
			
				id: "",
				username: "",
				name: "",
				surname: "",
				password: "",
				userType: "",
				dateOfBirth: "",
				sex: ""
			
			},
			user: null,
			isDisabled: true,
			visibility: "hidden",
			backgroundColor: "#f8f1f1",
			message : ""
		};
	},
template: `<div>
			<navigation-header></navigation-header>
			<br/>
		
		<div style="margin-top: 100px; margin-left: 38%; margin-bottom:23%" >
			<form>
				<table style="width: 50%">
					<tr >
						<td>Ime: </td>
						<td> <input class="selectSearch" type="text" v-model="createdUser.name"> </input> </td>
					</tr>
					<br/>
					<tr>
						<td>Prezime: </td>
						<td><input class="selectSearch" type="text" v-model="createdUser.surname"></input></td>
					</tr>
					<br/>
					<tr>
						<td>Datum rođenja:</td>
						<td><input class="selectSearch" type="date" v-model="createdUser.dateOfBirth"></input> </td>
					</tr>
					<br/>
					<tr>
						<td>Pol:</td>
						<td>
							<select class="selectSearch" v-model="createdUser.sex" >
								<option>Muško</option>
								<option>Žensko</option>
							</select>
						</td>
					</tr>
					<br/>
					<tr>
						<td>Korisničko ime: </td>
						<td><input class="selectSearch" type="text" v-model="createdUser.username"></input></td>
					</tr>
					<br/>
					<tr>
						<td>Lozinka: </td>
						<td><input class="selectSearch" type="password" v-model="createdUser.password"></input></td>
					</tr>
					</br>
					<tr>
						<td>Tip korisnika: </td>
						<td><select class="selectSearch" v-model="createdUser.userType" >
								<option value="MANAGER">Menadžer</option>
								<option value="DELIVERER">Dostavljač</option>
							</select>
						</td>
					</tr>
					</br>
					<tr>
						<td></td>
						<td><input type="button" class="buttonSearchInModal" value="Registruj korisnika" @click="registerUser()"></input></td>
					</tr>
					
				</table>
				
			</form>
			<p>{{message}}</p>
		</div>
		</div>`
	,
	computed : {
	
		isComplete(){
		
			correctName = /\S/.test(this.createdUser.name) && /^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,0-9]{1,20}$/.test(this.createdUser.name);
		    correctSurname = /\S/.test(this.createdUser.surname) && /^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,0-9]{1,20}$/.test(this.createdUser.surname);
		    
		    flag = correctName && correctSurname && 
		    /\S/.test(this.createdUser.dateOfBirth) && 
		    /\S/.test(this.createdUser.sex) && 
		    /^[a-z0-9_-]{3,16}$/.test(this.createdUser.username) && 
		    /\S/.test(this.createdUser.password) &&
		    /\S/.test(this.createdUser.userType);
		    
		    
		    return flag;
		
		}
	
	},
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
		  },
		  
		  registerUser : function(){
		  
		  	axios.post("/registerUserFromAdmin", this.createdUser)
			.then(response => (this.message = response.data))
		  
		  }
	}
	,
	mounted(){
	axios.get("/getLoggedUser")
	.then(response => (this.loggedUser = response.data[0] ))
}
});