Vue.component('all-orders',{
	data: function(){
		return{
			orders: null,
			show: false,
			scrolled: false
		};
	}
	,
	template: `
		 <div>
		 	<navigation-header></navigation-header>
			<ul :class="scrolled ? 'scrollRest' : 'rest'">
				<li><a @click="loadAll">Sve porudžbine</a></li>
				<li><a @click="loadDelivered">Dostavljene porudžbine</a></li>
				<li><a @click="loadUndelivered">Nedostavljene porudžbine</a></li>
			</ul>

			<div style="margin-top: 6%" v-if="orders != null">
				<div class="lists" v-for="order in orders">
					<div>
						<span v-if="show===true">
							<button class="orderStatus"></button>
						</span>
						<p>{{order}}</p>
						<p>Porudzbina</p>
						<p>Dostavljac</p> 
						<p>Cena</p>
					</div>
				</div>
			</div>
			<div class="animated fadeIn" v-if="orders === null">
				<img class="center" style="margin-top: 5%;" src="../images/noOrders.png"/>
			</div>
		 </div>
	`,
	methods:{
		 handleScroll () {
	    this.scrolled = window.scrollY > 0;
	  },
	  loadAll : function(){
		  this.orders = ['aaaa']
		  this.show = false;
	  },
	  loadDelivered: function(){
		  this.orders = ['bbb']
		  this.show = false;
	  },
	  loadUndelivered: function(){
		  this.orders = ['cccc']
		  this.show = true;
	  }
	},
	created () {
	  window.addEventListener('scroll', this.handleScroll);
	},
	destroyed () {
	  window.removeEventListener('scroll', this.handleScroll);
	},
});