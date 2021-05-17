<template>
<div class="app">

	<div id="game">

		<div v-for="pot in pots_selected"
		v-bind:key="pot.x"
		:style="{position: 'absolute', top:pot.y, left:pot.x}" 
		class="card">
			<Card v-bind:active="pot.full" />
		</div>

	</div>

	<div id="Admin">
		<p class="comm">РАЗВИВАЮЩИЕ ИГРЫ «БЭРСФОРД»</p>
		<img class="logo" src='./assets/logo-sm.svg'>
		<p class="head">THE BEARSFORD GAMES</p>
		<br />
		<input class="input-style" 
			placeholder="name" 
			type="text">
		<input class="input-style"
			placeholder="password"
			type="password">
		<div class="radius-button" @click="screen">Sign In</div>
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
			isLogged: false,
			fullScreen: false,
			adminPos: null,
			adminWidth: null,
			scrHeight: screen.height,
			winHeight: window.innerHeight
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
		
	},
	methods: {
		screen() {
			let self = this;
			let element = document.querySelector(".app");
			if (self.fullScreen) {
				if (document.exitFullscreen) {
					document.exitFullscreen();
				} else if (document.webkitCancelFullScreen) {
					document.webkitCancelFullScreen();
				} else if (document.mozCancelFullScreen) {
					document.mozCancelFullScreen();
				} else if (document.msExitFullscreen) {
					document.msExitFullscreen();
				}
				self.fullScreen = false;
			} else {
				if (element.requestFullscreen) {
					element.requestFullscreen();
				} else if (element.webkitRequestFullScreen) {
					element.webkitRequestFullScreen();
				} else if (element.mozRequestFullScreen) {
					element.mozRequestFullScreen();
				} else if (element.msRequestFullscreen) {
					element.msRequestFullscreen();
				}
				self.fullScreen = true;
			}
		},
	},
	mounted: function () {
		this.adminPos = document.querySelector("#game").getBoundingClientRect().width
		this.adminWidth = document.querySelector("#Admin").getBoundingClientRect().width
	},
/*	watch: {
		isFull: function() {
			var self = this
			if(screen.height == self.Wh) {
				self.fullSreen = true
				document.querySelector("#game").style.left = self.adminWidth/4+'px'
				document.querySelector("#game").style.transform = 'scale(0.9)'
				document.querySelector("#Admin").style.display = "none"
			} else {	
				self.fullSreen = false
				document.querySelector("#game").style.left = "0"
				document.querySelector("#game").style.transform = 'scale(0.73)'
				document.querySelector("#Admin").style.display = "block"
			}
		}
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
#game {
	width: 1200px;
	height: 864px;
	background-image: url("./assets/bg.png");
	background-size: 100%;
	background-repeat: no-repeat;
	position: relative;
	transform-origin: 0 0;
	transform: scale(0.77);
	display: inline-block;
}
#Admin {
	position: absolute;
	width: 490px;
	height: 864px;
	display: block;
	padding-top: 45px;
	background: #ccc;
	top: 0;
	right: 0;
	font-family: Alliance;
	font-size: 21px;
	text-align: center;
}
.app:fullscreen: {
	text-align: center;
}
.app:fullscreen #Admin {
	display: none;
}
.app:fullscreen #game {	
	transform: scale(0.9);
	transform-origin: 50% 0;
}

p {
	font-size: 36px;
	text-align: center;
	line-height: 1.2;
	color: #008B94;
}
.logo {
	width: 100px;
	filter: drop-shadow(0 0 3px rgba(100,0,0,0.5));
	margin: 0 auto;
	display: block;
}
.card {
	position: absolute;
}
</style>
