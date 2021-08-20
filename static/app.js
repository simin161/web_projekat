const firstPage = { template: '<first-page></first-page>' }
const welcomePage = { template: '<welcome-page></welcome-page>'}
const editProfile = { template: '<edit-profile></edit-profile>'}
const ordersForAcceptance = { template: '<orders-for-acceptance></orders-for-acceptance>'}
const restaurantPage = {template: '<show-restaurant></show-restaurant>'}

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: firstPage},
	    { path: '/welcome-page', component: welcomePage},
	    { path: '/edit-profile', component: editProfile},
	    { path: '/orders-for-acceptance', component: ordersForAcceptance},
	    { path: '/show-restaurant', component: restaurantPage}
	  ]
});

var app = new Vue({
	router,
	el: '#app'
});