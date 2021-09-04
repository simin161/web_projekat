const firstPage = { template: '<first-page></first-page>' }
const welcomePage = { template: '<welcome-page></welcome-page>'}
const editProfile = { template: '<edit-profile></edit-profile>'}
const createRestaurant = { template: '<create-restaurant></create-restaurant>'}
const createManager = {template: '<create-manager></create-manager>'}
const ordersForAcceptance = { template: '<orders-for-acceptance></orders-for-acceptance>'}
const restaurantPage = {template: '<show-restaurant></show-restaurant>'}
const orderReview = {template: '<order-review></order-review>'}
const ordersWithoutDeliverer = {template: '<orders-without-deliverer></orders-without-deliverer>'}
const allOrders = {template: '<all-orders></all-orders>'}
const addArticle = {template: '<add-article></add-article>'}
const editArticle = {template: '<edit-article></edit-article>'}
const restaurantsToDisplay = {template: '<restaurants></restaurants>'}
const restaurantArticles = {template: '<restaurantArticles></restaurantArticles>'}

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: firstPage},
	    { path: '/welcome-page', component: welcomePage},
	    { path: '/edit-profile', component: editProfile},
	    { path: '/createRestaurant', component: createRestaurant},
	    { path: '/createManager', component: createManager},
	    { path: '/orders-for-acceptance', component: ordersForAcceptance},
	    { path: '/show-restaurant', component: restaurantPage},
	    { path: '/order-review',  component: orderReview},
	    { path: '/orders-without-deliverer', component: ordersWithoutDeliverer},
	    { path: '/all-orders', component: allOrders},
	    { path: '/add-article', component: addArticle},
	    { path: '/show-article', component: editArticle},
	    { path: '/restaurants', component: restaurantsToDisplay},
	    { path: '/restaurantArticles', component: restaurantArticles}
	  ]
});

var app = new Vue({
	router,
	el: '#app'
});