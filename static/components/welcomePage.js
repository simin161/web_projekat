Vue.component('welcome-page', {
	data: function(){
		return{
			items: ['Hello Vue!', '123', '456', '789', '101112'],
			userType: "manager"
		};
	},
template: `<div>
		<header>
		<span>Web projekat</span>
		<div class="topnav">
			<span v-if="userType === 'customer'"> 
				<a>Pregled restorana </a>
			</span>
			<span v-if="userType === 'administrator'" >
				<a>Dodavanje restorana </a>
				<a>Dodavanje korisnika</a>
				<a>Pregled restorana </a>
				<a>Pregled korisnika </a>
			</span>
			<span v-if="userType === 'manager'">
				<a>Prikaz restorana</a>
				<a>Pregled zahteva </a>
			</span>
			<span v-if="userType === 'deliverer'">
				<a>Pregled zahteva</a>
				<a>Porudzbine bez dostavljaca</a>
				<a>Pregled dostava</a>
			</span>
			<a href="#/edit-profile"> Moj nalog </a>
			<input type='button' value="Odjava" v-on:click="logOut"> </input>
		</div>
		</header>
		<br/>
		
		<div class="welcome">
			<h1>Dobrodosli, (TODO: ime + prezime/ korisnicko ime)</h1>
		</div>
		
		</div>`
	,
	methods:{
		logOut : function(){
			event.preventDefault();
			axios.get('/logOutUser').
			then(response =>(
				router.push('/')
			));
		}
	}
});
