import Vue from 'vue'
import Router from 'vue-router'
//import Admin from '@/layouts/Admin'
import Login from "@/components/Login"
// import ViewContact from '@/components/ViewContact'
// import NewContact from '@/components/NewContact'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Login',
			component: Login
		}
/*		{
			path: '/add',
			name: 'new-user',
			component: NewUser
		},
		{
			path: '/:person/:success?',
			name: 'view-user',
			component: ViewUser
		}*/
	]
})