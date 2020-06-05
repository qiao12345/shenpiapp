import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userName: ""
	},
	mutations: {
		login(state, userName) {
			state.userName = userName;
		},
	}
})

export default store
