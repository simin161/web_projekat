Vue.component('navigation-header', {
	data: function(){
		return{
			loggedUser: { type: Object, default: () => ({}) },
		    scrolled: false
		};
	},
	template : `<div>
						<ul :class="scrolled ? 'scroll' : ''" v-if="loggedUser.userType === 'CUSTOMER'">
							<li><a class="active" href="#/welcome-page">Početna</a></li>
							<li><a href="#/restaurants">Pregled restorana</a></li>
							<li><a href="#/customerOrders">Pregled porudžbina</a></li>
							<li><a href="#/edit-profile"> Moj nalog </a></li>
							<li><a href="#/customerCart"> Korpa </a></li>
							<li class="right"><sign-out></sign-out></li>
						</ul>
							<ul :class="scrolled ? 'scroll' : ''" v-if="loggedUser.userType === 'ADMINISTRATOR'" >
								<li><a class="active" href="#/welcome-page">Početna</a></li>
								<li><a href="#/createRestaurant">Dodavanje restorana </a></li>
								<li><a href="#/createUser">Dodavanje korisnika</a></li>
								<li><a href="#/restaurantsAdmin">Rad sa restoranima </a></li>
								<li><a href="#/users">Pregled korisnika </a></li>
								<li><a href="#/edit-profile"> Moj nalog </a></li>
								<li class="right"><sign-out></sign-out></li>
							</ul>
							<ul :class="scrolled ? 'scroll' : ''" v-if="loggedUser.userType === 'MANAGER'">
								<li><a class="active" href="#/welcome-page">Početna</a></li>
								<li><a href="#/show-restaurant">Prikaz restorana</a></li>
								<li><a href="#/orders-for-acceptance">Pregled zahteva </a></li>
								<li><a href="#/edit-profile"> Moj nalog </a></li>
								<li class="right"><sign-out></sign-out></li>
							</ul>
							<ul :class="scrolled ? 'scroll' : ''" v-if="loggedUser.userType === 'DELIVERER'">
								<li><a class="active" href="#/welcome-page">Početna</a></li>
								<li><a href='#/orders-without-deliverer'>Porudžbine bez dostavljača</a></li>
								<li><a href='#/all-orders'>Pregled dostava</a></li>
								<li><a href="#/edit-profile"> Moj nalog </a></li>
								<li class="right"><sign-out></sign-out></li>
							</ul>
					<br/>
				</div>`
		,
		methods: {
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
		axios.get("/getLoggedUser")
		.then(response => (this.loggedUser = response.data[0]))
	}
});