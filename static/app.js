const firstPage = { template: '<first-page></first-page>' }
const welcomePage = { template: '<welcome-page></welcome-page>'}
const editProfile = { template: '<edit-profile></edit-profile>'}
const createRestaurant = { template: '<create-restaurant></create-restaurant>'}
const ordersForAcceptance = { template: '<orders-for-acceptance></orders-for-acceptance>'}
const restaurantPage = {template: '<show-restaurant></show-restaurant>'}
const ordersWithoutDeliverer = {template: '<orders-without-deliverer></orders-without-deliverer>'}
const allOrders = {template: '<all-orders></all-orders>'}
const addArticle = {template: '<add-article></add-article>'}
const editArticle = {template: '<edit-article></edit-article>'}
const restaurantFront = {template: '<restaurant-detail></restaurant-detail>'}
const restaurantsToDisplay = {template: '<restaurants></restaurants>'}
const restaurantArticles = {template: '<restaurantArticles></restaurantArticles>'}
const customerCart = {template: '<customerCart></customerCart>'}
const customerOrders = {template: '<customerOrders></customerOrders>'}
const restaurantPageCustomer = {template: '<showRestaurantForCustomer></showRestaurantForCustomer>'}
const createUser = {template: '<create-User></create-User>'}
const deliverersRequests = {template: '<deliverers-requests></deliverers-requests>'}
const restaurantsAdmin = {template: '<restaurantsAdmin></restaurantsAdmin>'}
const restaurantPageAdmin = {template: '<restaurantPageAdmin></restaurantPageAdmin>'}
const users = {template: '<users></users>'}

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: firstPage},
	    { path: '/welcome-page', component: welcomePage},
	    { path: '/edit-profile', component: editProfile},
	    { path: '/createRestaurant', component: createRestaurant},
	    { path: '/orders-for-acceptance', component: ordersForAcceptance},
	    { path: '/show-restaurant', component: restaurantPage},
	    { path: '/orders-without-deliverer', component: ordersWithoutDeliverer},
	    { path: '/all-orders', component: allOrders},
	    { path: '/add-article', component: addArticle},
	    { path: '/show-article', component: editArticle},
	    { path: '/restaurant-detail', component: restaurantFront},
	    { path: '/restaurants', component: restaurantsToDisplay},
	    { path: '/restaurantArticles', component: restaurantArticles},
	    { path: '/customerCart', component: customerCart},
	    { path: '/customerOrders', component: customerOrders},
	    { path: '/showRestaurantForCustomer', component: restaurantPageCustomer},
	    { path: '/createUser', component: createUser},
	    { path: '/deliverers-requests', component: deliverersRequests},
	    { path: '/restaurantsAdmin', component: restaurantsAdmin},
	    { path: '/restaurantPageAdmin', component: restaurantPageAdmin},
	    { path: '/users', component: users}
	  ]
});

var app = new Vue({
	router,
	el: '#app'
});