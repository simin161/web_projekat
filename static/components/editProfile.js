Vue.component('edit-profile', {
	data: function(){
		return{
			loggedUser: null
		};
	},
template: `<div>
		<header>
		<span>Web projekat</span>
		<div class="topnav">
			<span v-if="userType === 'customer'"> 
				<a>Pregled restorana </a>
			</span>
			<span v-if="userType === 'administrator'" >
				<a>Dodavanje restorana </a>
				<a>Dodavanje korisnika</a>
				<a>Pregled restorana </a>
				<a>Pregled korisnika </a>
			</span>
			<span v-if="userType === 'manager'">
				<a>Prikaz restorana</a>
				<a>Pregled zahteva </a>
			</span>
			<span v-if="userType === 'deliverer'">
				<a>Pregled zahteva</a>
				<a>Porudžbine bez dostavljača</a>
				<a>Pregled dostava</a>
			</span>
			<sign-out></sign-out>
		</div>
		</header>
		<br/>
		
		<div style="margin-top: 100px; margin-left: 42%; margin-bottom:23%">
			<form>
				<table>
					<tr>
						<td> </td>
						<td> <input type="button" value="Izmeni nalog"></input> </td>
						<td> </td>
					</tr>
					<tr>
						<td>Ime: </td>
						<td> <input type="text"> </input> </td>
					</tr>
					<tr>
						<td>Prezime: </td>
						<td><input type="text"></input></td>
					</tr>
					<tr>
						<td>Datum rođenja:</td>
						<td><input type="date"></input> </td>
					</tr>
					<tr>
						<td>Pol:</td>
						<td>
							<select>
								<option>Muško</option>
								<option>Žensko</option>
							</select>
						</td>
					</tr>
					<tr>
						<td>Korisnicko ime: </td>
						<td><input type="text"></input></td>
					</tr>
					<tr>
						<td>Lozinka: </td>
						<td><input type="text"></input></td>
					</tr>
					<tr>
						<td></td>
						<td><input type="button" value="Sačuvaj"></input></td>
						<td></td>
					</tr>
				</table>
			</form>
		</div>
		</div>`
});