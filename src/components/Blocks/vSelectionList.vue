<template>
	<div class="selection-list">
		<select class="selection-list__select" name="selection_list" v-model="selected" @change="onSelectHandler">
			<option value="">Выберите статус</option>
			<option v-for="(item, index) in list" :value="item" :key="index">{{ item }}</option>
		</select>
	</div>
</template>

<script>
export default {
	name: 'v-selection-list',
	props: {
		list: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			selected: ''
		}
	},
	methods: {
		onSelectHandler() {
			this.$emit('on-select', this.selected);
		}
	}
}
</script>

<style lang="scss">
	@import '@/style/variables.scss';

	.selection-list {
		&__select {
			width: 100%;
			padding: 5px 8px;
			color: $text-color;
			font: inherit;
			border: 2px solid $border-color;
			border-radius: 3px;
			transition: border-color 0.2s ease;
			outline: none;
			box-sizing: border-box;
			&:focus {
				border-color: $main-color;
			}
		}

	}
</style>
