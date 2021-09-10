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
						<div>
							<img style="border-radius: 5px;" :src="article.articleImage" height="100%" width="100%">
						</div> 
						<p>{{article.name}}</p>
						<p>Cena: {{article.price}} dinara</p>
						<p>Količina: {{article.quantity}}</p>
						<p>{{article.description}}</p>
						<p>{{article.articleType}}</p>
						<input type="number" v-model= "article.totalNumberOrdered" min="1" onKeyDown="return false" class="numberAddToCart"></input>
						<button class="addToCart" @click="addToCart(article)" title="Dodaj u korpu">+</button> 
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