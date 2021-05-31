<template>
	<div class="wrapper admin">
		<div v-if="!active_user">
			<Login :users="users" v-on:logged="logIn"/>
		</div>
		<div v-if="isAdmin">
			<Users :users="users" v-on:save="saveUser" v-on:add="addUser"/>
		</div>		
	</div>
</template>

<script>
import db from '../components/firebaseInit'
import Login from '../components/Login.vue'
import Users from '../views/Users.vue'

export default {
	name: 'Admin',
	components: {
		'Login': Login,
		'Users': Users
	},
	data () {
		return {
			isAdmin: false,
			users: [],
			active_user: false
		}
	},
	created () {
		db.collection('users').get().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				let data = {
					'password': doc.data().password,
					'id': doc.id,
					'name': doc.data().name,
					'surname': doc.data().surname,
					'email': doc.data().email,
					'phone': doc.data().phone,
					'subs_start': doc.data().subs_start,
					'subs_end': doc.data().subs_end,
					'role': doc.data().role
				}
				this.users.push(data)
			})
		})
	},
	methods: {
		logIn(value) {
			let self = this;
			self.active_user = value;
			if(value.role == 'admin') { 
					self.isAdmin = true;
					self.$emit('logged', 'admin');
				} else 
			self.$emit('logged', 'user');
		},
		addUser(value) {
			db.collection('users').add(value);
		}
	}
}
</script>

