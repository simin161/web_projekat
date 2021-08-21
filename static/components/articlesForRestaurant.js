Vue.component("articles-for-restaurant", {
	data: function(){
		return{
			items: ['Hello Vue!', '123', '456', '789', '101112']
		};
	}
	,
	template: `
		<div>
			<div class="lists" v-for="item in items">
				<div>
					<span style="float: left; margin-top: 5px">
						<img style="border-radius: 5px;" src="http://placekitten.com/g/200/200" height="90px" width="90px">
					</span> 
					<span>
						<button class="deleteArticle"></button> 
						<button class="changeArticle"></button>
					</span>
					<p>{{item}}</p>
					<p>Ime prezime kupca </p>
					<p>Porudzbine??? </p> 
				</div>
			</div>
		</div>
		`
});