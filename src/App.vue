<template>
<div class="app">
	<transition name="slide-fade">
		<div
			v-if="isLogged&&!isAdmin">

			<Game 
				:isMobile="isMobile"
				:key="restartKey" 
				@restart="restartGame"/>

		</div>
	</transition>
	<div id="Admin" 
		:style="{position: 'absolute', left:adminPos+'px'}"
		v-if="!isLogged||isAdmin">
		
		<Admin :isMobile="isMobile" v-on:logged="loginCheck" />

	</div>
</div>
</template>

<script>
//import router from './router'

import Admin from './layouts/Admin.vue';
import Game from './components/Game.vue'

export default {
	data() {
		return {
/*			pots: pots,
			pots_selected: [], */
			isLogged: false,
			isAdmin: false,
			isMobile: false,
			isLandscape: false,
			fullScreen: false,
			adminPos: null,
			adminWidth: null,
			restartKey: 0
		}
	},
	components: {
		'Game': Game,
		'Admin': Admin
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
		loginCheck(value) {
			let self = this;
			if(value=="admin") { 
				self.isAdmin = true;
				self.isLogged = false;
			} 
			if(value=="user") {
				self.isAdmin= false;
				self.isLogged = true;
			}
		},
		restartGame() {
			this.restartKey += 1
		}
	},
	mounted: function () {
		this.isMobile 
			= /Android|webOS|iPhone|iPad|iPod/i
			.test(navigator.userAgent)

		this.isLandscape 
			= window.screen.orientation.type=="landscape-primary"


		if(this.isMobile === true) {

			console.log(this.isMobile)

			this.adminWidth = "100%"
			this.adminPos = 0

			let inPut = document.querySelectorAll('input')
			inPut.forEach(element => {
				element.style.width = "95%"
			})
			document.querySelector('.radius-button')
				.style.width = "95%"
				
			console.log(document.querySelectorAll('input'))

		} else {

			this.adminWidth 
			= document
				.querySelector("#Admin")
				.getBoundingClientRect()
				.width
				
			this.adminPos = 
			document
			.querySelector(".app")
				.getBoundingClientRect().width/2
				- document.querySelector("#Admin")
				.getBoundingClientRect().width/2
		}

		document.querySelector("#Admin")
			.style.height = window.innerHeight+'px'

		if(this.isMobile === true) { 
			document
			.querySelector("#Admin")
			.style
			.width = "100%"
			
			document
			.querySelector("#Admin")
			.style
			.left = "0"
		}
	}
}
</script>

<style>
.app {
	text-align: center;
}
#game {
	width: 1200px;
	height: 864px;
	background-image: url("./assets/bg.png");
	background-size: 100%;
	background-repeat: no-repeat;
	position: relative;
	transform-origin: 50% 0;
	display: inline-block;
}
#Admin {
	max-width: 600px;
	display: block;
	padding-top: 45px;
	background: #ccc;
	position: absolute;
	top: 0;
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
.card {
	position: absolute;
}
</style>
