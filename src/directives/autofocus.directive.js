export default {
	inserted(el, binding) {
		if (binding.value) {
			el.focus();
			console.log(binding.value, el);
		}
  }
};
