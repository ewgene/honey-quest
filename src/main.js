import Vue from 'vue'
import App from './App.vue'

import VueMask from 'v-mask'
Vue.use(VueMask)

new Vue({
	render: h => h(App),
}).$mount('#app')
