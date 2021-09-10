Vue.component("restaurantArticles", {
	data: function(){
		return{
			articles: null,
			selectedRestaurant: null
		};
	}
	,
	template: `
		<div>
		<navigation-header></navigation-header>
		<br/><br/>
		<br/><br/>
		<br/><br/>
			<div v-if="articles != null">
				<div class="lists" v-for="article in articles">
						</br>
						<div>
							<img style="border-radius: 5px;" :src="article.articleImage" height="50%" width="50%">
						</div> 
						<p>{{article.name}}</p>
						<p>Cena: {{article.price}} din</p>
						<p>Količina: {{article.quantity}} grama</p>
						<p v-if="article.articleType === 'FOOD'">Tip artikla: Hrana</p>
						<p v-if="article.articleType === 'DRINK'">Tip artikla: Piće</p>
						<input type="number" v-model= "article.totalNumberOrdered" min="1" onKeyDown="return false" class="numberAddToCart"></input>
						<button class="addToCart" :disabled="article.totalNumberOrdered === 0" @click="addToCart(article)" title="Dodaj u korpu">+</button> 
						</br>
						</br>
					</div>
			</div>
			<div class="animated fadeIn" v-if="articles === null">
				<img class="center" src="../images/noArticles.png"/>
			</div>
		</div>
		`
	,
	methods: {
		
		addToCart : function(item){
		
			axios.post("/updateCart", item)
			.then(response =>(alert("Artikal je uspešno dodat u korpu!")))
		
		}
		
	}
	, mounted(){
	
		axios.get("/getSelectedRestaurant")
		.then(response=> (this.articles = response.data))
	}
});