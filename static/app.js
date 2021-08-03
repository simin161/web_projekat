
const firstPage = { template: '<first-page></first-page>' }

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: firstPage}
	   
	  ]
});

var app = new Vue({
	router,
	el: '#app'
});