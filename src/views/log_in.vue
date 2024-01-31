<template>
  <div></div>
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
    //console.log("test1");
    //console.log('this.$route.query.vfy : ', this.$route)
    //console.log('this.$route.query.c : ', this.$route.query.c)
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
            "https://mb.mahidol.ac.th/mbenter" + "/login" + "?src=mb_lab";
        }
      });
    } else {
      console.log("มา");
      //const { getWebUrl } = require("../services/getUrl");
      console.log("เข้ามา3");
      setTimeout(function () {
        window.location =
          "https://mb.mahidol.ac.th/mbenter" + "/login" + "?src=mb_lab";
      }, 500);
    }
  },

  methods: {
    async login() {
     // console.log("$route.query.c) : ", this.$route.query.c);
      await axios.post("https://mb.mahidol.ac.th/mbpsapi/login", { c: this.$route.query.c })
        //.post("http://localhost:9200/login/login", { c: this.$route.query.c }) //local
       
        // .post("https://mb.mahidol.ac.th/mbenter/login", {
        //   c: this.$route.query.c,
        // })
        .then((res) => {
          //console.log("c : ", this.$route.query.c);
          const data = res.data;
          //console.log("data : ", data);

          if (data.msg === "ok") {
            localStorage.removeItem("MB-app");
            localStorage.setItem("MB-app", data.token);
            axios.defaults.headers.common["Authorization"] =
              localStorage.getItem("MB-app"); //for all request
            //console.log(axios.defaults.headers.common["Authorization"])
            console.log("เข้า ok");
            //this.$router.push({ path: "../views/MB-Lab.vue" }); // ส่งไปที่นี้
            this.$router.push({ name: "HomeView" });
          } else {
            console.log("ไม่พบรายชื่อ");
            this.text = "โปรดติดต่อคุณ สุจิต ฝ่าย ITMB";
            alert("ไม่พบรายชื่อคุณในฐานข้อมูล");
          }
        })
    },
  },
};
</script>

<style>
</style>