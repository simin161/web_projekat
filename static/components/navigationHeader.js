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
							<li><a>Pregled restorana</a></li>
							<li><a href="#/edit-profile"> Moj nalog </a></li>
							<li class="right"><sign-out></sign-out></li>
						</ul>
							<ul :class="scrolled ? 'scroll' : ''" v-if="loggedUser.userType === 'ADMINISTRATOR'" >
								<li><a class="active" href="#/welcome-page">Početna</a></li>
								<li><a href="#/createRestaurant">Dodavanje restorana </a></li>
								<li><a>Dodavanje korisnika</a></li>
								<li><a>Pregled restorana </a></li>
								<li><a>Pregled korisnika </a></li>
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
								<li><a>Pregled zahteva</a></li>
								<li><a>Porudzbine bez dostavljaca</a></li>
								<li><a>Pregled dostava</a></li>
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