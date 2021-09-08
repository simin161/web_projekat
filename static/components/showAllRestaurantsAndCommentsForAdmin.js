Vue.component('showRestaurantsAndComments', {
	data: function(){
		return{
			restaurantsToDisplay: null,
			selectedRestaurant: null,
			showComment: false,
			comments: null
		};
	},
template: `<div>
		<navigation-header></navigation-header>
		<form class="searchForm" style="">
			<input type="text" placeholder="Naziv restorana..."/>
			<select id="tipRestorana">
				<option value="">Tip 1</option>
				<option>Tip 2</option>
				<option>Tip 3</option>
			</select>
			<input type="text" placeholder="Lokacija..."/> 
			<input type="text" placeholder="Prosečna ocena"/>
			<input type="button" class="buttonSearch"/>
		</form>
		<hr>
			<div>
				<div v-for="item in restaurantsToDisplay">
					<div class="lists">
						<span style="float: left; margin-top: 2.5px">
							<img style="border-radius: 5px;" :src="item.restaurantLogo" height="150px" width="150px">
						</span> 
						<span>
							<button title="Poruči hranu" class="infoRestaurant" @click="openArticles(item)"> </button> 
							<button title="Prikaži komentare" class="commentRestaurant" @click="showComments(item)"></button>
						</span>
						<p>{{item.name}}</p>
						<p>{{item.restaurantType}} </p>
						<p>POSTAVITI LOKACIJU KAD BUDE LOKACIJE</p> 
						<p>Prosečna ocena restorana: {{item.averageMark}}</p>
						<br/>
						<br/>
					
					</div>
					
					<div class="listsArticles" v-if="comment.commentedRestaurant.id === item.id" v-for="comment in comments">
					
						<p>{{comment.customer.username}}</p>
						<p>{{comment.text}}</p>
						<p>Ocena: {{comment.mark}}</p>
					</div>	
					
				</div>
			</div>
		</div>`
	,
	methods: {
	
		openArticles : function(item){
		
			if(item.status==="OPEN")
				axios.post("/selectRestaurant", item)
				.then(response =>(router.push("restaurantArticles")))
			else
				alert("Restoran je trenutno zatvoren!")
		},
		
		showComments : function(item){
		
			axios.post("/getCommentsForRestaurantCustomer", item)
			.then(response=> {
									this.comments = response.data;
									showComment = true;
									console.log(this.comments)
									if(this.comments.length==0)
										alert("Za izabrani restoran ne postoje komentari za prikaz.");
									
									
						})	
			
			
			
		
		}
	
	}
	,
	mounted(){
		axios.get("/getAllRestaurants")
		.then(response => (this.restaurantsToDisplay = response.data))
	}
});