Vue.component('orders-for-acceptance', {
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
					<div class="lists" v-for="order in orders">
						<div>
							<table style="width: 100%">
							<tr>
								<td>{{order}} </td>
								<td>Korisnik </td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td>Lokacija restorana</td>
								<td>Mesto</td>
								<td>
									<input type="button" class="buttonAccept"></input>
									<input type="button" class="buttonDecline"></input>
								 </td>
								<td></td>
							</tr>
							<tr>
								<td>Cena porudzbine </td>
								<td>Dostavljac</td>
								<td></td>
								<td></td>
							</tr>					 
							</table>
						</div>
					</div>
				</div>
				<div v-if="orders === null" class="animated fadeIn">
					<img class="center" src="../images/noDelivery.jpg"/>
				</div>
			</div>
		  `
});