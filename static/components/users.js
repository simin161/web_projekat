Vue.component('users', {
	data: function(){
		return{
			usersToDisplay: null,
			selectedUser: null,
		};
	},
template: `<div>
		<navigation-header></navigation-header>
		<form class="searchForm" style="">
			
		</form>
		<hr>
			<div>
				<div v-for="item in usersToDisplay">
					<div class="lists">
						<span style="float: left; margin-top: 2.5px">
							<img style="border-radius: 5px;" src="../images/user.png" height="150px" width="150px">
						</span> 
						<span>
							<button title="Obriši korisnika" class="deleteArticle" @click="deleteUser(item)"> </button> 
						</span>
						<p>Korisničko ime: 	{{item.username}}</p>
						<p>Ime: 			{{item.name}} </p>
						<p>Prezime:			{{item.surname}} </p> 
						<p>Tip korisnika: 	{{item.userType}}</p>
						<p v-if="item.userType === 'CUSTOMER'">Broj osvojenih bodova: {{item.collectedPoints}}</p>
						<p v-if="item.userType === 'CUSTOMER'">Tip kupca: {{item.customerType}}</p>
						<br/>
						<br/>
					
					</div>
				</div>
			</div>
		</div>`
	,
	methods: {
	
		deleteUser : function(item){
		
				axios.post("/selectRestaurant", item)
				.then(response =>(router.push("restaurantPageAdmin")))
				
		}
	}
	,
	mounted(){
		axios.get("/getAllUsers")
		.then(response => (this.usersToDisplay = response.data))
	}
});