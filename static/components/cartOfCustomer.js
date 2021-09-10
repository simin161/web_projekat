Vue.component("customerCart", {
	data: function(){
		return{
			articles: null,
			selectedRestaurant: null,
			total : 0
		};
	}
	,
	template: `
		<div>
		<navigation-header></navigation-header>
		<ul class="rest">
				<li><a @click="placeOrder(item)">Plaćanje</a></li>
		</ul>
		
		<br/><br/>
		<br/><br/>
		<br/><br/>
			<div v-if="articles != null">
				<div class="lists" v-for="article in articles" v-if="article.isDeletedFromCart === false">
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
				
				<div class="lists">
				
					<div>
						<p>Ukupno za platiti: {{total = totalCost()}} din.</p>
					</div>
				
				</div>
				
			</div>
			<div class="animated fadeIn" v-if="total === 0">
				<img class="center" src="../images/noArticles.png"/>
			</div>
		</div>
		`
	,
	methods: {
		
		removeFromCart : function(item){
		
			axios.post("/removeFromCart", item)
			.then(response =>(alert("Artikal je uspešno izbačen iz korpe!")))
			this.$router.go()
		
		},
		
		editFromCart : function(item){
		
			axios.post("/updateCart", item)
			.then(response =>(alert("Stanje artikla je uspešno ažurirano!")))
		
		},
		
		totalCost : function(){
			
			let sum = 0.0;
			
			for(let i=0; i < this.articles.length; i++){
			
				if(this.articles[i].isDeletedFromCart == false)
					sum = sum + parseFloat(this.articles[i].price) * parseFloat(this.articles[i].totalNumberOrdered);
			
			}
			
			return sum;
		
		},
		
		placeOrder: function(item){
		
			axios.post("/placeOrder", item)
			.then(response=>{alert("Vaša porudžbina je uspešno kreirana!"), this.$router.go()})
			
			
		}
	}
		
	, mounted(){
	
		axios.get("/getCartArticles")
		.then(response=> (this.articles = response.data))
		
	}
});