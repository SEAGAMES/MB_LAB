<template>
  <div></div>
</template>

<script>
export default {
  async mounted() {
    //console.log("มา HomeView");
    await this.$router.push({ name: "Mb_Lab" });
  },
};
</script>

<style>
</style>