<template>
	<li class="item clearfix">
		<div class="unit-descr name" v-if="item.name.length > 0 || item.aliases.length > 0">
			<span>Names: </span>
			<span v-if="item.name.length > 0">{{item.name}} </span>
			<span v-for="(alias, index) in item.aliases" v-bind:key="index"> {{alias}}</span>
		</div>
		<div class="unit-descr died">
			<span>Died: </span>
			<span v-if="item.died.length > 0">{{item.died}}</span>
			<span v-else>Still alive</span>
		</div>
		<div class="unit-descr gender" v-if="item.gender.length > 0">
			<span>Gender: </span>
			<span>{{item.gender}}</span>
		</div>
		<div class="unit-descr played-by" v-if="item.playedBy[0].length > 0">
			<span>Played by: </span>
			<span>{{item.playedBy[0]}}</span>
		</div>
		<router-link v-bind:to="'/change'">
			<div class="btn btn-save-changes" v-on:click="setItemToChange(item.id)">
				change
			</div>
		</router-link>
	</li>
</template>

<script>

	export default {
		name: 'item',
		props: ['item'],
		data () {
			return {
			}
		},
		methods: {
			setItemToChange: function (item) {
				this.$store.commit('setItemToChange', item);
			},
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
