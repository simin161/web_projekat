const firstPage = { template: '<first-page></first-page>' }
const welcomePage = { template: '<welcome-page></welcome-page>'}
const editProfile = { template: '<edit-profile></edit-profile>'}
const ordersForAcceptance = { template: '<orders-for-acceptance></orders-for-acceptance>'}
const restaurantPage = {template: '<show-restaurant></show-restaurant>'}
const orderReview = {template: '<order-review></order-review>'}
const ordersWithoutDeliverer = {template: '<orders-without-deliverer></orders-without-deliverer>'}
const allOrders = {template: '<all-orders></all-orders>'}

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: firstPage},
	    { path: '/welcome-page', component: welcomePage},
	    { path: '/edit-profile', component: editProfile},
	    { path: '/orders-for-acceptance', component: ordersForAcceptance},
	    { path: '/show-restaurant', component: restaurantPage},
	    { path: '/order-review',  component: orderReview},
	    { path: '/orders-without-deliverer', component: ordersWithoutDeliverer},
	    { path: '/all-orders', component: allOrders}
	  ]
});

var app = new Vue({
	router,
	el: '#app'
});