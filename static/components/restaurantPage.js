Vue.component('show-restaurant',{
	data: function(){
		return{
			items: ['Hello Vue!', '123', '456', '789', '101112'],
			showComponent : '1'
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
				<input type="button" value="Prikaz kupaca" @click="showComponent='1'"></input>
				<input type="button" value="Prikaz artikala" @click="showComponent='2'"></input>
				<input type="button" value="Prikaz porudzbina" @click="showComponent='3'"></input>
				<input type="button" value="Prikaz komentara" @click="showComponent='4'"></input>
			</div>
			</br>
			<div v-if="showComponent === '1'">
				<customers-for-restaurant></customers-for-restaurant>
			</div>
			<div v-if="showComponent === '2'">
				<articles-for-restaurant></articles-for-restaurant>
			</div>
			<div v-if="showComponent === '3'">
				<orders-for-restaurant></orders-for-restaurant>
			</div>
			<div v-if="showComponent === '4'">
				<comments-for-restaurant></comments-for-restaurant>
			</div>
		 </div>
	`
});