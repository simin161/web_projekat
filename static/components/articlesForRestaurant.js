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
						<span style="float: left; margin-top: 5px">
							<img style="border-radius: 5px;" src="http://placekitten.com/g/200/200" height="90px" width="90px">
						</span> 
						<span>
							<button class="deleteArticle"></button> 
							<button class="changeArticle"></button>
						</span>
						<p>{{item}}</p>
						<p>Ime prezime kupca </p>
						<p>Porudzbine??? </p> 
					</div>
				</div>
			</div>
			<div class="animated fadeIn" v-if="articles === null">
				<img class="center" src="../images/noArticles.png"/>
			</div
		</div>
		`
	, mounted(){
		axios.get("/getArticlesForRestaurant")
			.then(response => (this.articles = response.data))
	}
});