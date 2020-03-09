import userDefaultAvatar from '@/assets/icons/user.png';

export default {
	bind: function (el, binding, vnode) {
		const contactInfo = document.createElement('div');
		let isCreated = false;

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
							<img src="${userDefaultAvatar}" alt="${binding.value.name}">
						</div>
						<div class="user">
							<span class="name"><b>Имя:</b> ${binding.value.name}</span>
							<span class="sex"><b>Пол:</b> ${binding.value.sex === 'male' ? 'мужской' : 'женский'}</span>
							<span class="age"><b>Возраст:</b> ${binding.value.age}</span>
						</div>
					</header>
					<div class="info">

					</div>
					<footer class="footer">
						<a href="tel:${binding.value.phone}" class="button call"></a>
						<a href="mailto:${binding.value.email}" class="button send"></a>
						<button class="button open"></button>
					</footer>
				`
				vnode.elm.appendChild(contactInfo);
				el.querySelector('.button.open').addEventListener('click', function () {
					vnode.context.$router.push({ path: `contact/${binding.value.id}`, params: {id: binding.value.id} });
				});
				isCreated = true;
			}
		}

		function removeTooltip() {
			if (isCreated) {
				vnode.elm.removeChild(contactInfo);
				isCreated = false;
			}
		}
	}
};



