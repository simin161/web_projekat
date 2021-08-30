Vue.component("add-article",{
	data: function(){
			return{
				article:{
						id: "",
						name: "",
						price: null,
						articleType: "",
						restaurant: "",
						quantity: null,
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
						<td><input type="number" v-model.number="article.quantity"></input></td>
					</tr>
					<br/>
					<tr>
						<td>Cena:</td>
						<td><input type="number" v-model.number="article.price"></input></td>
					</tr>
					<br/>
					<tr>
						<td>Slika: </td>
						<td><input type="file" @change="imageSelected"></input></td>
					</tr>
					<br/>
				</table>
				<input type="button" value="Sačuvaj"  v-on:click="save"></input>
			</form>
			
		</div>
		</div>
	`
	,
	methods : {
		save : function(){
			axios.post("/addArticle", this.article)
			.then(response=>(router.push("/show-restaurant")))
		},
		imageSelected(event){
			this.article.articleImage = event.target.files[0].name
		}
	}
});
