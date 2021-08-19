Vue.component('welcome-page', {
	data: function(){
		return{
			loggedUser: null
		};
	},
template: `<div>
		<header>
		<span>Web projekat</span>
		<div class="topnav">
			<span v-if="loggedUser.userType === 'CUSTOMER'"> 
				<a>Pregled restorana </a>
			</span>
			<span v-if="userType === 'administrator'" >
				<a href="#/createRestaurant">Dodavanje restorana </a>
			<span v-if="loggedUser.userType === 'ADMINISTRATOR'" >
				<a>Dodavanje restorana </a>
				<a>Dodavanje korisnika</a>
				<a>Pregled restorana </a>
				<a>Pregled korisnika </a>
			</span>
			<span v-if="loggedUser.userType === 'MANAGER'">
				<a>Prikaz restorana</a>
				<a>Pregled zahteva </a>
			</span>
			<span v-if="loggedUser.userType === 'DELIVERER'">
				<a>Pregled zahteva</a>
				<a>Porudzbine bez dostavljaca</a>
				<a>Pregled dostava</a>
			</span>
			<a href="#/edit-profile"> Moj nalog </a>
			<sign-out></sign-out>
		</div>
		</header>
		<br/>
		
		<div class="welcome">
			<h1>Dobrodosli, {{loggedUser.username}}</h1>
		</div>
		
		</div>`
	,
	mounted(){
	axios.get("/getLoggedUser")
	.then(response => (this.loggedUser = response.data[0]))
}
});
