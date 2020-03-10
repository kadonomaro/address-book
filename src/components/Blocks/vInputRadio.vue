<template>
		<label class="input-label">
			<span v-if="title" class="input-title">{{ title }}</span>
			<label v-for="(val, index) in value" :key="index" class="input-radio-label">
				<input
					class="input-radio"
					type="radio"
					:name="name"
					:value="val"
				>
				<span class="input-radio-custom"></span>
				<span class="input-radio-title">{{ val }}</span>
			</label>
	</label>
</template>

<script>
export default {
	name: 'v-input-radio',
	props: {
		title: {
			type: String,
			required: false
		},
		name: {
			type: String,
			required: true
		},
		value: {
			type: Array,
			required: true
		}
	}
}
</script>

<style lang="scss">
	@import '@/style/variables.scss';

	.input-radio-label {
		display: inline-flex;
		align-items: center;
		margin-bottom: 5px;
		margin-right: 5px;
		cursor: pointer;
	}
	.input-radio-title {
		font-size: 14px;
		color: $text-color-light;
	}
	.input-radio {
		position: absolute !important;
		clip: rect(1px 1px 1px 1px);
		clip: rect(1px, 1px, 1px, 1px);
		padding:0 !important;
		border:0 !important;
		height: 1px !important;
		width: 1px !important;
		overflow: hidden;
		&:checked ~ .input-radio-custom::before {
			opacity: 1;
		}
	}
	.input-radio-custom {
		position: relative;
		display: block;
		width: 18px;
		height: 18px;
		margin-right: 5px;
		border-radius: 50%;
		border: 2px solid $main-color;
		&::before {
			content: '';
			position: absolute;
			top: 50%;
			left: 50%;
			width: 12px;
			height: 12px;
			background-color: $main-color;
			transform: translate(-50%, -50%);
			border-radius: inherit;
			opacity: 0;
			transition: opacity 0.1s ease-in;
		}
	}

</style>
