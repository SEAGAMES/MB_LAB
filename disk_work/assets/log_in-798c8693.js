import{_ as a,a as e,o as s,c as n}from"./index-56921e69.js";const l={data(){return{text:"Login system  กำลังนำไปหน้า ล็อกอิน"}},async mounted(){this.$route.query.vfy==="pass"&&this.$route.query.c!==null?(console.log("เข้ามา1"),this.login()):localStorage.getItem("MB-app")?(console.log("เข้ามา2"),await e.post("https://mb.mahidol.ac.th/mbpsapi/checktoken").then(async t=>{t.data.msg==="token-ok"?await this.$router.push({name:"HomeView"}):(localStorage.removeItem("MB-app"),window.location="https://mb.mahidol.ac.th/mbenter/login?src=mb_lab")})):(console.log("เข้ามา3"),setTimeout(function(){window.location="https://mb.mahidol.ac.th/mbenter/login?src=mb_lab"},500))},methods:{async login(){await e.post("https://mb.mahidol.ac.th/mbpsapi/login",{c:this.$route.query.c}).then(t=>{const o=t.data;o.msg==="ok"?(localStorage.removeItem("MB-app"),localStorage.setItem("MB-app",o.token),e.defaults.headers.common.Authorization=localStorage.getItem("MB-app"),console.log("เข้า ok"),this.$router.push({name:"HomeView"})):(console.log("ไม่พบรายชื่อ"),this.text="โปรดติดต่อคุณ สุจิต ฝ่าย ITMB",alert("ไม่พบรายชื่อคุณในฐานข้อมูล"))})}}};function i(t,o,c,r,m,p){return s(),n("div")}const g=a(l,[["render",i]]);export{g as default};
