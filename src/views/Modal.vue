<template>
	<div id="Editor">

		<div class="wrapper user">

			<input class="user-head input-style"
				data-key="name"
				placeholder="Имя"
				v-on:change="findChange"
				v-model="user.name">
			<input class="user-head input-style"
				data-key="surname"
				placeholder="Фамилия" 
				v-on:change="findChange"
				v-model="user.surname">

			<div class="clear"></div>

			<div class="inner">
				<div class="left">
					<input 
						type="email" 
						class="input-style sub"
						data-key="email"
						placeholder="Почта"
						v-on:change="findChange"
						v-model="user.email">
				</div>
				<div class="right">
					<input 
						type="number" 
						class="input-style sub"
						data-key="phone"
						placeholder="Телефон"
						v-on:change="findChange"
						v-model="user.phone">
				</div>
			</div>

			<div class="clear"></div>

			<div class="inner">
				<div class="left">
					<input
						class="sub input-style date"
						type="number"
						data-key="sub_start"
						placeholder="dd/mm/yy"
						v-on:keypress="valDate($event)"
						v-model="user.subs_start">
				</div>
				<div class="right">
					<input
						class="sub input-style date"
						type="number"
						data-key="subs_end"
						placeholder="dd/mm/yy"
						v-on:keypress="valDate($event)"
						v-model="user.subs_end">
				</div>
			</div>

			<div class="clear"></div>

			<div class="inner">
				<div class="left">
					<input 
						class="sub input-style"
						data-key="role"
						placeholder="Роль"
						v-on:change="findChange"
						v-model="user.role">
				</div>
				<div class="right">
					<input
						class="sub input-style" 
						data-key="password"
						placeholder="Пароль"
						v-on:change="findChange"
						v-model="user.password">
				</div>
			</div>

			<div class="clear"></div>

			<div class="control">
				<div class="radius-button" 
					@click="isNew ? addUser() : saveUser()">Сохранить</div>
				</div>
				<div class="radius-button" 
					@click="cancel">Отмена</div>
			</div>

		</div>

</template>

<script>

export default {
	name: 'Modal',
	props: [ 'user' ],
	data () {
		return {
			isChanged: false,
			isEdited: {},
			isNew: false
		}
	},
	watch: { 
		user: {
			deep: true,
			handler() {
				this.isChanged = true;
			}
		}
	},	
	/*	computed: function () {
		if(!this.user) {
			this.isNew == true
		} else {
			this.isNew == false
		}
	},*/
	methods: {
		findChange($event) {
			let dump = {};
			let target = $event.currentTarget
			let ename = target.getAttribute('data-key');
			let value = target.value
			dump[ename] = value
		},
		valDate(evt) {
			let target = evt.currentTarget
			console.log(evt.which)
			var charCode = evt.which
			if(charCode < 47 || charCode > 57) {
				console.log(charCode < 47 || charCode > 57)
				evt.preventDefault()
			} else {
				return true
			}
			let len = target.value.length
			/* if(len !== 1 || len !== 3) {
				if(charCode == 47) {
					return false
				}
			}*/
			if(len === 2) {
				target.value += '/'
				console.log('2')
			}
			if(len === 5) {
				target.value += '/'
				console.log('5')
			}
			console.log(len)
		},
		saveUser() {
			let self = this;
			self.$emit('save', self.user)
			console.log('save')
		},
		addUser() {
			let self = this;
			self.$emit('add', self.user)
			console.log('add')
		},
		deleteUser() {
			this.$emit('delete', this.user.id)
		},
		cancel() {
			self.user = null
			self.isNew = false
			this.$emit('close')
		}
	},
created () {
		this.user.id == undefined ? this.isNew = true : this.isNew = false
		console.log(this.user.id)
	}
}


</script>

<style scoped>

	#Editor {
		position: absolute;
		width: 100%;
		top: 40px;
		left: -5px;
		background-color: #fff;
		border: 5px solid #008B94;
		border-radius: 30px;
	}
	.user {
		background: transparent;
		height: max-content;
		margin-top: 20px;
	}
	.user-head {
		color: #008B94;
		background: transparent;
		font-size: 20px;
		font-weight: bold;
		margin: 0;
		height: auto;
		display: inline-block;
		width: 25%;
	}
	.sub {
		width: 90%;
	}
	.clear {
		width: 100%;
		height: 1px;
		background: transparent;
	}
	.left, .right {
		float: none;
		display: inline-block;
		text-align: left;
	}
	.inner input {
		display: inline-block;
	}

</style>
