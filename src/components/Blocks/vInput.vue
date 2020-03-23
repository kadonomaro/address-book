<template>
	<label class="input-label">
		<span v-if="title" class="input-title">{{ title }}</span>
		<input
			class="input"
			:class="{'input--error': !isValid}"
			:type="type"
			v-autofocus="focus"
			@change="onChangeHandler"
			@input="checkValidity"
		>
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
		},
		required: {
			type: Boolean,
			required: false
		}
	},
	data() {
		return {
			isValid: true,
		}
	},
	methods: {
		onChangeHandler(evt) {
			this.$emit('on-change',evt.target.value);
		},
		checkValidity(evt) {
			if (this.required) {
				this.isValid = evt.target.value.length;
			}
		}
	}
}
</script>

<style lang="scss">
	@import '@/style/variables.scss';
	@import '@/style/input.scss';

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
</style>
