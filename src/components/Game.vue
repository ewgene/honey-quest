<template>
	<div class="wrapper board">
		<div id="game" 
				:style="{ transform: 'scale('+this.gameScale+')' }">
			<div v-for="pot in pots_selected"
				v-bind:key="pot.id"
				:style="{position: 'absolute', top:pot.y, left:pot.x}" 
				class="card">
				<Card v-bind:active="pot.full" />
			</div>
		</div>		
		<div class="icon-button restart" @click="restartGame">
			<i class="fa fa-refresh" aria-hidden="true"></i>
			<span class="sub">Перезапуск</span>
		</div>
		<div class="icon-button exit" @click="logOut">
			<i class="fa fa-sign-out" aria-hidden="true"></i>
			<span class="sub">Выйти</span>
		</div>
	</div>
</template>

<script>
import Card from './Card.vue'
import pots from '../scripts/matrix.json'

export default {
	props: [
		'restartKey'
	],
	data() {
		return {
			isMobile: false,
			isLandscape: false,
			pots: pots,
			pots_selected: [],
			pot_active: null,
			fullScreen: false,
			gameScale: null,
			scrHeight: screen.height,
			winHeight: window.innerHeight,
		}
	},
	components: {
		"Card": Card
	},
	created () {
		this.buildGame()
	},
	methods: {
		select_pots() {
			
			var arr = []

			for (let i = 0; i <= 20; i++) {
				arr.push(i)
			}
			console.log(arr)

			var result = []

			for (let i = 0; i <= 10; i++) {
				const random = Math.floor(Math.random() * (21- i))
				console.log(result.includes(arr[random]))

				if(!result.includes(arr[random])) {
					result.push(arr[random])
				} else {
					i--
					continue
				}
				arr[random] = arr[11 - i]

			}
			console.log(result)
			for (let j = 0; j < result.length; j++) {
				let p = result[j]
				this.pots_selected.push(this.pots[p])
				console.log(p)
			}
		},
		select_active() {
			var size = 10
			this.pot_active = Math.floor(Math.random()*size);
			this.pots_selected[this.pot_active].full = true
		},
		logOut() {
			window.location.reload()
		},
		buildGame() {
			this.select_pots()
			this.select_active()
		},
		restartGame() {
			this.pots_selected = []
			this.pot_active = null
			this.$emit("restart")
		}
	},
	mounted: function () {
		this.gameScale = (window.innerHeight/8.64)/100
		this.isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent)
		this.isLandscape = window.screen.orientation.type=="landscape-primary"
		if(this.isMobile === true && this.isLandscape)
			document.querySelector("#game").style.left = "-30%"
		console.log(this.isLandscape)
	}
}
</script>

<style>
#game {
	width: 1200px;
	height: 864px;
	background-image: url("../assets/bg.png");
	background-size: 100%;
	background-repeat: no-repeat;
	position: relative;
	transform-origin: 50% 0;
	display: inline-block;
}
.board {
	position: relative;
	text-align: center;
}
.board > .icon-button {
	position: absolute;
	top: 40px;
	width: 100px;
	font-family: ish-open;
	font-size: 32px;
	text-align: center;
	color: #008B94;
}
.board > .icon-button.exit {
	left: 10px;
}
.board > .icon-button.restart {
	right: 10px;
}
.board > .icon-button .sub {
	color: #008B94;
	position: absolute;
	left: -5px;
	bottom: -15px;
	width: 100%;
}
.card {
	position: absolute;
}
</style>