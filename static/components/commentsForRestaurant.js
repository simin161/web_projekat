Vue.component("comments-for-restaurant", {
	data: function(){
		return{
			comments: null
		};
	}
	,
	template: `
		<div>
			<div class="lists" v-for="comment in comments">
				<div>
					<span style="float: right" v-if="comment.status === 'PENDING'">
						<input type="button" @click="acceptComment(comment.id)" class="accept"></input>
						<input type="button" @click="declineComment(comment.id)" class="decline"></input>
					</span>
					<p>{{comment.customer.username}}</p>
					<p>{{comment.text}}</p>
					<p>Ocena: {{comment.mark}}</p> 
					<p>Status: {{comment.status}}</p>
				</div>
			</div>
			<div v-if="comments === null" class="animated fadeIn">
				<img class="center" src="../images/noComments.png"/>
			</div>
			</div>
		</div>
		`
		,
		methods : {
			declineComment : function(id){
				axios.post("/declineComment", id)
				.then(response => (this.comments = response.data))
			},
			acceptComment: function(id){
				axios.post("/acceptComment", id)
				.then(response => (this.comments = response.data))
			}
		}
		,
		mounted(){
			axios.get("/getAllCommentsForRestaurant")
			.then(response => (this.comments = response.data))
	}
});