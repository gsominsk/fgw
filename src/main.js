// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue 			from 'vue'
import App 			from './App'
import VueRouter 	from 'vue-router'
import VueResource 	from 'vue-resource'
import Vuex 		from 'vuex'

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuex);

// vues global
const store = new Vuex.Store({
	state: {
		elements: [],
		itemToChange: null
	},
	getters: {
		getList (state) {
			return (state.elements);
		},
		getItemToChange (state) {
			return (state.itemToChange);
		}
	},
	mutations: {
		setList (state, arr) {
			var i = 0;
			for (var el of arr) {
				el.id = ++i;
				state.elements.push(el);
			}
		},
		setItemToChange: function (state, item) {
			state.itemToChange = item;
		},
		changeItem: function (state, item) {
			for (var el in state.elements)
				if (state.elements[el].id == item.id)
					state.elements[el] = item;
		},
		deleteItem: function (state) {
			for (var el in state.elements)
				if (state.elements[el].id == state.itemToChange)
					state.elements.splice(el, 1);
		}
	}
})

Vue.config.productionTip = false;

import Index 			from './components/Index'
import Item 			from './components/Item'
import Change 			from './components/Change'

Vue.component('item', Item);

const routes = [
	{ path: '/', component: Index },
	{ path: '/change', component: Change },
]

const router = new VueRouter({
	routes,
	mode: 'history'
});

/* eslint-disable no-new */
new Vue({
  	el: '#app',
  	router,
	store,
  	template: '<App/>',
  	components: { App }
});
