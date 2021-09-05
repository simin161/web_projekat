Vue.component("customerCart", {
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
						<span style="float: left;">
							<img style="border-radius: 5px;" :src="article.articleImage" height="90px" width="90px">
						</span> 
						<span>
							<button class="deleteArticle" @click="removeFromCart(article)" title="Izbaci iz korpe"></button>
							<button class="changeArticle" @click="editFromCart(article)" title="Izmeni artikal"></button> 
							<input type="number" v-model= "article.totalNumberOrdered" min="1" onKeyDown="return false" class="numberAddToCart"></input>
						</span>
						<p>{{article.name}}</p>
						<p>Cena: {{article.price}} dinara</p>
						<p>Količina: {{article.totalNumberOrdered}}</p>
						<p>{{article.description}}</p>
						<p>{{article.articleType}}</p>
						 
					</div>
				</div>
			</div>
			<div class="animated fadeIn" v-if="articles === null">
				<img class="center" src="../images/noArticles.png"/>
			</div>
		</div>
		`
	,
	methods: {
		
		removeFromCart : function(item){
		
			axios.post("/removeFromCart", item)
			.then(response =>(alert("Artikal je uspešno izbačen iz korpe!")))
		
		},
		
		editFromCart : function(item){
		
			axios.post("/updateCart", item)
			.then(response =>(console.log()))
		
		}
		
	}
	, mounted(){
	
		axios.get("/getCartArticles")
		.then(response=> (this.articles = response.data))
	}
});