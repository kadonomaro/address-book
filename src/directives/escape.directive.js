export default {
  bind(el, binding) {
    document.addEventListener('keydown', function (evt) {
      if (event.keyCode === 27) {
        binding.value();
        if (typeof binding.value !== 'function') {
          throw new Error('Argument must be a function');
        }
      }
    });
  }
};
