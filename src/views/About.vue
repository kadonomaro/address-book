<template>
  <div class="about">
    <v-company />
  </div>
</template>

<script>
import vCompany from '@/components/About/vCompany.vue';

export default {
  name: 'Home',
  components: {
		vCompany
	},
}
</script>
