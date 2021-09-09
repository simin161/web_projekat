Vue.component('edit-article', {
	data: function(){
		return{
			article: null,
			scrolled: false,
			visibility: 'hidden',
			isDisabled: true,
			message : "",
			dto: {
				article: null,
				edited: null
			},
			imagePosted: false
		}
},
template: `
			<div>
				<navigation-header></navigation-header>
				<ul  :class="scrolled ? 'scrollRest' : 'rest'">
					<li><a @click="isDisabled = false; visibility = 'visible'">Izmeni podatke</a> </li>
				</ul>
				<br/>
				<div>
					<img :src="article.articleImage" height="100%" width="100%"/>
				</div>
				<div style="margin-left: 35%">
					<table>
						</br>					
						<tr>
							<td>Naziv artikla:</td>
							<td><input type="text" :disabled="isDisabled" v-model="article.name"></input></td>
						</tr>
						</br>
						<tr>
							<td>Tip artikla: </td>
							<td> 
								<select :disabled="isDisabled" v-model="article.articleType">
									<option value="FOOD">Hrana</option>
									<option value="DRINK">Piće</option>
								</select>
							</td>
						</tr>
						</br>
						<tr>
							<td>Opis:</td>
							<td> <textarea :disabled="isDisabled" v-model="article.description"></textarea></td>
						</tr>
						</br>
						<tr>
							<td>Količina:</td>
							<td><input type="number" @keypress="validateNumberQuantity" :disabled="isDisabled" v-model="article.quantity"></input></td>
						</tr>
						</br>
						<tr>
							<td>Cena: </td>
							<td><input type="number" @keypress="validateNumberPrice" :disabled="isDisabled" v-model="article.price"></input></td>
						</tr>					
						</br>
						<tr v-bind:style="{'visibility': visibility}">
							<td>Slika: </td>
							<td><input type="file" @change="imageSelected" ></input></td>
						</tr>
					</table>
					<input type="button" v-bind:style="{'visibility': visibility}" value="Sačuvaj"  v-on:click="save"></input>
					<p>{{message}}</p>
				</div>
			</div>

		  `
	,
	methods:{
		 handleScroll () {
			    this.scrolled = window.scrollY > 0;
			  },
		imageSelected(event){
			const file = document.querySelector('input[type=file]').files[0]
			const reader = new FileReader()
				let rawImg;
				reader.onloadend = () => {
					this.article.articleImage = reader.result;
					console.log(this.article.articleImage);
				}
				reader.readAsDataURL(file);
					
			  },
		save : function(){
				if(/\S/.test(this.article.name) && /\S/.test(this.article.articleType) 
						 && /\S/.test(this.article.price)){
							if(!/-/.test(this.article.price)){
								axios.post("/editArticle", this.article)
								.then(response => {
									this.dto = response.data,
									this.article = this.dto.article,
									this.message = this.dto.edited ? "Uspešno je izmenjen artikal!" : "Došlo je do greške prilikom promene slike!"
									this.visibility = 'hidden'})
							}else{
								this.message = "Cena ne može biti negativan broj!"
							}
				}else{
					this.message = "Naziv, tip, cena, opis su obavezni!"
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
				}
		},
		created () {
		  window.addEventListener('scroll', this.handleScroll);
		},
		destroyed () {
		  window.removeEventListener('scroll', this.handleScroll);
		},
	mounted(){
	axios.get("/getChoosenArticle")
	.then(response => (this.article = response.data[0] ))
	}
});