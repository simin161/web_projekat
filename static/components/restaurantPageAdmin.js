Vue.component("restaurantPageAdmin", {
	data: function(){
		return{
			restaurant: null,
			articles: null,
			comments : null,
			showComponent : "1"
		};
	},
template: `<div>
		<navigation-header></navigation-header>
		<br/>
		<img :src="restaurant.restaurantLogo" height="100%" width="100%"/>
		<div>
			<form class="formBackground">
			<table class="tableFrontRestaurant">
				<tr>
					<td>Naziv restorana:</td>
					<td>{{restaurant.name}}</td>
				</tr>
				<tr>
					<td>Tip restorana:</td>
					<td>{{restaurant.restaurantType}}</td>
				</tr>
				<tr>
					<td>Prosečna ocena:</td>
					<td><input type="text" class="nistaBrate" :disabled="true" v-model="restaurant.averageMark"></input></td>
				</tr>
				<tr>
					<td>Lokacija:</td>
					<td>{{restaurant.location.address}}</td>
				</tr>
				<tr>
					<td>Status:</td>
					<td v-if="restaurant.status === 'OPEN'">OTVORENO</td>
					<td v-if="restaurant.status === 'CLOSED'">ZATVORENO</td>
				</tr>
			</table>
		</form>
		</div>
		<hr/>
		
		<form class="searchForm">
			<button class="aaa" @click="showArticles()">Prikaži artikle</button>
			<button class="aaa" @click="showComments()">Prikaži komentare</button>
		</form>
		
		</br>
		</br>
		
			<div v-if="showComponent === '1'">
				<div v-if="restaurant.articles != null">
					<div class="lists" v-for="article in restaurant.articles">
					</br>
						<span style="float: left;">
							<img style="border-radius: 5px;" :src="article.articleImage" height="40%" width="40%">
						</span> 
						<p>{{article.name}}</p>
						<p>Cena: {{article.price}} dinara</p>
						<p>Količina: {{article.quantity}} grama</p>
						<p>{{article.description}}</p>
						<p v-if="article.articleType === 'FOOD'">Hrana</p>
						<p v-if="article.articleType === 'DRINK'">Piće</p>
						<span>
							<button class="deleteArticle" @click="deleteArticle(article)" title="Obriši artikal"></button>
						</span>
						</br>
						</br>
					</div>
				</div>
				<div class="animated fadeIn" v-if="!restaurant.articles || !restaurant.articles.length">
					<img class="center" src="../images/noArticles.png"/>
				</div>
			</div>
			<div v-if="showComponent === '2'">
				<div class="animated fadeIn" v-if="!comments || !comments.length">
					<img class="center" src="../images/noComments.png"/>
				</div>
				<div>
					<div class="lists" v-for="comment in comments"">
						
						</br>
						<span>
							<img style="border-radius: 5px;" src="./images/user.png" height="20%" width="20%">
						</span> 
					
						<p>{{comment.customer.name}}</p>
						<p>{{comment.text}} </p>
						<p>Ocena: {{comment.mark}}</p>
						<p>Status komentara: {{comment.status}}</p>
						<span>
							<button class="deleteArticle" @click="deleteComment(comment)" title="Obriši komentar"></button>
						</span>
						</br>
						</br>
					</div>
				</div>
			</div>
			</br>
			</br>
			</br>
			</br>
			</br>
			</br>
			</br>
			</br>
			</br>
			</br>
			</br>
			</br>
		</div>`
	,
	methods:{
	
		showArticles : function(){
		
			event.preventDefault();
			this.showComponent = "1";
		
		},
	
		showComments : function(){
			this.showComponent = "2";
			event.preventDefault();
			axios.get("/getAllCommentsForRestaurantAdmin")
			.then(response =>(this.comments = response.data))
		},
		
		deleteComment : function(item){
		
			axios.post("/deleteComment", item)
				.then(response => {alert("Komentar je uspešno izbrisan!"), this.comments = response.data,
					axios.get("/getSelectedRestaurantFrontCustomer")
					.then(response => {this.restaurant = response.data[0]})})
		
		},
		
		deleteArticle : function(item){
		
			axios.post("/deleteArticleAdmin", item)
				.then(response => {alert("Artikal je uspešno izbrisan!"), this.restaurant.articles = response.data})
		
		}
		
		
	}
	,
	mounted(){
		axios.get("/getSelectedRestaurantFrontCustomer")
		.then(response => {this.restaurant = response.data[0], this.articles = this.restaurant.articles})
	}
	
});