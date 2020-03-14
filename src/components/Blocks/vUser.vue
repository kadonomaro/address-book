<template>
	<div v-if="getUserInfo.id" class="user">
		<div class="user__avatar">
			<img :src="getUserInfo.avatar || avatar" :alt="getUserInfo.name">
		</div>
		<div class="user__info">
			<span class="user__name">
				<router-link class="user__link" :to="getUserInfo.id">{{ getUserInfo.name }}</router-link>
			</span>
			<span class="user__email">{{ getUserInfo.email }}</span>
		</div>
		<button class="user__logout" title="Выйти" @click="logout"></button>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import avatar from "@/assets/icons/user.png";

export default {
	name: 'v-user',
	data() {
		return {
			avatar
		}
	},
	methods: {
		logout() {
			this.$store.dispatch('logout');
		}
	},
	computed: {
		...mapGetters([
			'getUserInfo'
		])
	}
}
</script>

<style lang="scss">
	@import "@/style/variables.scss";

	.user {
		display: flex;
		align-items: center;
		&__avatar {
			width: 50px;
			height: 50px;
			margin-right: 10px;
			img {
				display: block;
				max-width: 100%;
			}
		}
		&__name,
		&__email {
			display: block;
		}
		&__name {
			margin-bottom: 5px;
		}
		&__link {
			color: #ffffff;
			text-decoration: underline;
			transition: color 0.2s ease-in;
			&:hover {
				color: $text-color-light;
			}
		}
		&__email {
			font-size: 14px;
		}
		&__info {
			margin-right: 10px;
		}
		&__logout {
			width: 25px;
			height: 25px;
			padding: 0;
			background-color: transparent;
			background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='iso-8859-1'%3F%3E%3C!--Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)--%3E%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512' fill='%23fff'%3E%3Cpath d='M255.15 468.625H63.787c-11.737 0-21.262-9.526-21.262-21.262V64.638c0-11.737 9.526-21.262 21.262-21.262H255.15c11.758 0 21.262-9.504 21.262-21.262S266.908.85 255.15.85H63.787C28.619.85 0 29.47 0 64.638v382.724c0 35.168 28.619 63.787 63.787 63.787H255.15c11.758 0 21.262-9.504 21.262-21.262 0-11.758-9.504-21.262-21.262-21.262z'/%3E%3Cpath d='M505.664 240.861L376.388 113.286c-8.335-8.25-21.815-8.143-30.065.213s-8.165 21.815.213 30.065l92.385 91.173H191.362c-11.758 0-21.262 9.504-21.262 21.262 0 11.758 9.504 21.263 21.262 21.263h247.559l-92.385 91.173c-8.377 8.25-8.441 21.709-.213 30.065a21.255 21.255 0 0015.139 6.336c5.401 0 10.801-2.041 14.926-6.124l129.276-127.575A21.303 21.303 0 00512 255.998c0-5.696-2.275-11.118-6.336-15.137z'/%3E%3C/svg%3E");
			background-repeat: no-repeat;
			background-size: cover;
			border: none;
			cursor: pointer;
		}
	}
</style>
