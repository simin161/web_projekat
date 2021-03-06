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
						articleImage: null
				},
				message: "",
				imagePath: false
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
						<td><input type="number" @keypress="validateNumberQuantity" min="0" v-model.number="article.quantity"></input></td>
					</tr>
					<br/>
					<tr>
						<td>Cena:</td>
						<td><input type="number" @keypress="validateNumberPrice" min="0" v-model.number="article.price"></input></td>
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
			<h3>{{message}}</h3>
		</div>
		</div>
	`
	,
	methods : {
		save : function(){
				if( /\S/.test(this.article.name) && /\S/.test(this.article.articleType) 
						 && /\S/.test(this.article.price) && this.imagePath){
					if(!/-/.test(this.article.price)){
						axios.post("/addArticle", this.article)
						.then(response=>(this.message = response.data))
					}else{
						this.message = "Cena ne može biti negativan broj!"
					}
				}
				else{
					this.message = "Naziv, tip, cena, opis i slika su obavezni!"
				}
		},
		validateNumberQuantity(event){
			let keyCode = event.keyCode;
			console.log(keyCode);
			if(this.article.quantity == "" && this.article.quantity != "0" && keyCode == 46)
				event.preventDefault();
			
			 if (!/^\d+\.?\d*$/.test(keyCode) || keyCode == 45 || keyCode == 43 || keyCode == 101) {
			        event.preventDefault();
			      }
		},
		validateNumberPrice(event){
			let keyCode = event.keyCode;
			console.log(keyCode);
			if(this.article.price == "" && this.article.price != "0" && keyCode == 46)
				event.preventDefault();
			
			 if (!/^\d+\.?\d*$/.test(keyCode) || keyCode == 45 || keyCode == 43 || keyCode == 101) {
			        event.preventDefault();
			      }
		},
		imageSelected(event){
			const file = document.querySelector('input[type=file]').files[0]
			const reader = new FileReader()

			if(file != null){
				let rawImg;
				this.imagePath = true;
				reader.onloadend = () => {
				   this.article.articleImage = reader.result;
				}
				reader.readAsDataURL(file);
			}
			else{
				this.imagePath = false
			}
		}
	}
});
