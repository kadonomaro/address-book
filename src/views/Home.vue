<template>
  <main class="home">
		<contact-list />
  </main>
</template>

<script>
import ContactList from '@/components/Contact/ContactList.vue';

export default {
  name: 'Home',
  components: {
		ContactList
	},
}
</script>
