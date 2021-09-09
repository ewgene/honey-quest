<template>
	<div class="flipSound" @click="play()">
		<vue-flip active-click="" width="51px" height="64px">
			<template v-slot:front>
			</template>
			<template v-slot:back v-if="active==true">
				<span class="pot full"></span>
			</template>
			<template v-slot:back v-else>
				<span class="pot empty"></span>
			</template>
		</vue-flip>
	</div>
</template>

<script>

import VueFlip from 'vue-flip';
import flipSound from '../assets/flip.wav';
import flipSoundA from '../assets/flip_active.wav';

export default {
	
	name: 'Card',
	components: {
		'vue-flip': VueFlip
	},
	props: ["active"],
	data: function() {
		return {
			flipSound: flipSound,
			flipSoundA: flipSoundA
		}
	},
  methods: {
		play() {
			let s
			if(this.active === true) {
				s = this.flipSoundA 
			}else { 
				s = this.flipSound
			}
			console.log(s)
			console.log(this.active)
			var audio = new Audio(s)
			audio.play()
		}
  },
	/*created: {
		play
	}*/

}
</script>

<style>
	.flipper > * {
		background: url('../assets/back.png');
		background-size: cover;
		width: 100%;
		height: 100%;
		cursor: pointer;
	}
	.pot {
		display: block;
		width: 33px;
		height: 40px;
		margin: 14px auto;
		background-size: contain;
	}
	.empty {
		background: url('../assets/pot-empty.png');
	}
	.full {
		background: url('../assets/pot-full.png');
	}

</style>
