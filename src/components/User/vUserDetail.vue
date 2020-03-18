<template>
	<div class="user-detail">
		{{ id }}
	</div>
</template>

<script>
export default {
	name: 'v-user-detail',
	props: {
		id: {
			type: [Number, String	],
			required: true
		}
	}
}
</script>

<style lang="scss">
	.user-detail {
		flex-grow: 1;
	}
</style>
