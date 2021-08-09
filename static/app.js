
const firstPage = { template: '<first-page></first-page>' }
const welcomePage = { template: '<welcome-page></welcome-page>'}

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: firstPage},
	    { path: '/welcome-page', component: welcomePage }	   
	  ]
});

var app = new Vue({
	router,
	el: '#app'
});