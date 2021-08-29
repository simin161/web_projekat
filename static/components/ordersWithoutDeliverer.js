Vue.component('orders-without-deliverer', {
	data: function(){
		return{
			items : ['1', '2', '3', '4', '5']
		};
	},
template: ` <div>
			<navigation-header></navigation-header>
			<div class="searchForm">
			</div>
			<hr/>
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
							<input type="button" value="Pošalji zahtev"></input>
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