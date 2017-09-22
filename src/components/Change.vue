<template>
	<div class="change-wrap">
		<form name="changeItemForm" v-on:submit.prevent="changeItem" class="change-item-form clearfix">
			<div class="success">Information changed!</div>
			<div class="add-delete-name">
				<div class="unit-names">
					<span v-for="(name, index) in hero.aliases" v-bind:key="index" v-on:click="deleteName(name)">{{name}}</span>
				</div>
				<span>Add new alias:</span>
				<input type="text" name="addNewName" placeholder="Input new alias" v-on:keydown.enter.prevent='setName'>
				<i class="fa fa-plus" aria-hidden="true" v-on:click="setName()"></i>
			</div>
			<div class="change-true-name">
				<span>Change name:</span>
				<input type="text" name="changeName" placeholder="Input new name" v-model="hero.name">
			</div>
			<div class="unit-death-wrap">
				<span>Hero death :</span>
				<input type="text" name="unitDeath" v-model="hero.died" placeholder="Input time of death">
			</div>
			<div class="change-gender-wrap">
				<div>Hero gender : </div>
				<span class="check-woman" v-on:click="setGender('female')">
					<label for="woman">woman : </label>
					<input type="radio" id="female" name="gender">
				</span>
				<span class="check-man" v-on:click="setGender('male')">
					<label for="man">man : </label>
					<input type="radio" id="male" name="gender">
				</span>
			</div>
			<div class="change-played-by">
				<span>Played by:</span>
				<input type="text" name="playedBy" v-model="hero.playedBy[0]" placeholder="Input actor name">
			</div>
			<router-link v-bind:to="'/'">
				<div class="btn btn-back-to-index">
					back
				</div>
			</router-link>
			<button class="btn btn-save-changes">save</button>
			<router-link v-bind:to="'/'">
				<button class="btn btn-delete-item" v-on:click="deleteElement">delete</button>
			</router-link>
		</form>
	</div>
</template>

<script>
	export default {
		name: 'change',
		data () {
			return {
				hero: {
					aliases: [],
					died: '',
					playedBy: [],
					gender: ''
				}
			}
		},
		methods: {
			changeItem: function () {
				var msg = document.getElementsByClassName('success')[0];

				this.$store.commit('changeItem', this.hero);
				msg.classList.add("show");
				document.changeItemForm.reset()
				setTimeout(() => {
					msg.classList.remove("show");
				}, 3000)
			},
			getItemData: function () {
				for (var el of this.$store.getters.getList)
					if (el.id == this.$store.getters.getItemToChange) {
						this.hero = JSON.parse(JSON.stringify(el));
						break ;
					}
				document.getElementById(this.hero.gender.toLowerCase()).checked = true;
			},
			deleteName: function (name) {
				for (var i in this.hero.aliases)
					if (this.hero.aliases[i] == name) {
						this.hero.aliases.splice(i, 1);
						break ;
					}
			},
			setName: function () {
				var name = document.querySelectorAll('input[name=addNewName]')[0].value;
				if (name.trim().length == 0) return ;
				this.hero.aliases.push(name);
			},
			setGender (gender) {
				this.hero.gender = gender;
			},
			deleteElement () {
				this.$store.commit('deleteItem');
			}
		},
		mounted () {
			var changeWrap = document.getElementsByClassName('change-wrap')[0];

			this.$store.getters.getList.length ? this.getItemData() : this.$router.push('/');
			setTimeout(() => {
				changeWrap != 'undefined' ? changeWrap.setAttribute('style', 'opacity:1;') : 0;
			}, 300);
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
