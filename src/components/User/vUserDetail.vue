<template>
	<div class="user-detail">
		<article class="user-card">
			<header class="user-card__header">
				<div class="user-card__avatar">
					<img :src="getUserInfo.photoUrl || avatar" :alt="getUserInfo.name">
				</div>
				<h1 class="user-card__name">{{ getUserInfo.name }}</h1>
			</header>

			<div class="user-card__info">
				<div class="card-info">
					<div class="card-info__row">
						<b>Почта: </b>
						{{ getUserInfo.email }}
					</div>
					<div class="card-info__row">
						<b>Дата создания аккаунта: </b>
						{{ getUserInfo.creationTime}}
					</div>
					<div class="card-info__row">
						<b>Дата последнего посещения: </b>
						{{ getUserInfo.lastSignInTime }}
					</div>
				</div>
			</div>

		</article>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { auth } from '@/main';
import avatar from "@/assets/icons/user.png";

export default {
	name: 'v-user-detail',
	props: {
		id: {
			type: [Number, String	],
			required: true
		}
	},
	data() {
		return {
			avatar
		}
	},
	computed: {
		...mapGetters([
			'getUserInfo',
		])
	},
}
</script>

<style lang="scss">
	@import '@/style/variables.scss';

	.user-detail {
		padding: 20px 0;
	}

	.user-card {
		&__header {
			position: relative;
			padding: 60px 10px 20px 200px;
			margin-bottom: 5px;
			color: #ffffff;
			background-color: $main-color;
		}
		&__name {
			margin: 0;
			font-size: 20px;
		}
		&__avatar {
			position: absolute;
			bottom: 0;
			left: 20px;
			width: 150px;
			height: 150px;
			padding: 5px;
			border-radius: 50%;
			background-color: $background-color;
			transform: translateY(50%);
			img {
				display: block;
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
		&__info {
			padding: 20px 10px 20px 200px;
			background-color: $border-color;
			height: 300px;
		}
	}
</style>
