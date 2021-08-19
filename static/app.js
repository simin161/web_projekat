
const firstPage = { template: '<first-page></first-page>' }
const welcomePage = { template: '<welcome-page></welcome-page>'}
const editProfile = { template: '<edit-profile></edit-profile>'}
const createRestaurant = { template: '<create-restaurant></create-restaurant>'}
const createManager = {template: '<create-manager></create-manager>'}

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: firstPage},
	    { path: '/welcome-page', component: welcomePage},
	    { path: '/edit-profile', component: editProfile},
	    { path: '/createRestaurant', component: createRestaurant},
	    { path: '/createManager', component: createManager}
	  ]
});

var app = new Vue({
	router,
	el: '#app'
});