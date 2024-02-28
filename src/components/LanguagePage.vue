<template>
  <div class="d-flex justify-content-end">
    <div class>
    </div>
    <!-- <div class="d-flex justify-content-end">
      <button class="ms-2 btn btn-color" @click="logout()">logout</button>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      langs: ["TH", "EN"],
      showname: "เปลี่ยนภาษา/Language",
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("MB-app");
      //const { getWebUrl } = require('@/service/getUrl')
      // alert(this.$t("goodbye"))
      window.location = "http://localhost:3000" + "/logout";
    },
  },
  mounted() {},
};
</script>

<style  scoped>
.floatR {
  margin-left: 5px;
  float: right;
}
.name {
  margin-right: 8px;
}
.btn-color {
  color: rgb(255, 255, 255);
  background-color: #200772;
}
@media only screen and (max-width: 425px) {
  .cover {
    float: left;
  }
  .floatR {
    float: none;
  }
}
</style>