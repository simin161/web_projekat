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
		<ul :class="scrolled ? 'scrollRest' : 'rest'">
				<li><a @click="isDisabled = false; backgroundColor = '#5eaaa8'; visibility = 'visible'">Pregled korpe</a> </li>
		</ul>
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
							<button class="delete" @click="removeFromCart(article)" title="Izbaci iz korpe"></button> 
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
		
		removeFromCart : function(item){
		
			axios.post("/updateCart", item)
			.then(response =>(alert("Artikal je uspešno izbačen iz korpe!")))
		
		}
		
	}
	, mounted(){
	
		axios.get("/getCartArticles")
		.then(response=> (this.articles = response.data))
	}
});