<template>
  <div class="smart-filter">
    <form class="smart-filter__form">
      <label class="smart-filter__label">
        <input
					type="text"
					class="smart-filter__field"
					placeholder="Поиск"
					v-model.trim="value"
				/>
      </label>
      <button
				class="smart-filter__button"
				aria-label="close"
				v-if="value"
				@click.prevent="clear"
			></button>
    </form>
  </div>
</template>

<script>
export default {
  name: "SmartFilter",
  props: {
    inputData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      value: ""
    };
	},
 	mounted() {
		this.$emit('filter', this.filteredData);
	},
  methods: {
		clear() {
			this.value = '';
		}
  },
  computed: {
    filteredData() {
      return this.inputData.filter(val => {
        return (
          val.name.toLowerCase().includes(this.value.toLowerCase()) ||
          val.phone.toString().includes(this.value) ||
					val.email.toLowerCase().includes(this.value.toLowerCase()) ||
					val.location.toLowerCase().includes(this.value.toLowerCase())
        );
      });
    }
	},
	watch: {
		filteredData(val) {
			this.$emit('filter', val);
		}
	}
};
</script>

<style lang="scss">
@import '@/style/variables.scss';
.smart-filter {
  position: relative;
  max-width: 400px;
  &__label {
    position: relative;
  }
  &__field {
    width: 100%;
    padding: 7px 25px 7px 7px;
    font-size: 14px;
		border: 2px solid $main-color;
		border-radius: 3px;
    transition: border-color 0.2s ease;
    outline: none;
    box-sizing: border-box;
    &:hover,
    &:focus {
			border-color: #4e4e4e;
			border-color: darken($color: $main-color, $amount: 20%);
    }
  }
  &__button {
    position: absolute;
    top: 50%;
    right: 5px;
    width: 25px;
    height: 25px;
    padding: 0;
    background-color: transparent;
    background-image: url("~@/assets/icons/close.svg");
    background-position: center;
    background-size: 13px;
    background-repeat: no-repeat;
    border: none;
    transform: translate(0, -50%);
    transition: opacity 0.2s ease-in;
    opacity: 0.5;
    cursor: pointer;
    outline: none;
    &:hover,
    &:focus {
      opacity: 1;
    }
  }
}
</style>
