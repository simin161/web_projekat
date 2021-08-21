Vue.component('welcome-page', {
	data: function(){
		return{
			loggedUser: { type: Object, default: () => ({}) }
		};
	},
template: `<div>
				<navigation-header></navigation-header>
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
