Vue.component("restaurantArticles", {
	data: function(){
		return{
			articles: null
		};
	}
	,
	template: `
		<div>
		<navigation-header></navigation-header>
			<div v-if="articles != null">
				<div class="lists" v-for="article in articles">
					<div>
						<span style="float: left;">
							<img style="border-radius: 5px;" :src="article.articleImage" height="90px" width="90px">
						</span> 
						<span>
							<button class="deleteArticle" @click="deleteArticle(article)">Dodaj u korpu</button> 
							<button class="changeArticle" @click="editArticle(article)">Izbaci iz korpe</button>
						</span>
						<p>{{article.name}}</p>
						<p>Cena: {{article.price}} dinara</p>
						<p>Količina: {{article.quantity}}</p>
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
		
	}
	, mounted(){
		axios.get("/getRestaurantArticles")
			.then(response => (this.articles = response.data))
	}
});