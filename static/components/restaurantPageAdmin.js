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
		<div style="margin-left: 45%">
			<p>Naziv restorana: {{restaurant.name}}</p>
			<p>Tip restorana: {{restaurant.restaurantType}}</p>
			<p>Prosečna ocena: {{restaurant.averageMark}}</p>
			<p>Lokacija: {{restaurant.location.address}} </p>
			<p>Status: {{restaurant.status}}</p>
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
						<span style="float: left;">
							<img style="border-radius: 5px;" :src="article.articleImage" height="90px" width="90px">
						</span> 
						<span>
							<button class="deleteArticle" @click="deleteArticle(item)" title="Obriši artikal"></button>
						</span>
						<p>{{article.name}}</p>
						<p>Cena: {{article.price}} dinara</p>
						<p>Količina: {{article.quantity}}</p>
						<p>{{article.description}}</p>
						<p>{{article.articleType}}</p>
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
						<span>
							<button class="deleteArticle" @click="deleteComment(comment)" title="Obriši komentar"></button>
						</span>
						<p>{{comment.customer.username}}</p>
						<p>{{comment.text}} </p>
						<p>Ocena: {{comment.mark}}</p>
						<p>Status komentara: {{comment.status}}</p>
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
				.then(response => {alert("Komentar je uspešno izbrisan!"), this.comments = response.data})
		
		}
		
	}
	,
	mounted(){
		axios.get("/getSelectedRestaurantFrontCustomer")
		.then(response => {this.restaurant = response.data[0], this.articles = this.restaurant.articles})
	}
	
});