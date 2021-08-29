Vue.component("add-article",{
	data: function(){
			return{
				article:{
						id: "",
						name: "",
						price: "",
						articleType: "",
						restaurant: "",
						quantity: "",
						description: "",
						articleImage: ""
				}
			}
	},
	
	template: `
		<div>
			<navigation-header></navigation-header>
		
			<div style="margin-top: 100px; margin-left: 38%; margin-bottom:23%" >
			<form>
				<table style="width: 50%">
					<tr >
						<td>Naziv artikla: </td>
						<td> <input type="text" v-model="article.name"> </input> </td>
					</tr>
					<br/>
					<tr>
						<td>Tip artikla: </td>
						<td>
							<select v-model="article.articleType">
								<option value="FOOD">Hrana</option>
								<option value="DRINK">Piće</option>
							</select>
						</td>
					</tr>
					<br/>
					<tr>
						<td>Opis:</td>
						<td><textarea v-model="article.description"></textarea></td>
					</tr>
					<br/>
					<tr>
						<td>Količina:</td>
						<td><input type="text" v-model="article.quantity"></input></td>
					</tr>
					<br/>
					<tr>
						<td>Cena:</td>
						<td><input type="text" v-model="article.price"></input></td>
					</tr>
					<br/>
					<tr>
						<td>Slika: </td>
						<td><input type="file" v-model="article.articleImage"></input></td>
					</tr>
					<br/>
				</table>
				<input @mouseover="mouseOver" @mouseleave="mouseLeave" type="button" v-bind:style="{'background-color': backgroundColor, 'color': 'white', 'visibility': visibility, 'width':'37%'}" value="Sačuvaj"  v-on:click="save"></input>
			</form>
			<p>{{message}} </p>
		</div>
		</div>
	`
	
});
