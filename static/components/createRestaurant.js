Vue.component('create-restaurant', {

	data: function(){
		
		return{
			showCreate: false,
			returnMessage : "",
			returnCreateMessage: "",
			restaurantForCreate: { name: "",
								   restaurantType: "",
								   location:{
								   
								   		address: ""
								   	
								   },
								   manager: {
								   
								   	id: ""
								   
								   },
								   restaurantLogo: null
								 },
			managers: null,
			isDisabled: true,
			backgroundColor: "#808080",
			message: "",
			showModal: false,
			newManager: {
			
				name: "",
				username: "",
				password: "",
				surname: "",
				sex: "",
				dateOfBirth: "",
				userType: "MANAGER"
			
			},
			showOther: true,
			imagePosted : false
			
		};
	
	},
	
	template: `<div>
	
				<app-modal></app-modal>
				<transition name="fade" v-on:enter="enter">
				<div class="modal" v-show="showModal">
					<div class="modal-content">
					
						<span class="close" @click="showModal = false">&times;</span>
						<table style="text-align: left; margin: auto">
						
							<tr >
								<td>Ime: </td>
								<td> <input class="selectSearch" type="text" v-model="newManager.name"> </input> </td>
							</tr>
							<br/>
							<tr>
								<td>Prezime: </td>
								<td><input class="selectSearch" type="text" v-model="newManager.surname"></input></td>
							</tr>
							<br/>
							<tr>
								<td>Datum rođenja:</td>
								<td><input class="selectSearch" type="date" v-model="newManager.dateOfBirth"></input> </td>
							</tr>
							<br/>
							<tr>
								<td>Pol:</td>
								<td>
									<select class="selectSearch" v-model="newManager.sex" >
										<option>Muško</option>
										<option>Žensko</option>
									</select>
								</td>
							</tr>
							<br/>
							<tr>
								<td>Korisničko ime: </td>
								<td><input class="selectSearch" type="text" v-model="newManager.username"></input></td>
							</tr>
							<br/>
							<tr>
								<td>Lozinka: </td>
								<td><input class="selectSearch" type="password" v-model="newManager.password"></input></td>
							</tr>
							</br>
							</br>
							<tr>
								<td></td>
								<td><input type="button" :disabled="!isComplete" class="buttonSearchInModal" value="Registruj korisnika" @click="registerUser()"></input></td>
							</tr>
							<tr>
								
							</tr>
						
						</table>
					
					</div>
				</div>
				</transition>
	
			   	<navigation-header></navigation-header>
				<br/>
			   
			   <div style="margin-top: 100px; margin-bottom:23%">
			   	<form class="formBackground">
			   		<table class="tableCreateRestaurant">
			   		</br>
			   		<tr>
			   			<th colSpan="3" text-align="center" class="header">Unesite podatke za novi restoran</th>
			   		</tr>
			   		<br/>
			   			<tr>
			   				<td>Naziv restorana: </td>
			   				<td><input class="selectRestaurant" type="text" id="restaurantName" v-model="restaurantForCreate.name"></input></td>
			   			</tr>
			   			</br>
			   			<tr>
			   				<td>Tip restorana: </td>
			   				<td><input class="selectRestaurant" type="text" v-model="restaurantForCreate.restaurantType"></input>
			   				</td>
			   			</tr>
			   			</br>
			   			<tr>
			   				<td>Lokacija: </td>
			   				<td><input class="selectRestaurant" type="text" v-model="restaurantForCreate.location.address"></input></td>
			   			</tr>
			   			</br>
			   			<tr>
			   				<td>Logo: </td>
			   				<td><input class="selectRestaurant" type="file" @change="imageSelected"/>
			   					
			   			
			   				</td>
			   			</tr>
			   			</br>
			   			<tr>
			   				<td>Menadžer: </td>
			   				<td><select class="selectRestaurant" v-if="showOther === true" v-model="restaurantForCreate.manager.id">
			   						<option value="">Izaberite</option>
			   						<option :value="manager.id" v-for="manager in managers">{{manager.name}} {{manager.surname}}</option>
			   					</select>	
			   					<select autocomplete="off" class="selectRestaurant" v-if="showOther === false" v-model="restaurantForCreate.manager.id">
			   						<option :value="manager.id" v-for="manager in managers" selected="selected">{{manager.name}} {{manager.surname}}</option>
			   					</select>
			   				</td>
			   				
			   				<td><input title="Dodaj menadžera" class="buttonAddManager" type="button" @click="showModalCreateManager()" value= "+"></input></td>
			   			</tr>
			   			</br>
			   			<tr>
			   				<td colSpan="3" align="center"><input class="buttonCreateRestaurant" type="button" value="Kreiraj restoran"  v-on:click="createRestaurant"></input></input></td>
			   			</tr>
			   			</br>
			   			<tr>
			   				<td colSpan="3" align="center"><p> {{message}} </p></td>
			   			</tr>
			   			</br>
			   		</table>
			   		
			   	</form>
			</div>
		</div>`
		,
		computed : {
		
			isComplete () {  
		    	correctName = /\S/.test(this.newManager.name) && /^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,0-9]{1,20}$/.test(this.newManager.name);
		    	correctSurname = /\S/.test(this.newManager.surname) && /^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,0-9]{1,20}$/.test(this.newManager.surname);
		    
		    	flag = correctName && correctSurname && 
		    	/\S/.test(this.newManager.dateOfBirth) && 
		    	/\S/.test(this.newManager.sex) && 
		    	/^[a-zA-Z0-9_-]{3,16}$/.test(this.newManager.username) && 
		    	/\S/.test(this.newManager.password);
		    
		    	this.backgroundColor = flag ? "#5EAAA8" : "#f8f1f1";
		    	this.cursorStyle = flag ? "pointer" : "default";
		    	return flag;
		  }
		
		},
		methods: {
		
			showModalCreateManager : function(){
			
				this.showModal = true;
			
			},
			
			reloadManagers : function() {
			
				axios.get("/getManagersWithoutRestaurants")
				.then(response => (this.managers = response.data))
			
			},
			
			registerUser : function(){
			
				axios.post("/registerManagerFromRestaurant", this.newManager)
			.then(response => {alert("Menadžer je uspešno kreiran!"), this.managers = response.data, this.showOther = false})
			
			},
		
			createRestaurant : function(){
				correctType = /\S/.test(this.restaurantForCreate.restaurantType) && /^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,0-9]{1,}$/.test(this.restaurantForCreate.restaurantType);
				   
				if(/\S/.test(this.restaurantForCreate.name) && correctType
						&& /\S/.test(this.restaurantForCreate.location.address) && this.imagePosted && /\S/.test(this.restaurantForCreate.manager.id)){
					axios.post("/createRestaurant", this.restaurantForCreate)
					.then(response=>(this.message= response.data))
				}
				else{
					if(correctType == true)
					{
						this.message = "Niste uneli sva polja!";

					}
					else{
						this.message="Tip može da sadrži samo slova!";
					}
				}
			},
			
			imageSelected(event){
			const file = document.querySelector('input[type=file]').files[0]
			const reader = new FileReader()
			if(file != null){
				let rawImg;
				this.imagePosted = true;
				reader.onloadend = () => {
					this.restaurantForCreate.restaurantLogo = reader.result;
					console.log(this.restaurantForCreate.restaurantLogo);
				}
				reader.readAsDataURL(file);
			}else{
				this.imagePosted = false;
			}
		},
		enter: function(el, done) {

		      var that = this;
		    }
		
		},
		mounted() {
		
			axios.get("/getManagersWithoutRestaurants")
		.then(response => (this.managers = response.data))
		
		
		}
});