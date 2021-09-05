Vue.component('show-restaurant',{
	data: function(){
		return{
			restaurant:  { type: Object, default: () => ({}) },
			showComponent : '1',
			scrolled: false,
			enable : true,
			visibility: "hidden"
			};
	}
	,
	template: `
		 <div>
		 	<navigation-header></navigation-header>
		 	<div v-if="restaurant != null">
			<ul :class="scrolled ? 'scrollRest' : 'rest'">
				<li><a @click="enable = false; visibility='visible'">Izmeni podatake</a></li>
				<li><a @click="showComponent = '1'">Prikaži kupce</a></li>
				<li><a @click="showComponent='2'">Prikaži artikle</a></li>
				<li><a @click="showComponent='3'">Prikaži porudžbine</a></li>
				<li><a @click="showComponent='4'">Prikaži komentare</a></li>
				<li v-if="showComponent === '2'" ><a class="add" href="#/add-article">Dodaj artikal</a></li>
			</ul>
			<br/>
			<img :src="restaurant.restaurantLogo" height="100%" width="100%">	
			<div style=" margin-left: 35%">
			<!---	<p style="float: left;">
					<img :src="restaurant.restaurantLogo" height="65%" width="65%">
				</p> --->
				<table>
					</br>					
					<tr>
						<td>Restoran:</td>
						<td><input type="text" :disabled="enable" v-model="restaurant.name"></input></td>
					</tr>
					</br>
					
					<tr>
						<td>Tip restorana: </td>
						<td> 
							<select :disabled="enable" v-model="restaurant.restaurantType">
								<option>Tip</option>
							</select>
						</td>
					</tr>
					</br>
					<tr>
						<td>Lokacija:</td>
						<td> <input :disabled="enable" type="text" v-model="restaurant.location"></input></td>
					</tr>
					</br>
					<tr v-bind:style="{'visibility': visibility}">
						<td>Slika: </td>
						<td><input type="file" @change="imageSelected"></input></td>
					</tr>
					<tr>
						<td>Status:</td>
						<td>
							<select :disabled="enable" v-model="restaurant.status">
								<option value="OPEN">Otvoren</option>
								<option value="CLOSED">Zatvoren</option>
							</select>
						</td>
					</tr>
					<tr>
						<td>Prosečna ocena:</td>
						<td>{{restaurant.averageMark}}</td>
					</tr>
				</table>
				
				<input type="button" v-bind:style="{'visibility': visibility}" value="Sačuvaj"  v-on:click="save"></input>
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
				<comments-for-restaurant></comments-for-restaurant>
			</div>
			</div>
			<div v-if="restaurant == null" class="animated fadeIn" >
				<img class="center" src="../images/noRestaurant.png"/>
			</div>
		 </div>
	`,
	methods:{
		 handleScroll () {
	    this.scrolled = window.scrollY > 0;
	  },
	  save : function(){
			axios.post("/editRestaurant", this.restaurant)
			.then(response=>(this.restaurant = response.data[0]))
		},
		imageSelected(event){
			const file = document.querySelector('input[type=file]').files[0]
			const reader = new FileReader()

			let rawImg;
			reader.onloadend = () => {
			   this.restaurant.restaurantLogo = reader.result;
			}
			reader.readAsDataURL(file);
			
		}
	},
	created () {
	  window.addEventListener('scroll', this.handleScroll);
	},
	destroyed () {
	  window.removeEventListener('scroll', this.handleScroll);
	},
	mounted(){
		axios.get("/restaurantForManager")
		.then(response => (this.restaurant = response.data[0] ))
	}
});