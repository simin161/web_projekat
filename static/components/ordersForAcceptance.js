Vue.component('orders-for-acceptance', {
	data: function(){
		return{
			items : ['1', '2', '3', '4', '5']
		};
	},
template: ` <div>
			<header>
				<span>Web projekat</span>
				<div class="topnav">
					<a>Prikaz restorana</a>
					<a href="#/edit-profile">Moj nalog</a>
					<sign-out></sign-out>
				</div>
			</header>
			<br/>
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
		  `
});