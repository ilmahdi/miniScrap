<script>
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue';
export default {
  components: {
    Navbar,
  },
  created() {
    this.$store.dispatch('fetchDataFromBackend');
  },
};

</script>

<template>
  <div id="app">
    <div >
      <Navbar />
      <router-view />
    </div>
  </div>
</template>

<style scoped>
</style>
