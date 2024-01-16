<template>
  <v-container class="fontSarabun">
    <v-row>
      {{ this.$store.getters }}
      <!-- <img src="https://lh3.googleusercontent.com/drive-viewer/AEYmBYRfX_0bPte9esUMLtlitPF8JtOJW9vCofwZmb_yjDaMpsTp2UJXDKp0KlMNBQN0cTnSKD5lxfwzFT6dZ3ZvQ5GYw6Fq3g=s1600"> -->
      <span>{{ version }}</span>
      <v-spacer></v-spacer>
      <!-- <h1 class="text-bold mt-3">ระบบจองห้อง Lab</h1> -->
      <v-spacer></v-spacer>
      <!-- <a-button
        v-if="checkUserPolicy()"
        :style="{ backgroundColor: 'lightgreen', color: 'black' }"
        @click="$router.push({ name: 'Mb_Approve' })"
        >{{ languageForShow.approve }}</a-button
      > -->
    </v-row>

    <!-- v-card input data -->
    <v-form ref="form" lazy-validation>
      <v-card class="mx-auto my-7 pl-2 pr-2" width="1000" height="305">
        <v-card-text>
          <v-row class="fontSize18"
            ><v-col>
              <div align="center" class="mt-4">
                <span>{{ languageForShow.booker }} : </span>
                <span :style="{ color: '#607D8B' }">{{
                  dataBookLab.name
                }}</span>
              </div>
            </v-col>

            <v-col>
              <div align="center">
                <v-text-field
                  :label="languageForShow.headerTable.tel"
                  v-model="dataBookLab.phone"
                  @change="memoryData"
                  prepend-inner-icon="mdi-phone-plus"
                  :rules="telNoRules"
                  single-line
                  type="number"
                  autofocus
                  required
                  outlined
                  dense
                ></v-text-field></div
            ></v-col>
          </v-row>
          <v-row class="mt-n2">
            <v-col>
              <div>
                <v-select
                  v-model="dataBookLab.zone"
                  :rules="floorRules"
                  :label="languageForShow.zone"
                  required
                  outlined
                  dense
                  :items="['B', 'C', 'D']"
                  variant="outlined"
                ></v-select></div
            ></v-col>
            <v-col>
              <div>
                <v-select
                  v-model="dataBookLab.floor"
                  :rules="floorRules"
                  :label="languageForShow.floor"
                  required
                  outlined
                  dense
                  :items="['2', '3', '4']"
                  variant="outlined"
                ></v-select></div
            ></v-col>
            <v-col>
              <div>
                <v-select
                  v-model="dataBookLab.where_lab"
                  :rules="floorRules"
                  :label="languageForShow.room"
                  required
                  outlined
                  dense
                  :items="room_list"
                  variant="outlined"
                ></v-select></div
            ></v-col>
          </v-row>
          <v-row class="fontSize18 ml-1">
            <div>
              <p>{{ languageForShow.dateTimeBooking }} :</p>
            </div>
            <div class="mt-n1 ml-2">
              <a-range-picker
                v-model:value="dateSelect"
                @change="memoryData"
                :rules="dateRules"
                show-time
                required
                :format="'YYYY-MM-DD HH:mm'"
                :disabled-date="disabledDate"
              />
            </div>
          </v-row>
          <v-row>
            <v-btn
              class="mt-5"
              @click="validate()"
              :loading="loadingBtn"
              color="green"
              append-icon="mdi-check-circle"
              block
              >{{ languageForShow.sentForm }}</v-btn
            >
          </v-row>
        </v-card-text>
      </v-card>
    </v-form>

    <v-card class="mx-auto my-7" width="1000"
      ><a-table :columns="columns" :data-source="dataBookingLab.data">
        <template #headerCell="{ column }">
          <template v-if="column.key === 'name'">
            <span> {{ languageForShow.headerTable.name }} </span>
          </template>
          <template v-if="column.key === 'phone'">
            <span> {{ languageForShow.headerTable.tel }} </span>
          </template>
          <template v-if="column.key === 'where_lab'">
            <span> {{ languageForShow.headerTable.room }} </span>
          </template>
          <template v-if="column.key === 'start_date'">
            <span> {{ languageForShow.headerTable.startTime }} </span>
          </template>
          <template v-if="column.key === 'end_date'">
            <span> {{ languageForShow.headerTable.endTime }} </span>
          </template>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <a>
              {{ record.name }}
            </a>
          </template>
          <template v-if="column.key === 'start_date'">
            <div :style="{ color: '#F57C00' }">
              {{ record.start_date }}
            </div>
          </template>
          <template v-if="column.key === 'end_date'">
            <div :style="{ color: '#FF6D00' }">
              {{ record.end_date }}
            </div>
          </template>
        </template>
      </a-table></v-card
    >

    <!-- snackbar -->
    <v-snackbar v-model="snackBar.showSnackBar" :timeout="3000" top>
      <div class="text-center">
        {{ snackBar.titleSnackBar }}
        <v-icon large class="ml-1" :color="snackBar.colorSnackBar">{{
          snackBar.iconSnackBar
        }}</v-icon>
      </div>
    </v-snackbar>
  </v-container>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
import apiRoomLab from "../services/apiRoomLab";

export default {
  setup() {
    const version = import.meta.env.VITE_APP_VERSION;
    return { version };
  },

  data: () => ({
    snackBar: {
      showSnackBar: false,
      titleSnackBar: "",
      colorSnackBar: "",
      iconSnackBar: "",
    },

    telNoRules: [(v) => !!v || "กรุณาใส่เบอร์โทรศัพท์"],
    floorRules: [(v) => !!v || "กรุณาระบุข้อมูล"],
    dateRules: [(v) => !!v || "กรุณาระบุวันที่จอง"],

    columns: [
      {
        key: "name",
        title: "ชื่อ-นามสกุล",
        dataIndex: "name",
        align: "center",
      },
      { key: "phone", title: "เบอร์", dataIndex: "phone", align: "center" },
      //{ key: "timebook", title: "จองเวลา", dataIndex: "timebook", align: 'center' },
      {
        key: "where_lab",
        title: "ห้อง",
        dataIndex: "where_lab",
        align: "center",
      },
      {
        key: "start_date",
        title: "เริ่มใช้เวลา",
        dataIndex: "start_date",
        align: "center",
      },
      { key: "end_date", title: "ถึง", dataIndex: "end_date", align: "center" },
    ],

    lab_room: [],

    dataBookLab: {
      ac_name: "",
      name: "",
      phone: "",
      zone: "",
      floor: "",
      where_lab: "",
      start_date: "",
      endtime: "",
    },

    dateSelect: [],

    // languageForShow: {
    //   booker: "",
    //   zone: "",
    //   floor: "",
    //   room: "",
    //   dateTimeBooking: "",
    //   sentForm: "",

    //   headerTable: {
    //     name: "",
    //     tel: "",
    //     room: "",
    //     sentTime: "",
    //     startTime: "",
    //     endTime: "",
    //     status: "",
    //   },
    // },

    loadingBtn: false,
    dataBookingLab: [],
  }),

  mounted() {
    // console.log(this.$store.getters.userData);
    if (
      this.$store.getters.userData == null ||
      this.$store.getters.userData == ""
    ) {
      this.$router.push({ path: "/home" });
    } else {
      if (localStorage.getItem("bookingLab") !== null) {
        const data = localStorage.getItem("bookingLab");
        this.dataBookLab = JSON.parse(data);
      }
      this.getRoomLab();
      this.dataBookLab.name = this.$store.getters.userData.englishname;
      //this.createBookLabRoom();
    }
  },

  methods: {
    alertShow(show, title, color, icon) {
      this.snackBar = {
        showSnackBar: show,
        titleSnackBar: title,
        colorSnackBar: color,
        iconSnackBar: icon,
      };
    },

    checkUserPolicy() {
      let found = false;
      this.$store.getters.userPolicy.forEach((obj) => {
        if (obj.project_id === "1") {
          found = true;
        }
      });
      return found;
    },

    memoryData() {
      localStorage.setItem("bookingLab", JSON.stringify(this.dataBookLab));
    },

    disabledDate(current) {
      // ตรวจสอบว่าวันที่ current เป็นวันที่เราต้องการหรือไม่
      const tomorrow = moment().add(1, "days").startOf("day");
      return current && current < tomorrow;
    },

    async validate() {
      this.$refs.form
        .validate()
        .then((result) => {
          // เข้าถึงค่า "valid" และเก็บไว้ในตัวแปรใหม่
          const isValid = result.valid;
          if (isValid === true && this.dateSelect.length === 2) {
            const dayObject = JSON.parse(JSON.stringify(this.dateSelect));
            this.dataBookLab.start_date = dayObject[0];
            this.dataBookLab.endtime = dayObject[1];
            this.createBookLabRoom();
          } else {
            this.alertShow(
              true,
              "กรุณาใส่ข้อมูลให้ครบถ้วน",
              "red",
              "mdi-shield-alert"
            );
            this.loadingBtn = false;
          }
        })
        .catch((error) => {
          // จัดการข้อผิดพลาดที่อาจเกิดขึ้นในระหว่างการทำ Promise
          console.log(error);
        });
      //console.log(this.$refs.form.validate());
    },

    async createBookLabRoom() {
      this.loadingBtn = true;
      //console.log(this.dataBookLab);
      const result = await apiRoomLab.createBookLabRoom(this.dataBookLab);

      setTimeout(async () => {
        if (result.data.msg === "ok") {
          this.alertShow(true, "Success", "success", "mdi-shield-check");
          localStorage.removeItem("bookingLab");
          this.loadingBtn = false;
          this.loadBookingLab();
          this.clearInputData()

        } else {
          this.alertShow(
            true,
            "มีการใช้ช่วงเวลานี้เเล้ว",
            "red",
            "mdi-shield-alert"
          );
          this.loadingBtn = false;
        }
      }, 1500);
    },

    async getRoomLab() {
      this.lab_room = await apiRoomLab.getRoomLab();
    },

    async loadBookingLab() {
      this.dataBookingLab = await apiRoomLab.thisLabBooking(
        this.dataBookLab.where_lab
      );
      if (this.dataBookingLab.msg !== "not found") {
        this.dataBookingLab.data.forEach((obj) => {
          obj.start_date = this.formatdate(obj.start_date);
          obj.end_date = this.formatdate(obj.end_date);
          obj.timebook = this.formatdate(obj.timebook);
        });
      }
    },

    formatdate(date) {
      const isoDate = date;
      const dateObject = new Date(isoDate);

      // สร้างรายการของชื่อวันในภาษาไทย
      const thaiDays = [
        "(Sun.)",
        "(Mon.)",
        "(Tue.)",
        "(Wed.)",
        "(Thu.)",
        "(Fri.)",
        "(Sat.)",
      ];

      // ดึงชื่อวันโดยใช้ getDay() เพื่อหาว่าวันที่ในสัปดาห์เป็นวันอะไร
      const dayName = thaiDays[dateObject.getDay()];

      // สร้างรูปแบบในการแสดงผล
      const timeString = dateObject.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true, // เปลี่ยนเป็นรูปแบบ 12 ชั่วโมง AM/PM
      });

      const formattedDate = `${dayName} ${dateObject.getDate()}/${
        dateObject.getMonth() + 1
      }/${dateObject.getFullYear()} (${timeString})`;
      return formattedDate;
    },

    // formatdate(date) {
    //   const isoDate = date;
    //   const dateObject = new Date(isoDate);

    //   // สร้างรายการของชื่อวันในภาษาไทย
    //   const thaiDays = [
    //     "(Sun.)",
    //     "(Mon.)",
    //     "(Tue.)",
    //     "(Wed.)",
    //     "(Thu.)",
    //     "(Fri.)",
    //     "(Sat.)",
    //   ];

    //   // ดึงชื่อวันโดยใช้ getDay() เพื่อหาว่าวันที่ในสัปดาห์เป็นวันอะไร
    //   const dayName = thaiDays[dateObject.getDay()];

    //   // สร้างรูปแบบในการแสดงผล
    //   const timeString = dateObject.toLocaleTimeString([], {
    //     hour: "2-digit",
    //     minute: "2-digit",
    //     hour12: false, // เปลี่ยนเป็นรูปแบบ 24 ชั่วโมง
    //   });
    //   const formattedDate = `${dayName} ${dateObject.getDate()}/${
    //     dateObject.getMonth() + 1
    //   }/${dateObject.getFullYear()} (${timeString} น.)`;
    //   return formattedDate;
    // },

    clearInputData() {
      this.dataBookLab.phone = '',
      this.dataBookLab.zone = ''
      this.dataBookLab.floor = ''
      this.dateSelect= []
    },
  },

  computed: {
    ...mapGetters(["formLanguge"]),

    languageForShowComputed() {
      return this.formLanguge || this.languageForShow;
    },

    room_list() {
      let room = [];
      let room_filter = this.lab_room.filter((row) => {
        return (
          row.zone === this.dataBookLab.zone &&
          row.floor === this.dataBookLab.floor
        );
      });

      room_filter.forEach((element) => {
        // console.log(element.room_no);
        room.push(element.room_no);
      });
      return room;
    },
  },

  watch: {
    "dataBookLab.where_lab": ["loadBookingLab", "memoryData"], // ตรวจสอบการเปลี่ยนแปลงใน dataBookLab.where_lab
    "dataBookLab.zone": "memoryData",
    "dataBookLab.floor": "memoryData",

    languageForShowComputed: {
      handler(newVal) {
        this.languageForShow = newVal;
      },
      immediate: true, // ให้ watch ทำงานทันทีเมื่อ component ถูกสร้าง
    },
  },
};
</script>

<style scoped>
.blue-text {
  color: rgb(31, 199, 115);
}
</style>
