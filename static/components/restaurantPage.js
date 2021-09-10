Vue.component('show-restaurant',{
	data: function(){
		return{
			restaurant:  { type: Object, default: () => ({}) },
			showComponent : '1',
			enable : true,
			visibility: "hidden",
			message: "",
			dto: {
				restaurant: null,
				edited: null
			},
			comments : { type: Object, default: () => ({}) }
			};
	}
	,
	template: `
		 <div>
		 	<navigation-header></navigation-header>
		 	<div v-if="restaurant != null">
				<ul class="rest">
					<li><a @click="enable = false; visibility='visible'">Izmeni podatake</a></li>
					<li><a @click="showComponent = '1'">Prikaži kupce</a></li>
					<li><a @click="showComponent='2'">Prikaži artikle</a></li>
					<li><a @click="showComponent='3'">Prikaži porudžbine</a></li>
					<li><a @click="showComponent='4'">Prikaži komentare</a></li>
					<li v-if="showComponent === '2'" ><a class="add" href="#/add-article">Dodaj artikal</a></li>
				</ul>
				<br/>
				<img :src="restaurant.restaurantLogo" height="100%" width="100%">	
				<div>
					<form class="formBackground">
					<table class="tableCreateRestaurant">
						</br>					
						<tr>
							<td>Restoran:</td>
							<td><input class="selectRestaurant2" type="text" :disabled="enable" v-model="restaurant.name"></input></td>
						</tr>
						</br>
						
						<tr>
							<td>Tip restorana: </td>
							<td> 
								<input class="selectRestaurant2" type="text" :disabled="enable" v-model="restaurant.restaurantType"></input>
							</td>
						</tr>
						</br>
						<tr>
							<td>Lokacija:</td>
							<td> <input class="selectRestaurant2" :disabled="enable" type="text" v-model="restaurant.location.address"></input></td>
						</tr>
						</br>
						<tr>
							<td>Status:</td>
							<td>
								<select class="selectRestaurant2" :disabled="enable" v-model="restaurant.status">
									<option value="OPEN">Otvoren</option>
									<option value="CLOSED">Zatvoren</option>
								</select>
							</td>
						</tr>
						</br>
						<tr>
							<td>Prosečna ocena:</td>
							<td><input class="selectRestaurant2" type="text" v-model="restaurant.averageMark" :disabled="true"></input></td>
						</tr>
						<tr v-bind:style="{'visibility': visibility}">
							<td>Slika: </td>
							<td><input type="file" @change="imageSelected"></input></td>
						</tr>
					</table>
					</form>
					<input type="button" v-bind:style="{'visibility': visibility}" value="Sačuvaj"  v-on:click="save"></input>
					<p>{{message}}</p>
				</div>
				<hr style="width: 100%">
				</br>
				<div v-if="showComponent === '1'">
					<customers-for-restaurant></customers-for-restaurant>
				</div>
				<div v-if="showComponent === '2'">
					<articles-for-restaurant></articles-for-restaurant>
				</div>
				<div v-if="showComponent === '3'">
					<orders-for-restaurant></orders-for-restaurant>
				</div>
				<div v-if="showComponent === '4'">
					<div class="lists" v-for="comment in comments">
						<div>
							<p>{{comment.customer.username}}</p>
							<p>{{comment.text}}</p>
							<p>Ocena: {{comment.mark}}</p> 
							<p>Status: <span v-if="comment.status === 'ACCEPTED'">Prihvaćen</span>
									   <span v-if="comment.status === 'DECLINED'">Odbijen</span>
									   <span v-if="comment.status === 'PENDING'">Na čekanju</span>
							</p>
							<div v-if="comment.status === 'PENDING'">
								<input type="button" @click="acceptComment(comment.id)" class="buttonAccept" value="Prihvati"></input>
								<input type="button" @click="declineComment(comment.id)" class="buttonDecline" value="Odbij"></input>
							</div>
							<br/>
						</div>
					</div>
					<div v-if="comments === null" class="animated fadeIn">
						<img class="center" src="../images/noComments.png"/>
					</div>
					<div v-if="restaurant == null" class="animated fadeIn" >
						<img class="center" src="../images/noRestaurant.png"/>
					</div>
				</div>
				</div>
			</div>
	`,
	methods:{
	  save : function(){
		correctType = /\S/.test(this.restaurant.restaurantType) && /^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,0-9]{1,}$/.test(this.restaurant.restaurantType);
		  if(/\S/.test(this.restaurant.name) && correctType
					&& /\S/.test(this.restaurant.location.address)){			
			  axios.post("/editRestaurant", this.restaurant)
			  .then(response=>{
				  this.dto = response.data, 
				  this.restaurant = this.dto.restaurant, 
				  this.message = this.dto.edited ? "Uspešno izmenjeni podaci!" : "Došlo je do greške prilikom izmene slike!",
						  this.visibility = "hidden",
						  this.enable = true})
		  }
		  else{
			  this.message="Nisu popunjena sva polja/nevalidni podaci!"
		  }
		},
		imageSelected(event){
			const file = document.querySelector('input[type=file]').files[0]
			const reader = new FileReader()

			let rawImg;
			reader.onloadend = () => {
			   this.restaurant.restaurantLogo = reader.result;
			}
			reader.readAsDataURL(file);
			
		},
		declineComment : function(id){
			axios.post("/declineComment", id)
			.then(response => (this.comments = response.data))
		},
		acceptComment: function(id){
			axios.post("/acceptComment", id)
			.then(response => {this.comments = response.data
				axios.get("/restaurantForManager")
				.then(response => (this.restaurant = response.data[0] ))
				})
		}
	},
	mounted(){
		axios.get("/restaurantForManager")
		.then(response => (this.restaurant = response.data[0] ))
		axios.get("/getAllCommentsForRestaurant")
			.then(response => (this.comments = response.data))
	}
});