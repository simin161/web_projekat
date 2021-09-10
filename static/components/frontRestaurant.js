Vue.component("restaurant-detail", {
	data: function(){
		return{
			restaurant: null,
			comments : null,
			showComponent : "1"
		};
	},
template: `<div>
		<navigation-header></navigation-header>
		<br/>
		<ul class="rest">
			<li><a @click="showComponent = '1'">Prikaz artikala</a></li>
			<li><a @click="loadComments">Prikaz komentara</a></li>
		</ul>
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
					<td>{{restaurant.averageMark}}</td>
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
			<div v-if="showComponent === '1'">
				<div v-if="restaurant.articles != null">
					<div class="lists" v-for="article in restaurant.articles">
						<div>
							<img style="border-radius: 5px;" :src="article.articleImage" height="100%" width="100%">
						</div> 
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