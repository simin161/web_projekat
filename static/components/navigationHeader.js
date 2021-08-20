Vue.component('navigation-header', {
	data: function(){
		return{
			loggedUser: { type: Object, default: () => ({}) }
		};
	},
	template : `<div>
					<header>
						<span>Web projekat</span>
						<div class="topnav">
							<span v-if="loggedUser.userType === 'CUSTOMER'"> 
								<a>Pregled restorana </a>
							</span>
							<span v-if="loggedUser.userType === 'ADMINISTRATOR'" >
								<a>Dodavanje restorana </a>
								<a>Dodavanje korisnika</a>
								<a>Pregled restorana </a>
								<a>Pregled korisnika </a>
							</span>
							<span v-if="loggedUser.userType === 'MANAGER'">
								<a href="#/show-restaurant">Prikaz restorana</a>
								<a href="#/orders-for-acceptance">Pregled zahteva </a>
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
				</div>`
		,
		mounted(){
		axios.get("/getLoggedUser")
		.then(response => (this.loggedUser = response.data[0]))
	}
});