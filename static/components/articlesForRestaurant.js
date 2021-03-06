Vue.component("articles-for-restaurant", {
	data: function(){
		return{
			articles: null
		};
	}
	,
	template: `
		<div>
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
						<input type="button"  class="changeArticle" @click="editArticle(article)" value="Izmeni"></input>
						<input type="button" class="buttonDecline"  @click="deleteArticle(article)" value="Izbriši"></input> 
				</div>
			</div>
			<div class="animated fadeIn" v-if="articles === null">
				<img class="center" src="../images/noArticles.png"/>
			</div>
		</div>
		`
	,
	methods: {
		deleteArticle : function(article){
			console.log(article)
			axios.post("/deleteArticle", article)
			.then(response => (this.articles = response.data))
		} ,
		editArticle : function(article){
			axios.post("/showArticle", article)
			.then(response => (router.push("/show-article")))
		}
	}
	, mounted(){
		axios.get("/getArticlesForRestaurant")
			.then(response => (this.articles = response.data))
	}
});