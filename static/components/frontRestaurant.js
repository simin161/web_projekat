Vue.component("restaurant-detail", {
	data: function(){
		return{
			restaurant: null,
			comments : null,
			showComponent : "1"
		};
	},
template: `<div>
		<app-modal></app-modal>
		<br/>
		<ul class="rest">
			<li><a @click="showComponent = '1'">Prikaz artikala</a></li>
			<li><a @click="loadComments">Prikaz komentara</a></li>
		</ul>
		<img :src="restaurant.restaurantLogo" height="100%" width="100%"/>
		<div style="margin-left: 45%">
			<p>Naziv restorana: {{restaurant.name}}</p>
			<p>Tip restorana: {{restaurant.restaurantType}}</p>
			<p>Prosečna ocena: {{restaurant.averageMark}}</p>
		</div>
		<hr/>
			<div v-if="showComponent === '1'">
				<div v-if="restaurant.articles != null">
					<div class="lists" v-for="article in restaurant.articles">
						<span style="float: left;">
							<img style="border-radius: 5px;" :src="article.articleImage" height="90px" width="90px">
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
						<p>{{comment.customer.username}}</p>
						<p>{{comment.text}} </p>
						<p>Ocena: {{comment.mark}}</p>
					</div>
				</div>
			</div>
		</div>`
	,
	methods:{
		loadComments : function(){
			this.showComponent = "2";
			
			axios.get("/getCommentsForRestaurant")
			.then(response =>(this.comments = response.data))
		}
	}
	,
	mounted(){
		axios.get("/getSelectedRestaurantFront")
		.then(response => (this.restaurant = response.data[0]))
	}
	
});