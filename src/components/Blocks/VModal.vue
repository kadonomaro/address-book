<template>
  <transition name="modal-fade">
    <div class="modal-overlay" @click.self="close" v-escape="close">

      <div class="modal">
        <header class="modal__header">
          <slot name="header"></slot>
          <button class="modal__button modal__button--close" @click="close" aria-label="Close modal"></button>
        </header>

        <div class="modal__body">
          <slot name="body"></slot>
        </div>

        <footer class="modal__footer">
          <slot name="footer"></slot>
        </footer>
      </div>

    </div>
  </transition>
</template>

<script>
import vButton from '@/components/blocks/vButton.vue';

export default {
  name: 'v-modal',
  components: {
    vButton
  },
  methods: {
    close() {
      this.$emit('close');
    }
  },
};
</script>

<style lang="scss">
	@import '@/style/variables.scss';

  .modal-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba($color: #fff, $alpha: 0.7);
  }

  .modal {
		position: relative;
		z-index: 999;
    min-width: 300px;
    max-width: 600px;
		background: #ffffff;
		border-radius: 3px;
		overflow-x: auto;
		box-shadow: 0 3px 15px rgba($color: #000000, $alpha: 0.2);
    &__header,
    &__footer {
      display: flex;
      padding: 10px 10px;
    }
    &__header {
			position: relative;
			padding-right: 45px;
      justify-content: space-between;
      color: #ffffff;
      font-size: 18px;
      background-color: $main-color;
    }
    &__body {
      position: relative;
      padding: 10px 10px;
      font-size: 16px;
    }
    &__footer {
			justify-content: flex-end;
			align-items: center;
      border-top: 1px solid $border-color;
    }
    &__button {
      padding: 0;
      background-color: transparent;
      border: none;
      cursor: pointer;
    }
    &__button--close {
      position: absolute;
      top: 50%;
      right: 10px;
      width: 30px;
      height: 30px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 47.971 47.971'%3E%3Cpath fill='%23ffffff' d='M28.228 23.986L47.092 5.122a2.998 2.998 0 0 0 0-4.242 2.998 2.998 0 0 0-4.242 0L23.986 19.744 5.121.88a2.998 2.998 0 0 0-4.242 0 2.998 2.998 0 0 0 0 4.242l18.865 18.864L.879 42.85a2.998 2.998 0 1 0 4.242 4.241l18.865-18.864L42.85 47.091c.586.586 1.354.879 2.121.879s1.535-.293 2.121-.879a2.998 2.998 0 0 0 0-4.242L28.228 23.986z'/%3E%3C/svg%3E");
      background-size: 70%;
      background-repeat: no-repeat;
      background-position: center;
			border: 2px solid #ffffff;
			border-radius: 3px;
			transform: translateY(-50%);
			transition: background-color 0.2s ease-in, background-image 0.2s ease-in;
			&:hover,
			&:focus {
				background-color: #ffffff;
				background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 47.971 47.971'%3E%3Cpath fill='%233baeda' d='M28.228 23.986L47.092 5.122a2.998 2.998 0 0 0 0-4.242 2.998 2.998 0 0 0-4.242 0L23.986 19.744 5.121.88a2.998 2.998 0 0 0-4.242 0 2.998 2.998 0 0 0 0 4.242l18.865 18.864L.879 42.85a2.998 2.998 0 1 0 4.242 4.241l18.865-18.864L42.85 47.091c.586.586 1.354.879 2.121.879s1.535-.293 2.121-.879a2.998 2.998 0 0 0 0-4.242L28.228 23.986z'/%3E%3C/svg%3E");
			}
		}
		&__button--ok {
			margin-left: 10px;
		}
  }


  .modal-fade-enter,
  .modal-fade-leave-active {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity 0.3s ease
  }
</style>
