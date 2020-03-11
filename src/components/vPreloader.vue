<template>
	<div class="preloader" :style="{ width: width + 'px', height: height + 'px' }"></div>
</template>

<script>
export default {
	name: 'v-preloader',
	props: {
		width: {
			type: Number,
			required: false,
			default: 60
		},
		height: {
			type: Number,
			required: false,
			default: 60
		}
	}
}
</script>

<style lang="scss">
	.preloader {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-image: url('~@/assets/preloader.gif');
		background-size: cover;
		border-radius: 50%;
	}

</style>
