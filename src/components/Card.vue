<template>
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
</template>

<script>

import VueFlip from 'vue-flip';

export default {
	
	name: 'Card',
	components: {
		'vue-flip': VueFlip
	},
	props: ["active"]
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
