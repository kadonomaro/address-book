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

	}
	.input-radio-title {
		// display: block;
	}

</style>
