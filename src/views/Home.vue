<template>
  <div class="home">
		<contact-list />
  </div>
</template>

<script>
import ContactList from '@/components/ContactList.vue'

export default {
  name: 'Home',
  components: {
		ContactList
  }
}
</script>
