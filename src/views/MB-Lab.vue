<template>
  <v-container class="fontSarabun">
    <v-row>
      <span>{{ version }}</span>
      <v-spacer></v-spacer>
      <h1 class="text-bold mt-3">ระบบจองห้อง Lab</h1>
      <v-spacer></v-spacer>
      <a-button
        style="background-color: lightgreen"
        @click="$router.push({ name: 'Mb_Approve' })"
        >สำหรับอนุมัติ</a-button
      >
    </v-row>

    <!-- v-card input data -->
    <v-form ref="form" lazy-validation>
      <v-card class="mx-auto my-7 pl-2 pr-2" width="900" height="305">
        <v-card-text>
          <v-row class="fontSize18"
            ><v-col>
              <div align="center" class="mt-4">
                <p>ผู้จอง : {{ form.rent_name }}</p>
              </div>
            </v-col>

            <v-col>
              <div align="center">
                <v-text-field
                  label="เบอร์ติดต่อ"
                  v-model="dataBookLab.phone"
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
                  label="โซน"
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
                  label="ชั้น"
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
                  label="ห้อง"
                  required
                  outlined
                  dense
                  :items="room_list"
                  variant="outlined"
                  @change="loadBookingLab()"
                ></v-select></div
            ></v-col>
          </v-row>
          <v-row class="fontSize18 ml-1">
            <div>
              <p>ช่วงเวลาที่ต้องการจอง :</p>
            </div>
            <div class="mt-n1 ml-2">
              <a-range-picker
                v-model:value="dateSelect"
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
              >ส่งแบบฟอร์ม</v-btn
            >
          </v-row>
        </v-card-text>
      </v-card>
    </v-form>

    <v-card class="mx-auto my-7" width="900"
      ><a-table :columns="columns" :data-source="dataBookingLab.data">
        <template #headerCell="{ column }">
          <template v-if="column.key === 'name'">
            <span> ชื่อ-นามสกุล </span>
          </template>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <a>
              {{ record.name }}
            </a>
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

    form: {
      rent_name: "ธนกฤต นิ่มนวล",
      telNo: "",
      lab_room: [],
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

    dataBookLab: {
      ac_name: "thanakrit.nim",
      name: "Thanakrit Nimnual",
      num_in_team: 5,
      phone: "07894561",
      zone: "B",
      floor: "2",
      where_lab: "B203",
      start_date: "",
      endtime: "",
      appove_status: "true",
      appove_ac_name: "thanakrit.nim",
      room_code: "",
    },
    tab: null,
    loadingBtn: false,
    dataBookingLab: [],
    dateSelect: [],
  }),

  mounted() {
    this.tab = "two";
    this.getRoomLab();
    //this.createBookLabRoom();
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
          this.loadingBtn = false;
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
      this.form.lab_room = await apiRoomLab.getRoomLab();
      // console.log("this.form.lab_room ", this.form.lab_room);
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
        "(อา.)",
        "(จ.)",
        "(อ.)",
        "(พ.)",
        "(พฤ.)",
        "(ศ.)",
        "(ส.)",
      ];

      // ดึงชื่อวันโดยใช้ getDay() เพื่อหาว่าวันที่ในสัปดาห์เป็นวันอะไร
      const dayName = thaiDays[dateObject.getDay()];

      // สร้างรูปแบบในการแสดงผล
      const timeString = dateObject.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, // เปลี่ยนเป็นรูปแบบ 24 ชั่วโมง
      });
      const formattedDate = `${dayName} ${dateObject.getDate()}/${
        dateObject.getMonth() + 1
      }/${dateObject.getFullYear()} (${timeString} น.)`;
      return formattedDate;
    },
  },

  computed: {
    room_list() {
      let room = [];
      let room_filter = this.form.lab_room.filter((row) => {
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
    "dataBookLab.where_lab": "loadBookingLab", // ตรวจสอบการเปลี่ยนแปลงใน dataBookLab.where_lab
  },
};
</script>

<style>
</style>
