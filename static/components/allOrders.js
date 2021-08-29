Vue.component('all-orders',{
	data: function(){
		return{
			items: ['Hello Vue!', '123', '456', '789', '101112'],
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

			<div style="margin-top: 6%">
				<div class="lists" v-for="item in items">
					<div>
						<span v-if="show===true">
							<button class="orderStatus"></button>
						</span>
						<p>{{item}}</p>
						<p>Porudzbina</p>
						<p>Dostavljac</p> 
						<p>Cena</p>
					</div>
				</div>
			</div>
		 </div>
	`,
	methods:{
		 handleScroll () {
	    this.scrolled = window.scrollY > 0;
	  },
	  loadAll : function(){
		  this.items = ['aaaa']
		  this.show = false;
	  },
	  loadDelivered: function(){
		  this.items = ['bbb']
		  this.show = false;
	  },
	  loadUndelivered: function(){
		  this.items = ['cccc']
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