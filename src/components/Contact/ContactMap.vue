<template>
	<div id="map" :style="{ width: width + 'px', height: height + 'px' }">

		<transition name="fade">
			<div v-if="coords.length" class="contact-map" >
				<yandex-map
					:coords="coords"
					:zoom="12"
					:controls="['zoomControl']"
					@map-was-initialized="init = true"
				>
					<ymap-marker :coords="coords" marker-id="123" :hint-content="address" />
				</yandex-map>
				<span class="contact-map__address">{{ address }}</span>
			</div>
		</transition>

		<transition name="fade">
			<div v-if="!init" class="contact-map-preloader"></div>
		</transition>

	</div>
</template>

<script>
import { yandexMap, ymapMarker, loadYmap } from "vue-yandex-maps";

export default {
	name: "contact-map",
	components: {
		yandexMap,
		ymapMarker
	},
  props: {
    address: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      required: false,
      default: 600
    },
    height: {
      type: Number,
      required: false,
      default: 400
    }
  },
  data() {
    return {
			coords: [],
			init: false
    };
  },
  async mounted() {
		this.getCoordByAddress(this.address)
			.then((response) => {
				return response.response;
			})
			.then((position) => {
				const searchCoords = position.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
				this.coords = searchCoords.reverse();
			});
  },
  methods: {
    async getCoordByAddress(address) {
			const response = await fetch(
				`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${process.env.VUE_APP_YMAP_API_KEY}&geocode=${address}`
			);
			const data = await response.json();
			return data;
		}
  }
};
</script>

<style lang="scss">
	#map {
		position: relative;
	}
	.contact-map {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		.ymap-container {
			height: 100%;
		}
		&__address {
			display: block;
			margin: 10px 0;
			text-align: center;
		}
	}
	.contact-map-preloader {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-image: url('~@/assets/yandex-maps-logo.jpg');
		background-size: cover;
		background-position: center;
	}

	.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
	}
	.fade-enter, .fade-leave-to {
		opacity: 0;
	}
</style>
