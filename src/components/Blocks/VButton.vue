<template>
	<button
		class="v-button"
		:class="{'has-icon': hasIcon}"
		@click="onClickHandler"
	>{{ text }}
	</button>
</template>

<script>
export default {
	name: 'v-button',
	props: {
		text: {
			type: String,
			required: false
		},
		hasIcon: {
			type: Boolean,
			required: false
		}
	},
	methods: {
		onClickHandler() {
			this.$emit('on-click');
		}
	}
}
</script>

<style lang="scss">
@import '@/style/variables.scss';

	.v-button {
		padding: 7px 14px 7px 14px;
		color: $main-color;
		font-size: 14px;
		font-weight: bold;
		background-color: #ffffff;
		border: 2px solid $main-color;
		border-radius: 3px;
		cursor: pointer;
		transition: color 0.2s ease-in, background-color 0.2s ease-in;
		&:hover,
		&:focus {
			color: #ffffff;
			background-color: $main-color;
		}

	}
	.v-button.has-icon {
		position: relative;
		padding: 7px 14px 7px 40px;
		&:hover::before,
		&:focus::before {
			background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='iso-8859-1'%3F%3E%3C!--Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)--%3E%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512' fill='%23ffffff'%3E%3Cpath d='M256 0C114.833 0 0 114.833 0 256s114.833 256 256 256 256-114.853 256-256S397.167 0 256 0zm0 472.341c-119.275 0-216.341-97.046-216.341-216.341S136.725 39.659 256 39.659 472.341 136.705 472.341 256 375.295 472.341 256 472.341z'/%3E%3Cpath d='M355.148 234.386H275.83v-79.318c0-10.946-8.864-19.83-19.83-19.83s-19.83 8.884-19.83 19.83v79.318h-79.318c-10.966 0-19.83 8.884-19.83 19.83s8.864 19.83 19.83 19.83h79.318v79.318c0 10.946 8.864 19.83 19.83 19.83s19.83-8.884 19.83-19.83v-79.318h79.318c10.966 0 19.83-8.884 19.83-19.83s-8.864-19.83-19.83-19.83z'/%3E%3C/svg%3E");
		}
		&::before {
			content: '';
			position: absolute;
			left: 5px;
			top: 50%;
			width: 25px;
			height: 25px;
			background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='iso-8859-1'%3F%3E%3C!--Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)--%3E%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512' fill='%233baeda'%3E%3Cpath d='M256 0C114.833 0 0 114.833 0 256s114.833 256 256 256 256-114.853 256-256S397.167 0 256 0zm0 472.341c-119.275 0-216.341-97.046-216.341-216.341S136.725 39.659 256 39.659 472.341 136.705 472.341 256 375.295 472.341 256 472.341z'/%3E%3Cpath d='M355.148 234.386H275.83v-79.318c0-10.946-8.864-19.83-19.83-19.83s-19.83 8.884-19.83 19.83v79.318h-79.318c-10.966 0-19.83 8.884-19.83 19.83s8.864 19.83 19.83 19.83h79.318v79.318c0 10.946 8.864 19.83 19.83 19.83s19.83-8.884 19.83-19.83v-79.318h79.318c10.966 0 19.83-8.884 19.83-19.83s-8.864-19.83-19.83-19.83z'/%3E%3C/svg%3E");
			background-repeat: no-repeat;
			background-size: cover;
			transform: translateY(-50%);
			transition: background-image 0.2s;
		}
	}
</style>
