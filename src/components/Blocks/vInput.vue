<template>
	<label class="input-label">
		<span v-if="title" class="input-title">{{ title }}</span>
		<input class="input" :type="type" v-autofocus="focus">
	</label>
</template>

<script>
export default {
	name: 'v-input',
	props: {
		title: {
			type: String,
			required: false
		},
		type: {
			type: String,
			required: false,
			default: 'text'
		},
		focus: {
			type: Boolean,
			required: false
		}
	}
}
</script>

<style lang="scss">
	@import '@/style/variables.scss';

	.input-label {
		display: block;
		padding: 0 5px;
		margin-bottom: 10px;
	}
	.input-title {
		display: block;
		margin-bottom: 2px;
		color: $text-color-light;
		font-size: 14px;
	}
	.input {
		width: 100%;
		padding: 5px 8px;
		color: $text-color;
    font-size: 16px;
		border: 2px solid $border-color;
		border-radius: 3px;
    transition: border-color 0.2s ease;
    outline: none;
		box-sizing: border-box;
		&:focus {
			border-color: $main-color;
		}
	}
</style>
