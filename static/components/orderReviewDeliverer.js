Vue.component('order-review', {
	data: function(){
		return{
			orders : null
		};
	},
template: ` <div>
			<navigation-header></navigation-header>
			<div class="searchForm">
			</div>
			<hr/>
			<div v-if="orders != null">
					<div class="lists" v-for="item in items">
						<div>
							<table style="width: 100%">
							<tr>
								<td>{{item}} </td>
								<td>Korisnik </td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>Lokacija restorana</td>
								<td>Mesto</td>
								<td>
									Status
								 </td>
								<td></td>
							</tr>
							<tr>
								<td>Cena porudzbine </td>
								<td></td>
								<td></td>
							</tr>					 
							</table>
						</div>
					</div>
				</div>
				<div class="animated fadeIn" v-if="orders === null">
					<img class="center" src="../images/noDelivery.jpg"/>
				</div>
			</div>
		  `,
			methods:{
				 handleScroll () {
			    this.scrolled = window.scrollY > 0;
			  }
			},
			created () {
			  window.addEventListener('scroll', this.handleScroll);
			},
			destroyed () {
			  window.removeEventListener('scroll', this.handleScroll);
			},
});