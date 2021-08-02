Vue.component('app-restaurants', {
	data: function(){
		return{
			items: ['Hello Vue!', '123', '456', '789', '101112']
		};
	},
template: `<div>
				<div class="restaurants" v-for="item in items">
					<span style="float: left; margin-top: 15px">
						<img style="border-radius: 5px;" src="http://placekitten.com/g/200/200" height="90px" width="90px">
					</span> 
					<span>
						<button class="infoRestaurant"> </button> 
					</span>
					<p>{{item}}</p>
					<p>Tip restorana </p>
					<p>Lokacija </p> 
				</div>
			</div>`
});

var app = new Vue({
	el: '#app',

	
})