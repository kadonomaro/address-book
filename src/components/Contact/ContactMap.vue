<template>
	<div id="map" :style="{ width: width + 'px', height: height + 'px' }">

		<transition name="fade">
			<div v-if="coords.length" class="contact-map" >
				<yandex-map
					:coords="coords"
					:zoom="14"
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
  mounted() {
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
				`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=9997739f-f8c2-4371-ab19-02877c805d38&geocode=${address}`
			);
			const data = await response.json();
			return data;
		}
	},
	watch: {
		address(val) {
			this.getCoordByAddress(val)
				.then((response) => {
					return response.response;
				})
				.then((position) => {
					const searchCoords = position.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
					this.coords = searchCoords.reverse();
				});
		}
	}
};
</script>

<style lang="scss">
@import "@/style/variables.scss";

	#map {
		position: relative;
	}
	.contact-map {
		.ymap-container {
			height: 100%;
		}
		&__address {
			position: absolute;
			top: 0;
			left: 50%;
			display: block;
			padding: 5px 10px;
			color: #ffffff;
			text-align: center;
			background-color: $main-color;
			transform: translateX(-50%);
		}
	}
	.contact-map-preloader {
		background-color: #ffffff;
		background-image: url('~@/assets/yandex-maps-logo.jpg');
		background-repeat: no-repeat;
		background-size: contain 100%;
		background-position: center;
	}

	.contact-map,
	.contact-map-preloader {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		border: 2px solid $main-color;
	}
</style>
