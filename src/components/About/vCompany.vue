<template>
	<div class="company">
		<h1 class="company__title">О компании</h1>
		<div class="company__info">
			<div class="company__logo">
				<v-logo />
			</div>
			<div class="company__text">
				<p>
					Наша компания основана в 2005 году. В данный момент занимает лидирующие позиции на рынке для малого и среднего бизнеса.
					В нашем штате только профессионалы с большим опытом работы в сфере разработки программного обеспечения.
				</p>
				<h2>Преимущества работы с нами:</h2>
				<ul>
					<li>
						<h3>Надежность</h3>
						<p>Надежная компания с большим опытом работы. За нас говорят цифры и факты.</p>
					</li>
					<li>
						<h3>Гарантии</h3>
						<p>
							Мы всегда гарантируем своим клиентам соблюдение всех сроков и не отказывамся от обязательств на все время сотрудничества.
							</p>
					</li>
					<li>
						<h3>Доступные цены</h3>
						<p>
							Мы предлагаем свои услуги по рыночным ценам. Развитая система бонусов и скидок для клиентов,
							в зависимости от объема исполняемой работы и длительности сотрудничества.
							</p>
					</li>
				</ul>
				<p></p>
			</div>

		</div>
		<contact-map style="width: 100%" class="company__map" :address="address" />
	</div>
</template>

<script>
import ContactMap from '@/components/Contact/ContactMap.vue';
import vLogo from '@/components/partials/vLogo.vue';

export default {
	name: 'v-company',
	components: {
		ContactMap,
		vLogo
	},
	data() {
		return {
			address: 'г. Москва, Леонтьевский переулок 15'
		}
	}
}
</script>

<style lang="scss">
@import "@/style/variables.scss";

	.company {
		padding: 20px 0;
		&__title {
			margin: 0 0 20px;
			font-size: 24px;
		}
		&__info {
			display: flex;
			align-items: flex-start;
			margin-bottom: 30px;
		}
		&__logo {
			margin-right: 10px;
			padding: 10px;
			background-color: $main-color;
		}
		&__map {
			margin: 0 auto;
		}
		&__text {
			h2 {
				margin: 0 0 20px;
				font-size: 20px;
			}
			h3 {
				margin: 0 0 5px;
				font-size: 18px;
			}
			ul {
				margin: 0 0 10px;
			}
			p {
				margin: 0 0 10px;
			}
		}
	}
</style>
