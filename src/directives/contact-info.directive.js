export default {
	bind: function (el, binding, vnode) {
		let isCreated = false;
		const contactInfo = document.createElement('div');

		el.addEventListener('mouseenter', createTooltip);
		el.addEventListener('mouseleave', removeTooltip);


    var s = JSON.stringify
    // el.innerHTML =
    //   'value: '      + s(binding.value) + '<br>' +
    //   'expression: ' + s(binding.expression) + '<br>' +
    //   'argument: '   + s(binding.arg) + '<br>' +
		//   'modifiers: '  + s(binding.modifiers) + '<br>'

		function createTooltip() {
			if (!isCreated) {
				contactInfo.classList.add('contact-info');
				contactInfo.innerHTML = `
					<header class="header">
						<div class="avatar">
							<img src="https://via.placeholder.com/80" alt="${binding.value.name}">
						</div>
						<div class="data">
							<span class="name">Имя: ${binding.value.name}</span>
							<span class="sex">Пол: ${binding.value.sex === 'male' ? 'мужской' : 'женский'}</span>
							<span class="age">Возраст: ${binding.value.age}</span>
						</div>
					</header>
					<div class="info">

					</div>
					<footer class="footer">
						<button class="button call"></button>
						<button class="button send"></button>
						<button class="button open"></button>
					</footer>
				`
				// el.appendChild(contactInfo);
				vnode.elm.appendChild(contactInfo);
				isCreated = true;
				console.log(vnode);
			}
		}

		function removeTooltip() {
			if (isCreated) {
				// el.removeChild(contactInfo);
				vnode.elm.removeChild(contactInfo);
				isCreated = false;
			}
		}
	}
};



