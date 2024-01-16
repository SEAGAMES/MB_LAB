export default async function guest({ next, axios, store }) {
  if (localStorage.getItem("MB-app") !== null) {
    //ใส่ตรงเพื่อไว้ f5 ไม่งั้น มันไปไม่ถูก 404
    //const {getWebUrl} = require('../../js/geturl')
    axios.defaults.baseURL = import.meta.env.VITE_AUTH_BASE_URL;
    axios.defaults.headers.common["Authorization"] =
      localStorage.getItem("MB-app"); //for all request

    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          console.log("พบข้อผิดพลาด" + "หมดเวลาการใช้งาน");
          localStorage.removeItem("MB-app");
          return next({ name: "Login" });
        }
        return error;
      }
    );
    console.log("เข้ามาในmiddoleware auth");
    await axios
      .get("/profile")
      .then((res) => {
        if (res.status === 200) {
          const res_data = res.data;

          if (res_data.msg === "ok") {
            // store here
            store.dispatch("addUserData", res_data.payload);
            if (store.getters.showname === null) {
              store.dispatch("swapName", store.getters.userData.englishname);
              store.dispatch("swapPosition", store.getters.userData.job_thai);
            }

            axios
              .get(import.meta.env.VITE_POLICY_APPROVE_URL)
              .then((response) => {
                // ดึงข้อมูลออกมาจาก response.data
                const data = response.data.data;
                const userPolicyData = data;
                store.dispatch("addUserPolicy", userPolicyData);
              })
              .catch((error) => {
                // จัดการข้อผิดพลาด
                console.error(error);
              });

            console.log("return profile is  ok");
            return next();
          } else {
            localStorage.removeItem("MB-app");

            console.log("return profile is not ok");
            return next({ name: "Login" });
          }
        } else if (res.status === 404) {
          console.log(" 404 why");
        }
      })
      .catch(() => {
        localStorage.removeItem("MB-app");
        console.log("พังง");
        return next({
          name: "Login",
        });
      });
  } else {
    console.log("no token in auth page");
    return next({
      name: "Login",
    });
  }
}
