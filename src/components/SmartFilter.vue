<template>
  <div class="smart-filter">
    <form class="smart-filter__form">
      <label class="smart-filter__label">
        <input
          type="text"
          class="smart-filter__field"
          placeholder="Поиск"
        >
      </label>
      <button class="smart-filter__button" aria-label="close"></button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SmartFilter'
}
</script>

<style lang="scss">
  .smart-filter {
    position: relative;
    max-width: 900px;
    margin: 0 auto;
    padding: 15px 10px;
    &__label {
      position: relative;
    }
    &__field {
      width: 100%;
      padding: 7px 30px 7px 7px;
      font-size: 16px;
      border: 2px solid #cfcfcf;
      box-sizing: border-box;
      transition: border-color 0.2s ease;
      outline: none;
      &:hover,
      &:focus {
        border-color: #4e4e4e;
      }
    }
    &__button {
      position: absolute;
      top: 50%;
      right: 15px;
      width: 25px;
      height: 25px;
      padding: 0;
      background-color: transparent;
      background-image: url('~@/assets/icons/close.svg');
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
