<template>
	<div class="wrapper admin">

		<div v-if="!active_user">

			<Login 
				:users="users"
				@logged="logIn($event)"
				/>

		</div>

		<div v-if="isAdmin">
			
				<Users 
					:users="users"
					@modal="showModal($event)"
					@delete="deleteUser($event, user.id)"
					/>

			<div v-if="isVisible">
				<Modal 
					:user="user"
					:isNew="isNew"
					@add="addUser(user)"
					@save="saveUser(user)"
					@close="hideModal"
					v-show="isVisible"
					/>
			</div>
		</div>
	</div>
</template>

<script>
import db from '../components/firebaseInit'
import Login from '../components/Login.vue'
import Users from '../views/Users.vue'
import Modal from "../views/Modal.vue"
// import moment from 'moment'

export default {
	name: 'Admin',
	components: {
		'Login': Login,
		'Users': Users,
		'Modal': Modal
	},
	data () {
		return {
			isAdmin: false,
			isVisible: false,
			isNew: false,
			users: [],
			user: '',
			active_user: false,
		}
	},
	methods: {
		getList () {
			db.collection('users').get().then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					let arr = {
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
					this.users.push(arr)
				})
			})
		},
		logIn(value) {
			let self = this;
			self.active_user = value;
			if(value.role == 'admin') { 
					self.isAdmin = true;
					self.$emit('logged', 'admin');
				} else 
			self.$emit('logged', 'user');
		},
		showModal(value) {
			let self = this;
			self.user = value;
			console.log(value.id)
			if(value.id!==null || value.id!=='undefined') {
				self.isNew = false
			}
			else { 
				self.isNew = true 
			}
			self.isVisible = true;
		},
		addUser(value) {
			db.collection('users').add(value).then(() => {
				this.users = []
				this.getList()
				this.hideModal()
			})
		},
		saveUser(value) {
			db.collection('users').doc(value.id).set(value).then(() => {
				this.users = []
				this.getList()
				this.hideModal()
				console.log('save')
			})
		},
		deleteUser(value) {
			console.log(value)
			db.collection('users').document(value).delete().then(() => {
				this.users = []
				this.getList()
			})
		},
		hideModal() {
			let self = this;
			self.user = '';
			self.isVisible = false;
		}
	},
	mounted () {
		this.getList()
	}
}
</script>

