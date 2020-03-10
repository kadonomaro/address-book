<template>
	<label class="input-label">
		<span v-if="title" class="input-title">{{ title }}</span>
		<input class="input" :type="type">
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
    padding: 7px;
    font-size: 16px;
		border: 2px solid $main-color;
		border-radius: 3px;
    transition: border-color 0.2s ease;
    outline: none;
		box-sizing: border-box;
	}
</style>
