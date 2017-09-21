<template>
  <div class="main-wrap">
	  <div class="list-wrap">
		  <ul class="list">
			  <item v-for="(item, index) in list" v-bind:item="item" v-bind:key="index"></item>
		  </ul>
	  </div>
  </div>
</template>

<script>

export default {
  	name: 'index',
  	data () {
		return {
			list: []
    	}
  	},
	methods: {
  		getAPIData: function () {
			var url = 'https://www.anapioficeandfire.com/api/characters?page=1&pageSize=20'

			this.$http.get(url).then(response => {
				this.insertIntoVuex(response.body)
			}, response => {
				console.error(response)
			});
		},
		insertIntoVuex: function (data) {
			this.$store.commit('setList', data);
			this.renderList();
		},
		renderList () {
  			for (var el of this.$store.getters.getList)
  				this.list.push(el);
		}
	},
	created () {
		var mainWrap = document.getElementsByClassName('main-wrap')[0];

		this[this.$store.getters.getList.length == 0 ? 'getAPIData' : 'renderList']();
		setTimeout(() => {
			mainWrap != 'undefined' ? document.getElementsByClassName('main-wrap')[0].setAttribute('style', 'opacity:1;') : 0;
		}, 300);
	}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
