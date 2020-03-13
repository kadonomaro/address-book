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
	}
</style>
