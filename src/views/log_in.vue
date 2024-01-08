<template>
  <div>
    <br />
    <h1>{{ text }}</h1>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      text: "Login system  กำลังนำไปหน้า ล็อกอิน",
    };
  },

  async mounted() {
    if (this.$route.query.vfy === "pass" && this.$route.query.c !== null) {
      console.log("เข้ามา1");
      this.login();
    } else if (localStorage.getItem("MB-app")) {
      console.log("เข้ามา2");
      axios.post("http://localhost:9200/login/checktoken").then((res) => {
        if (res.data.msg === "token-ok") {
          console.log("ผ่าน msg === token-ok");
          this.$router.push({ path: "../views/HomeView.vue" }); // ส่งไปที่นี้
        } else {
          localStorage.removeItem("MB-app");
          //const { getWebUrl } = require("../services/getUrl");

          window.location =
            "http://localhost:3000" + "/login" + "?src=mb_lab";
        }
      });
    } else {
      console.log("มา");
      //const { getWebUrl } = require("../services/getUrl");
      console.log("เข้ามา3");
      setTimeout(function () {
        window.location =
          "http://localhost:3000" + "/login" + "?src=mb_lab";
      }, 500);
    }
  },

  methods: {
    async login() {
      console.log(this.$route.query.c);
      await axios
        .post("http://localhost:9200/login/login", { c: this.$route.query.c })
        .then((res) => {
          console.log("c : ", this.$route.query.c);
          const data = res.data;
          console.log("data : ", data);

          if (data.msg === "ok") {
            localStorage.removeItem("MB-app");
            localStorage.setItem("MB-app", data.token);
            axios.defaults.headers.common["Authorization"] =
              localStorage.getItem("MB-app"); //for all request
            //console.log(axios.defaults.headers.common["Authorization"])
            console.log("เข้า ok");
            //this.$router.push({ path: "../views/MB-Lab.vue" }); // ส่งไปที่นี้
            this.$router.push({ name: 'Mb_Lab' })
          } else {
            console.log("ไม่พบรายชื่อ");
            this.text = "โปรดติดต่อคุณ สุจิต ฝ่าย ITMB";
            alert("ไม่พบรายชื่อคุณในฐานข้อมูล");
          }
        });
    },
  },
};
</script>

<style>
</style>