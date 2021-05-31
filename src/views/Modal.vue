<template>
	<div id="Editor">
		<div class="wrapper user">
			<input class="user-head input-style"
				name="name"
				ref="name"
				v-on:change="findChange"
				v-model="user.name">
			<input class="user-head input-style"
				name="surname"
				ref="surname" 
				v-on:change="findChange"
				v-model="user.surname">
			<div class="inner">
				<div class="left">
					<input 
						type="email" 
						class="input-style sub"
						name="email"
						ref="email"
						v-on:change="findChange"
						v-model="user.email">
					<input class="input-style sub" 
						v-model="user.subs_start">
				</div>
				<div class="right">
					<input 
						type="tel" 
						class="input-style sub"
						name="phone"
						ref="phone"
						v-on:change="findChange"
						v-model="user.phone">
					<input class="input-style sub" 
						v-model="user.subs_end">
				</div>
			</div>
			<div class="inner">
				<div class="left">
					<input 
						class="sub input-style"
						name="login"
						ref="login"
						v-on:change="findChange"
						v-model="user.subs_start">
				</div>
				<div class="right">
					<input
						type="number" 
						class="sub input-style" 
						name="id"
						ref="id"
						v-on:change="findChange"
						v-model="user.subs_end">
				</div>
			<div class="inner">
				<div class="left">
					<input 
						class="sub input-style"
						name="login"
						ref="login"
						v-on:change="findChange"
						v-model="user.login">
				</div>
				<div class="right">
					<input
						type="number" 
						class="sub input-style" 
						name="id"
						ref="id"
						v-on:change="findChange"
						v-model="user.id">
				</div>
			</div>
			<div class="control">
				<div class="radius-button" 
					@click="saveUser">Save</div>
				</div>
				<div class="radius-button" 
					@click="cancel">Cansel</div>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'Modal',
	props: [ 'user'	],
	data () {
		let data = {
			isNew: false,
			isChanged: null,
			isEdited: false
		}
		data = Object.assign({}, data, this.user)
		return data
	},
	watch: { 
		user: {
			deep: true,
			handler() {
				this.isChanged = true;
			}
		}
	},
	computed: function () {
		if(!this.user) {
			this.isNew == true
		} else {
			this.isNew == false
		}
	},
	methods: {
		findChange($event) {
			let self = this;
			self.isEdited = true;
			let ename = $event.name;
			let value = $event.value;
			self.isChanged = JSON.toString({[ename]: value});
		},
		saveUser () {
			let self = this;
			self.$emit('save', self.isChanged);
		},
		addUser () {
			let self = this;
			self.$emit('add', self.target)
		},
		cancel () {
			self.$emit('close');
			self.user = null;
		}
	}
}

</script>

<style scoped>

	#Editor {
		position: absolute;
		top: 45px;
		left: 0;
		background-color: #fff;
		outline: 5px solid #008B94;
	}
	.user-head {
		color: #008B94;
		font-size: 20px;
		font-weight: bold;
		margin: 0;
		height: auto;
		display: inline-block;
		width: 25%;
	}
	.sub {
		width: 90%;
	}

</style>