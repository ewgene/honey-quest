<template>
	<div class="wrapper login">
		<p class="comm">РАЗВИВАЮЩИЕ ИГРЫ «БЭРСФОРД»</p>
		<img class="logo" src='../assets/logo-sm.svg'>
		<p class="head">THE BEARSFORD GAMES</p>
		<br />
		<input class="input-style" 
			placeholder="email" 
			type="text" 
			v-model="email">
		<input class="input-style"
			placeholder="password"
			type="password" 
			v-model="password">
		<div class="radius-button" @click="logIn">Sign In</div>
	</div>
</template>

<script>
import db from './firebaseInit'

export default {
	name: 'Admin',
	data () {
		return {
			users: [],
			isLogged: false,
			isAdmin: false,
			email: null,
			password: null,
			active_user: null
		}
	},
	created () {
		db.collection('users').get().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				let data = {
					'password': doc.data().password,
					'id': doc.data().id,
					'name': doc.data().name,
					'surname': doc.data().surname,
					'email': doc.data().email,
					'phone': doc.data().phone,
					'sub_start': doc.data().sub_start,
					'sub_end': doc.data().sub_end,
					'role': doc.data().role
				}
				this.users.push(data)
			})
		})
	},
	methods: {
		logIn() {
			let self = this;
			for (var i = 0; i < self.users.length; i++) {
				if (self.users[i].email == self.email) {
					if(self.users[i].password == self.password) {
						self.isLogged = true;
						self.active_user = self.users[i];
						self.email = '';
						self.password = '';
						if(self.users[i].role=='admin') {
							self.isAdmin = true;
						}
						self.$emit('logged', 'true');
					}
				}
			}
		}
	}
}
</script>

