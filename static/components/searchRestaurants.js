Vue.component('search-restaurant', {
	data: function(){
		return{
			show: false,
		    scrolled: false
		};
	},
template: `<div>
			    <ul :class="scrolled ? 'scrollRest' : 'rest'">
			    	<li><a @click="show = true">Pretraga</a></li>
			    </ul>
			   
			  <div class="modal" v-show="show">
			  <div class="modal-content">
				<span class="close" @click="show = false">&times;</span>
					<table style="text-align: left; margin: auto">
						<tr>
							<td><input type="text" placeholder="Naziv restorana..."></input></td>
						</tr>
						<tr>
							<td><input type="text" placeholder="Tip..."></input></td>
						</tr>
						<tr>
							<td><input type="text" placeholder="Lokacija..."></input></td>
						</tr>
						<tr>
							<td><input type="number" placeholder="Prosečna ocena..."></input></td>
						</tr>
						<tr>
							<td><input type="button" value="Pretraži"></input></td>
						</tr>
						<tr>
							<td><input type="button" value="Prikaži samo otvorene restorane"></input></td>
						</tr>
						<br/>
						<tr>
							<td>Sortiraj po (rastuće):</tr>
						</tr>
						<tr>
							<td><input type="button" value="nazivu restorana"></input></td>
						</tr>
						<tr>
							<td><input type="button" value="lokaciji"></input></td>
						</tr>
						<tr>
							<td><input type="button" value="prosečnoj oceni"></input></td>
						</tr>
						<br/>
						<tr>
							<td>Sortiraj po (opadajuće):</tr>
						</tr>
						<tr>
							<td><input type="button" value="nazivu restorana"></input></td>
						</tr>
						<tr>
							<td><input type="button" value="lokaciji"></input></td>
						</tr>
						<tr>
							<td><input type="button" value="prosečnoj oceni"></input></td>
						</tr>
					</table>
			  </div>
			</div>
	`
	,
	methods : {
		handleScroll () {
		    this.scrolled = window.scrollY > 0;
		  }
	},
	created () {
	  window.addEventListener('scroll', this.handleScroll);
	},
	destroyed () {
	  window.removeEventListener('scroll', this.handleScroll);
	}
});