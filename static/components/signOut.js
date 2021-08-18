Vue.component('sign-out', {
	
template: `<input type='button' value="Odjava" v-on:click="logOut"> </input>`,

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