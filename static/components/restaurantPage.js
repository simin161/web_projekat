Vue.component('show-restaurant',{
	data: function(){
		return{
			restaurant:  { type: Object, default: () => ({}) },
			showComponent : '1',
			scrolled: false
		};
	}
	,
	template: `
		 <div>
		 	<navigation-header></navigation-header>
			<ul :class="scrolled ? 'scrollRest' : 'rest'">
				<li><a>Izmeni sliku</a> </li>
				<li><a>Izmeni podatake</a></li>
				<li><a @click="showComponent = '1'">Prikaži kupce</a></li>
				<li><a @click="showComponent='2'">Prikaži artikle</a></li>
				<li><a @click="showComponent='3'">Prikaži porudžbine</a></li>
				<li><a @click="showComponent='4'">Prikaži komentare</a></li>
			</ul>
			<br/>
			<div style="margin-top: 3%; margin-left: 35%">
				<p style="float: left;">
					<img :src="restaurant.restaurantLogo" height="65%" width="65%">
				</p>
				<table>
					</br>					
					<tr>
						<td>Restoran</td>
						<td><input type="text" v-model="restaurant.name"></input></td>
					</tr>
					</br>
					
					<tr>
						<td>Tip restorana </td>
						<td> 
							<select v-model="restaurant.restaurantType">
								<option>Tip</option>
							</select>
						</td>
					</tr>
					</br>
					
					<tr>
						<td>Lokacija</td>
						<td> <input type="text" v-model="restaurant.location"></input></td>
					</tr>
					</br>
				</table>
				<!--<input style="margin-left: -10%" type="button" value="Promena slike"></input>
				<input type="button" value="Izmeni podatke"></input>-->
				<input type="button" value="Sacuvaj"></input>
			</div>
			<hr style="width: 100%">
			<!--<div style="margin-left: 35%;">
				<input type="button" value="Prikaz kupaca" @click="showComponent='1'"></input>
				<input type="button" value="Prikaz artikala" @click="showComponent='2'"></input>
				<input type="button" value="Prikaz porudzbina" @click="showComponent='3'"></input>
				<input type="button" value="Prikaz komentara" @click="showComponent='4'"></input>
			</div> -->
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
	`,
	methods:{
		 handleScroll () {
	    this.scrolled = window.scrollY > 0;
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