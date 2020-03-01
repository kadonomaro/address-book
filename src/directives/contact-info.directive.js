export default {
	bind: function (el, binding, vnode) {
		const contactInfo = document.createElement('div');
		contactInfo.classList.add('contact-info');
		contactInfo.innerHTML = `
			<header class="header">
				<div class="avatar">
					<img src="https://via.placeholder.com/80" alt="">
				</div>
				<div>
					<span class="name">Имя: ${binding.value.name}</span>
					<span class="sex">Пол: ${binding.value.sex === 'male' ? 'мужской' : 'женский'}</span>
					<span class="age">Возраст: ${binding.value.age}</span>
				</div>
			</header>
			<div class="info">

			</div>
			<footer class="footer">
				<button>Перейти</button>
			</footer>

		`
		el.appendChild(contactInfo);
    var s = JSON.stringify
    // el.innerHTML =
    //   'value: '      + s(binding.value) + '<br>' +
    //   'expression: ' + s(binding.expression) + '<br>' +
    //   'argument: '   + s(binding.arg) + '<br>' +
    //   'modifiers: '  + s(binding.modifiers) + '<br>'
  }
};
