<template>
  <div class="contact-map" :style="{ width: width + 'px', height: height + 'px' }">
    <yandex-map
			:coords="coords"
			:zoom="12"
			:controls="['zoomControl']"
		>
      <ymap-marker :coords="coords" marker-id="123" :hint-content="address" />
    </yandex-map>
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
      coords: [54.82896654088406, 39.831893822753904]
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
			})
  },
  methods: {
    async getCoordByAddress(address) {
			const response = await fetch(
				`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${process.env.VUE_APP_YMAP_API_KEY}&geocode=${address}`
			);
			const data = await response.json();
			return data;
		},
  }
};
</script>

<style lang="scss">
.contact-map {
  .ymap-container {
    height: 100%;
  }
}
</style>
