<template>
	<div class="wrapper login">
		<p class="comm">РАЗВИВАЮЩИЕ ИГРЫ «БЭРСФОРД»</p>
		<img class="logo" src='../assets/logo-sm.svg'>
		<p class="head">THE BEARSFORD GAMES</p>
		<br />
		<div class="form-group">
			<input class="input-style" 
				placeholder="email" 
				type="email"
				name="email"
				ref="email"
				v-model="email">
			<input class="input-style"
				placeholder="password"
				type="password"
				name="password"
				ref="password"
				v-model="password">
				
			<p class="error">{{err}}</p>

			<div class="radius-button" 
				@click="logIn">Вход
			</div>
		</div>
	</div>
</template>

<script>
//import db from './firebaseInit'
//import Admin from '../components/Admin.vue'

export default {
	name: 'Login',
	data () {
		return {
			isLogged: false,
			isAdmin: false,
			isMobile: false,
			email: null,
			password: null,
			active_user: null,
			err: ''
		}
	},
	props: [
		'users'
	],
	methods: {
		parseDate(date) {
			let dateParts = date.split("/")
			
			if(dateParts[2].length < 3) 
			dateParts[2] 
				= "20"
				+dateParts[2]

			let tDate 
				= new Date(
					dateParts[2], 
					dateParts[1]-1, 
					+dateParts[0])

			console.log(dateParts[2])

			return tDate
		},
		logIn() {
			let self = this;
			for (var i = 0; i < self.users.length; i++) {
				if (self.users[i].email == self.email) {

					if(self.users[i].password == self.password) {
						let start = self.parseDate(self.users[i].subs_start)
						let end = self.parseDate(self.users[i].subs_end)
						console.log(start,Date.now(),end)
						if (end > Date.now()
							&& start < Date.now()) {

								self.isLogged = true;
								self.active_user = self.users[i];
								self.email = '';
								self.password = '';
								if(self.users[i].role == 'admin') {
									self.isAdmin = true;
								}

						} else {
							self.err = "Проверьте подписку";
							document.querySelector(".error").style.opacity = 1;
							console.log(self.users[i].subs_start);
							break;
						}
					}
					self.$emit('logged', self.active_user);
				}
				else {
					self.err = "Неверный логин или пароль";
					document.querySelector(".error").style.opacity = 1; 
				}
			}
		}
	}
}
</script>

<style scoped>
	.login {
		font-family: Alliance;
		font-size: 21px;
		text-align: center;
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
	.error {
		font-family: 'ish-open';
		font-size: 12px;
		color: #f00;
		opacity: 0;
	}
</style>

