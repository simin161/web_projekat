Vue.component('show-restaurant',{
	data: function(){
		return{
			items: ['Hello Vue!', '123', '456', '789', '101112']
		};
	}
	,
	template: `
		 <div>
		 	<navigation-header></navigation-header>
			<div style="margin-top: 3%; margin-left: 35%">
				<p style="float: left;">
					<img src="http://placekitten.com/g/200/200" height="65%" width="65%">
				</p>
				<table>
					</br>					
					<tr>
						<td>Restoran</td>
						<td><input type="text"></input></td>
					</tr>
					</br>
					
					<tr>
						<td>Tip restorana </td>
						<td> 
							<select>
								<option>Tip</option>
							</select>
						</td>
					</tr>
					</br>
					
					<tr>
						<td>Lokacija</td>
						<td> <input type="text"></input></td>
					</tr>
					</br>
				</table>
				<input style="margin-left: -10%" type="button" value="Promena slike"></input>
				<input type="button" value="Izmeni podatke"></input>
				<input type="button" value="Sacuvaj"></input>
			</div>
			<hr style="width: 100%">
			<div style="margin-left: 35%;">
				<input type="button" value="Prikaz kupaca"></input>
				<input type="button" value="Prikaz artikala"></input>
				<input type="button" value="Prikaz porudzbina"></input>
				<input type="button" value="Prikaz komentara"></input>
			</div>
		 </div>
	`
});