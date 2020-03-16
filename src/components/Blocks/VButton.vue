<template>
	<button
		class="v-button"
		:class="className"
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
		},
		icon: {
			type: String,
			required: false
		}
	},
	methods: {
		onClickHandler() {
			this.$emit('on-click');
		}
	},
	computed: {
		className() {
			let classList = [];
			this.hasIcon ? classList.push('has-icon') : false;
			this.icon ? classList.push(this.icon) : false;

			return classList;
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
		&:hover:disabled,
		&:focus:disabled {
			color: $border-color;
			background-color: #ffffff;
		}
		&:disabled {
			color: $border-color;
			border-color: $border-color;
			cursor: default;
		}
	}
	.v-button.has-icon {
		position: relative;
		padding: 7px 14px 7px 40px;
		&::before {
			content: '';
			position: absolute;
			left: 5px;
			top: 50%;
			width: 25px;
			height: 25px;
			background-repeat: no-repeat;
			background-size: cover;
			transform: translateY(-50%);
			transition: background-image 0.2s;
		}
	}
	.v-button.has-icon.plus {
		&:hover::before,
		&:focus::before {
			background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='iso-8859-1'%3F%3E%3C!--Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)--%3E%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512' fill='%23ffffff'%3E%3Cpath d='M256 0C114.833 0 0 114.833 0 256s114.833 256 256 256 256-114.853 256-256S397.167 0 256 0zm0 472.341c-119.275 0-216.341-97.046-216.341-216.341S136.725 39.659 256 39.659 472.341 136.705 472.341 256 375.295 472.341 256 472.341z'/%3E%3Cpath d='M355.148 234.386H275.83v-79.318c0-10.946-8.864-19.83-19.83-19.83s-19.83 8.884-19.83 19.83v79.318h-79.318c-10.966 0-19.83 8.884-19.83 19.83s8.864 19.83 19.83 19.83h79.318v79.318c0 10.946 8.864 19.83 19.83 19.83s19.83-8.884 19.83-19.83v-79.318h79.318c10.966 0 19.83-8.884 19.83-19.83s-8.864-19.83-19.83-19.83z'/%3E%3C/svg%3E");
		}
		&::before {
			background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='iso-8859-1'%3F%3E%3C!--Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)--%3E%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512' fill='%233baeda'%3E%3Cpath d='M256 0C114.833 0 0 114.833 0 256s114.833 256 256 256 256-114.853 256-256S397.167 0 256 0zm0 472.341c-119.275 0-216.341-97.046-216.341-216.341S136.725 39.659 256 39.659 472.341 136.705 472.341 256 375.295 472.341 256 472.341z'/%3E%3Cpath d='M355.148 234.386H275.83v-79.318c0-10.946-8.864-19.83-19.83-19.83s-19.83 8.884-19.83 19.83v79.318h-79.318c-10.966 0-19.83 8.884-19.83 19.83s8.864 19.83 19.83 19.83h79.318v79.318c0 10.946 8.864 19.83 19.83 19.83s19.83-8.884 19.83-19.83v-79.318h79.318c10.966 0 19.83-8.884 19.83-19.83s-8.864-19.83-19.83-19.83z'/%3E%3C/svg%3E");
		}
	}
	.v-button.has-icon.edit {
		&:hover::before,
		&:focus::before {
			background-image: url("data:image/svg+xml,%3Csvg viewBox='0 -1 401.523 401' fill='%23fff' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M370.59 250.973c-5.524 0-10 4.476-10 10v88.789c-.02 16.562-13.438 29.984-30 30H50c-16.563-.016-29.98-13.438-30-30V89.172c.02-16.559 13.438-29.98 30-30h88.79c5.523 0 10-4.477 10-10 0-5.52-4.477-10-10-10H50c-27.602.031-49.969 22.398-50 50v260.594c.031 27.601 22.398 49.968 50 50h280.59c27.601-.032 49.969-22.399 50-50v-88.793c0-5.524-4.477-10-10-10zm0 0'/%3E%3Cpath d='M376.629 13.441c-17.574-17.574-46.067-17.574-63.64 0L134.581 191.848a9.997 9.997 0 00-2.566 4.402l-23.461 84.7a9.997 9.997 0 0012.304 12.308l84.7-23.465a9.997 9.997 0 004.402-2.566l178.402-178.41c17.547-17.587 17.547-46.055 0-63.641zM156.37 198.348L302.383 52.332l47.09 47.09-146.016 146.016zm-9.406 18.875l37.62 37.625-52.038 14.418zM374.223 74.676L363.617 85.28l-47.094-47.094 10.61-10.605c9.762-9.762 25.59-9.762 35.351 0l11.739 11.734c9.746 9.774 9.746 25.59 0 35.36zm0 0'/%3E%3C/svg%3E");
		}
		&::before {
			background-image: url("data:image/svg+xml,%3Csvg viewBox='0 -1 401.523 401' fill='%233baeda' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M370.59 250.973c-5.524 0-10 4.476-10 10v88.789c-.02 16.562-13.438 29.984-30 30H50c-16.563-.016-29.98-13.438-30-30V89.172c.02-16.559 13.438-29.98 30-30h88.79c5.523 0 10-4.477 10-10 0-5.52-4.477-10-10-10H50c-27.602.031-49.969 22.398-50 50v260.594c.031 27.601 22.398 49.968 50 50h280.59c27.601-.032 49.969-22.399 50-50v-88.793c0-5.524-4.477-10-10-10zm0 0'/%3E%3Cpath d='M376.629 13.441c-17.574-17.574-46.067-17.574-63.64 0L134.581 191.848a9.997 9.997 0 00-2.566 4.402l-23.461 84.7a9.997 9.997 0 0012.304 12.308l84.7-23.465a9.997 9.997 0 004.402-2.566l178.402-178.41c17.547-17.587 17.547-46.055 0-63.641zM156.37 198.348L302.383 52.332l47.09 47.09-146.016 146.016zm-9.406 18.875l37.62 37.625-52.038 14.418zM374.223 74.676L363.617 85.28l-47.094-47.094 10.61-10.605c9.762-9.762 25.59-9.762 35.351 0l11.739 11.734c9.746 9.774 9.746 25.59 0 35.36zm0 0'/%3E%3C/svg%3E");
		}
	}
	.v-button.has-icon.minus {
		&:hover::before,
		&:focus::before {
			background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg' fill='%23fff'%3E%3Cpath d='m256 512c-141.164062 0-256-114.835938-256-256s114.835938-256 256-256 256 114.835938 256 256-114.835938 256-256 256zm0-480c-123.519531 0-224 100.480469-224 224s100.480469 224 224 224 224-100.480469 224-224-100.480469-224-224-224zm0 0'/%3E%3Cpath d='m368 272h-224c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h224c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0'/%3E%3C/svg%3E");
		}
		&::before {
			background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg' fill='%233baeda'%3E%3Cpath d='m256 512c-141.164062 0-256-114.835938-256-256s114.835938-256 256-256 256 114.835938 256 256-114.835938 256-256 256zm0-480c-123.519531 0-224 100.480469-224 224s100.480469 224 224 224 224-100.480469 224-224-100.480469-224-224-224zm0 0'/%3E%3Cpath d='m368 272h-224c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h224c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0'/%3E%3C/svg%3E");
		}
	}
</style>
