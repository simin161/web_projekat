Vue.component('welcome-page', {
	data: function(){
		return{
			loggedUser: { type: Object, default: () => ({}) }
		};
	},
template: `<div>
				<first-page></first-page>
		   </div>`

	,
	mounted(){
	axios.get("/getLoggedUser")
	.then(response => (this.loggedUser = response.data[0]))
}
});
