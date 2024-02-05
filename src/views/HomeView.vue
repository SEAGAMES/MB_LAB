<template>
  <div></div>
</template>

<script>
export default {
  async mounted() {
    // this.$routes.path('/src/views/MB-Lab.vue')
    // console.log(this.$store.getters.userData);
    console.log("มา HomeView");
    await this.$router.push({ name: "Mb_Lab" });
    //this.$router.push({ path: "../views/MB-Lab.vue" });
  },
};
</script>

<style>
</style>