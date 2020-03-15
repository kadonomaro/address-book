<template>
	<div class="company">
		<h1 class="company__title">О компании</h1>
		<div class="company__info">
			<div class="company__text">
				<p>
					Наша компания основана с 2005 году. В данный момент занимает лидирующие позиции на рынке для малого и среднего бизнеса.
					В нашем штате только профессионалы с большим опытом работы в сфере разработки программного обеспечения.
				</p>
			</div>
			<contact-map class="company__map" :address="address" />
		</div>

	</div>
</template>

<script>
import ContactMap from '@/components/Contact/ContactMap.vue';

export default {
	name: 'v-company',
	components: {
		ContactMap
	},
	data() {
		return {
			address: 'г. Москва, Леонтьевский переулок 15'
		}
	}
}
</script>

<style lang="scss">
	.company {
		max-width: 1600px;
		margin: 0 auto;
		padding: 20px 10px;
		box-sizing: border-box;
		&__title {
			margin: 0 0 20px;
			font-size: 24px;
		}
		&__info {
			display: flex;
		}
		&__map {
			flex-shrink: 0;
		}
		&__text {
			p {
				margin: 0 0 10px;
			}
		}
	}
</style>
