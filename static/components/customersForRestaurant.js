Vue.component("customers-for-restaurant", {
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
					<p>{{item}}</p>
					<p>Ime prezime kupca </p>
					<p>Porudzbine??? </p> 
				</div>
			</div>
		</div>
		`
});