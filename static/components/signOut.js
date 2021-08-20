Vue.component('sign-out', {
	
template: `<a v-on:click="logOut">Odjava </a>`,

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