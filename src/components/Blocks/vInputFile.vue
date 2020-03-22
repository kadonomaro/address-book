<template>
	<label class="input-file-label">
		<input
			class="input-file visually-hidden"
			type="file"
			:accept="accept"
			@change="fileSelectHandler"
		>
		<span class="input-file-custom">{{ title }}</span>
	</label>
</template>

<script>
export default {
	name: 'v-file-input',
	props: {
		title: {
			type: String,
			required: false
		},
		accept: {
			type: String,
			required: true
		}
	},
	methods: {
		fileSelectHandler(evt) {
			this.$emit('on-select', evt.target.files[0]);
		}
	}
}
</script>

<style lang="scss">
	@import '@/style/variables.scss';

	.input-file-custom {
		display: inline-block;
		width: 100%;
		padding: 5px 8px;
		color: $text-color;
		font: inherit;
		text-align: center;
		border: 2px solid $border-color;
		border-radius: 3px;
		transition: border-color 0.2s ease-in, background-color 0.2s ease-in, color 0.2s ease-in;
		user-select: none;
		cursor: pointer;
		box-sizing: border-box;
	}
	.input-file {
		&:hover ~ .input-file-custom,
		&:focus ~ .input-file-custom {
			color: #ffffff;
			border-color: $main-color;
			background-color: $main-color;
		}
	}
</style>
