<template>
	<div class = "app">
		<div v-for="pot in pots_selected"
		v-bind:key="pot.x"
		:style="{position: 'absolute', top:pot.y, left:pot.x}" 
		class="card">
			<Card v-bind:active="pot.full" />
		</div>
	</div>
</template>

<script>

import Card from './components/Card.vue';
import pots from './scripts/matrix.json'

export default {
	data() {
		return {
			pots: pots,
			pots_selected: [],
			isLogged: false
		}
	},
	components: {
		'Card': Card
	},
	created: function() {

		var i = 0
		while ( i < this.select_pots.length ) {
			var sel = this.select_pots[i]
			if( i == this.select_active) {
				this.pots[sel].full = true
			}
			this.pots_selected.push(this.pots[sel])
			i++
		}
		
	},/*
	methods: {
		logdata: function () {
			console.log(this.pots)
		},

	},*/
/*	mounted: {
		logdata()
	},*/
	computed: {
		select_pots: function () {
			var amount = 11,
			lower_bound = 0,
			upper_bound = 21,
			pots_selected = []

			while (pots_selected.length < amount) {
				var rn = 
					Math.floor(Math.random()*(upper_bound - lower_bound) + lower_bound);
					if (pots_selected.indexOf(rn) == -1) { 
						pots_selected.push(rn);
					}
			}
			return pots_selected;
		},
		select_active: function () {
			var size = 11;
			var active = Math.floor(Math.random()*size);
			return active;
		}
	}
}

</script>

<style>
.app {
	width: 1200px;
	height: 864px;
	background-image: url("./assets/bg.png");
	background-size: contain;
	background-repeat: no-repeat;
	position: relative;
	transform-origin: 0 0;
	transform: scale(0.73);
	overflow: hidden;
},
.card {
	position: absolute;
	}
</style>
