<template>
  <div>{{ this.$store.getters }}</div>
</template>

<script>
export default {
  mounted() {
    // this.$routes.path('/src/views/MB-Lab.vue')
    console.log(this.$store.getters.userData);
    this.$router.push({ path: "/mb-lab" });
  },
};
</script>

<style>
</style>