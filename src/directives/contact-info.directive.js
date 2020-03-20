import userDefaultAvatar from '@/assets/icons/user.png';

export default {
	bind: function (el, binding, vnode) {
		const contactInfo = document.createElement('div');
		let isCreated = false;

		el.addEventListener('mouseenter', createTooltip);
		el.addEventListener('mouseleave', removeTooltip);

		function createTooltip(evt) {
			if (!isCreated) {
				contactInfo.style.left = evt.offsetX + 'px';
				contactInfo.classList.add('contact-info');
				contactInfo.innerHTML = `
					<div class="contact-info__inner">
						<a href="tel:${binding.value.phone}" class="button call" title="Позвонить"></a>
						<a href="mailto:${binding.value.email}" class="button send" title="Написать"></a>
						<button class="button open" title="Подробнее"></button>
					</div>
				`

				vnode.elm.appendChild(contactInfo);
				el.querySelector('.button.open').addEventListener('click', function () {
					vnode.context.$router.push({
						path: `contact/${binding.value.id}`,
						params: { id: binding.value.id }
					});
				});
				isCreated = true;

				setTimeout(() => {
					contactInfo.classList.add('fade-in');
				}, 200);
			}
		}

		function removeTooltip() {
			if (isCreated) {
				contactInfo.classList.remove('fade-in');
				setTimeout(() => {
					if ([...vnode.elm.children].includes(contactInfo)) {
						vnode.elm.removeChild(contactInfo);
						isCreated = false;
					}
				}, 200);
			}
		}
	}
};



