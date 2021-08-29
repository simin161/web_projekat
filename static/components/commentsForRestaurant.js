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
					<span style="float: right">
						<input type="button" class="accept"></input>
						<input type="button" class="decline"></input>
					</span>
					<p>{{item}}</p>
					<p>Porudzbina</p>
					<p>Dostavljac</p> 
					<p>Cena</p>
				</div>
			</div>
			<div v-if="comments === null" class="animated fadeIn">
				<img class="center" src="../images/noComments.png"/>
			</div>
			</div>
		</div>
		`
});