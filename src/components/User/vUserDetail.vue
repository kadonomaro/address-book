<template>
	<div class="user-detail">
		<article class="user-card">
			<header class="user-card__header">
				<div class="user-card__avatar">
					<img :src="getUserInfo.photoURL || avatar" :alt="getUserInfo.name">
				</div>
				<h1 class="user-card__name">{{ getUserInfo.name }}</h1>
				<button class="user-card__button" @click="isModalVisible = true" title="Настроки профиля"></button>
			</header>

			<div class="user-card__info">
				<div class="card-info">
					<div class="card-info__row">
						<b>Почта: </b>
						{{ getUserInfo.email }}
					</div>
					<div class="card-info__row">
						<b>Дата создания аккаунта: </b>
						{{ getUserInfo.creationTime | date}}
					</div>
					<div class="card-info__row">
						<b>Дата последнего посещения: </b>
						{{ getUserInfo.lastSignInTime | date}}
					</div>
				</div>
			</div>

		</article>


		<v-modal
      v-if="isModalVisible"
      @close="isModalVisible = false"
    >
      <template v-slot:header>
        <span>Настройки профиля</span>
      </template>
      <template v-slot:body>
        <v-user-settings @on-update="updateUserProfile" />
      </template>
			<template v-slot:footer>
        <v-button :text="'ОК'" @on-click="updateUserProfile"/>
      </template>
    </v-modal>

	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { auth } from '@/main';
import avatar from "@/assets/icons/user.png";
import vButton from '@/components/Blocks/vButton.vue';
import vModal from '@/components/Blocks/vModal.vue';
import vUserSettings from '@/components/User/vUserSettings.vue';

export default {
	name: 'v-user-detail',
	components: {
		vButton,
		vModal,
		vUserSettings
	},
	props: {
		id: {
			type: [Number, String	],
			required: true
		}
	},
	data() {
		return {
			avatar,
			isModalVisible: false,
		}
	},
	methods: {
		updateUserProfile(payload) {
			this.$store.dispatch('updateUserProfile', payload);
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
			overflow: hidden;
			img {
				display: block;
				max-width: 100%;
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
		&__button {
			position: absolute;
			top: 10px;
			right: 10px;
			width: 30px;
			height: 30px;
			padding: 0;
			background-color: transparent;
			background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0)' fill='%23fff'%3E%3Cpath d='M15.941 30H14.06a2.765 2.765 0 01-2.762-2.762v-.637a12.109 12.109 0 01-1.88-.78l-.452.451a2.762 2.762 0 01-3.906 0L3.728 24.94a2.762 2.762 0 010-3.906l.451-.451a12.114 12.114 0 01-.78-1.88h-.637A2.765 2.765 0 010 15.94V14.06a2.765 2.765 0 012.762-2.762h.637c.207-.648.468-1.277.78-1.88l-.451-.452a2.762 2.762 0 010-3.906L5.06 3.728a2.761 2.761 0 013.906 0l.451.451a12.125 12.125 0 011.88-.78v-.637A2.765 2.765 0 0114.06 0h1.882a2.765 2.765 0 012.762 2.762v.637c.648.207 1.277.468 1.88.78l.452-.451a2.762 2.762 0 013.906 0l1.331 1.331a2.762 2.762 0 010 3.906l-.451.451c.312.604.573 1.233.78 1.88h.637A2.765 2.765 0 0130 14.06v1.882a2.765 2.765 0 01-2.762 2.762h-.637a12.116 12.116 0 01-.78 1.88l.451.452a2.762 2.762 0 010 3.906l-1.331 1.331a2.761 2.761 0 01-3.906 0l-.451-.451a12.12 12.12 0 01-1.88.78v.637A2.765 2.765 0 0115.94 30zM9.71 23.975c.84.496 1.743.871 2.685 1.115.389.1.66.45.66.85v1.298c0 .554.45 1.004 1.004 1.004h1.882c.554 0 1.004-.45 1.004-1.004v-1.297c0-.401.271-.751.66-.851a10.362 10.362 0 002.685-1.115.879.879 0 011.069.135l.92.92a1.004 1.004 0 001.419 0l1.331-1.332a1.004 1.004 0 000-1.42l-.919-.92a.879.879 0 01-.135-1.068c.496-.84.871-1.743 1.115-2.685.1-.389.45-.66.85-.66h1.298c.554 0 1.004-.45 1.004-1.004V14.06c0-.554-.45-1.004-1.004-1.004h-1.297c-.401 0-.751-.271-.851-.66a10.36 10.36 0 00-1.115-2.685.879.879 0 01.135-1.069l.92-.92a1.004 1.004 0 000-1.418L23.698 4.97a1.004 1.004 0 00-1.42 0l-.919.92a.879.879 0 01-1.069.134 10.36 10.36 0 00-2.685-1.114.879.879 0 01-.66-.851V2.762c0-.554-.45-1.004-1.004-1.004H14.06c-.554 0-1.004.45-1.004 1.004v1.297c0 .401-.271.751-.66.851A10.36 10.36 0 009.71 6.025a.879.879 0 01-1.069-.135l-.92-.92a1.004 1.004 0 00-1.418 0L4.97 6.302a1.004 1.004 0 000 1.42l.92.92c.283.283.338.723.134 1.068-.496.84-.871 1.743-1.114 2.685-.1.389-.45.66-.852.66H2.762c-.554 0-1.004.45-1.004 1.004v1.882c0 .554.45 1.004 1.004 1.004h1.297c.401 0 .751.271.851.66.244.942.619 1.846 1.115 2.685a.879.879 0 01-.135 1.069l-.92.92a1.004 1.004 0 000 1.419l1.332 1.331a1.004 1.004 0 001.42 0l.919-.92c.21-.208.644-.386 1.069-.134z'/%3E%3Cpath d='M15 21.527A6.535 6.535 0 018.473 15c0-3.6 2.928-6.527 6.527-6.527 3.6 0 6.527 2.928 6.527 6.527 0 3.6-2.928 6.527-6.527 6.527zm0-11.297c-2.63 0-4.77 2.14-4.77 4.77 0 2.63 2.14 4.77 4.77 4.77 2.63 0 4.77-2.14 4.77-4.77 0-2.63-2.14-4.77-4.77-4.77z'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0'%3E%3Cpath fill='%23fff' d='M0 0h30v30H0z'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E");
			background-size: cover;
			border: none;
			cursor: pointer;
		}
	}
</style>
