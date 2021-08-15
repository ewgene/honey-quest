<template>
	<div class="wrapper users">

		<h1>КЛИЕНТЫ</h1>
		<div class="icon-button" :isNew="true" @click="addUser">
			<i class="fa fa-user-plus" aria-hidden="true"></i>
			<span class="sub">Новый клиент</span>
		</div>
		<div class="users-list">
			<div class="user" 
				v-for="user in users"
				:key="user.id">
					<div class="icon-button"
						:isNew="false" 
						@click="deleteUser($event, user.id)">
						<span class="sub">Удалить</span>
						<i class="fa fa-trash" 
						aria-hidden="true"></i>
					</div>

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
					<div class="icon-button"
						:isNew="false" 
						@click="showModal(user)">
						<span class="sub">Изменить</span>
						<i class="fa fa-pencil-square-o" 
						aria-hidden="true"></i>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Users',
	props: [
		'users'
	],
	data () {
		return {
			user: null,
			isNew: false
		}
	},
	methods: {
		showModal(user) {
			let self = this;
			self.user = user;
			self.$emit('modal', self.user);
		},
		addUser() {
			let newUser = {
				'password': '',
				'name': '',
				'surname': '',
				'email': '',
				'phone': '',
				'subs_start': '',
				'subs_end': '',
				'role': ''
			}
			this.isNew = true
			this.$emit('modal', newUser)
		},
		editUser (event, user) {
			this.$emit('save', user);
		},
		deleteUser(event, id) {
			console.log(id);
			this.$emit('delete', id);
		}
	}
}
</script>

<style>
.users-list {
	overflow-y: scroll;
	scrollbar-width: thin;
	padding: 0 15px 135px;
	margin-top: 30px;
	font-family: 'ish-open';
	height: 400px;
}
.users > .icon-button {
	position: absolute;
	top: 40px;
	right: 10px;
	width: 100px;
	font-family: ish-open;
	font-size: 32px;
	text-align: center;
	color: #008B94;
}
.users > .icon-button .sub {
	color: #008B94;
	position: absolute;
	left: 0;
	bottom: -15px;
}
.user {		
	margin-top: 30px;
	background-color: white;
	padding: 20px;
	box-shadow: 0 0 5px 0 rgba(0,0,0,0.05);
	height: 95px;
	font-family: 'ish-open';
}
.user > icon-button {
	margin-top: -10px;
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
	width: 90px;
	float: right;
	margin-top: -7px;
	text-align: right;
	cursor: pointer;
}
.icon-button .sub {
	display: inline-block;
	margin-right: 5px;
	font-size: 13px;
	color: #666;
	cursor: pointer;
}
</style>

