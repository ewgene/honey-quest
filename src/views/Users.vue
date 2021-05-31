<template>
	<div class="wrapper users">
		<div class="user" 
			v-for="user in users"
			:key="user.email">
			<p class="user-head">
				{{ user.name }} {{ user.surname }}
			</p>

			<div class="inner">
				<div class="left">
					<p class="sub">
						Email: {{ user.email }}
					<p class="sub">
						Подписка от {{ user.subs_start}}
					</p>
				</div>
				<div class="right">
					<p class="sub">
						Телефон: {{ user.phone }}
					<p class="sub">
						до {{ user.subs_end }}
					</p>
				</div>
				<div class="icon-button" @click="showModal">
					<span class="sub">Изменить</span><i class="fa fa-pencil-square-o" aria-hidden="true"></i>
				</div>
			</div>
			
			<Modal 
				:user="user" 
				@:save="saveUser"
				v-show="isVisible"
				/>

		</div>
	</div>
</template>

<script>
import Modal from "./Modal.vue"
export default {
	name: 'Users',
	components: {
		'Modal': Modal
	},
	props: [
		'users',
		'isNew'
	],
	data () {
		return {
			pool: this.users,
			user: null,
			isVisible: false
		}
	},
	methods: {
		saveUser(user) {
			let self=this;
			self.$emit('save', user);
			//document.querySelector('#Editor').style.display = 'none';
		},
		addUser(user) {
			self.$emit('add', user);
		},
		showModal() {
			this.isVisible = true;
		},
		closeModal() {
			this.isVisible = false;
		}
	}
}
</script>

<style>
	.wrapper: {
		font-family: 'ish-open';
	}
	.users: {
		overflow-y: auto;
		scrollbar-width: thin;
		padding: 0 15px;
		font-family: 'ish-open';
	}
	.user {		
		margin-top: 30px;
		background-color: white;
		padding: 20px;
		box-shadow: 0 0 5px 0 rgba(0,0,0,0.05);
		height: 95px;
		font-family: 'ish-open';
	}
	.user-head {
		font-size: 20px;
		font-weight: bold;
	}
	.left {
		width: 50%;
		float: left;
		text-align: left;
	}
	.right {
		width: 50%;
		float: left;
		text-align: left;
	}
	p {
		width: 100%;
		text-align: left;
	}
	.sub {
		font-size: 15px;
	}
	.icon-button {
		text-align: right;
	}
	.icon-button .sub {
		display: inline-block;
		margin-right: 5px;
		font-size: 13px;
		color: #666;
	}
</style>

