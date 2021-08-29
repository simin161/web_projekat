Vue.component("comments-for-restaurant", {
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
		</div>
		`
});