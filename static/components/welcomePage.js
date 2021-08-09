Vue.component('welcome-page', {
	data: function(){
		return{
			items: ['Hello Vue!', '123', '456', '789', '101112']
		};
	},
template: `<div>
		<header>
		<span>Web projekat</span>
		</header>
		<br/>
		
		<form class="searchForm">
			<input type="text" placeholder="Naziv restorana..."/>
			<select >
				<option value="">Tip restorana</option>
			</select>
			<input type="text" placeholder="Lokacija..."/> 
			<input type="text" placeholder="Prosečna ocena"/>
			<input type="button" class="buttonSearch"/>
		</form>
		<hr>
			<div>
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
			</div>
		</div>`
});
