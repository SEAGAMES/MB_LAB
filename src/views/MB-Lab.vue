<template>
  <!-- <span>{{ version }}</span> -->
  <div class="fontSarabun container">
    <div class="row">
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 p-2 ">
        <h1 class="text-bold text-indigo-darken-4 text-center">
          {{ languageForShow.nameBooking }}
        </h1>
        <div class="text-right">
          <a-button
            v-if="checkUserPolicy"
            :style="{ backgroundColor: 'lightgreen', color: 'black' }"
            @click="$router.push({ name: 'Mb_Approve' })"
            >{{ languageForShow.approve }}</a-button
          >
        </div>
      </div>
    </div>
    <!-- <div class="row">
      <div class="col-12 col-md-4">test</div>
      <div class="col-12 col-md-4">test</div>
      <div class="col12 col-md-4">test</div>
    </div> -->

    <!-- v-card input data -->
    <v-form
      ref="form"
      lazy-validation
      class="mx-auto rounded bg-white p-3 mb-3 col-lg-10"
    >
      <div class="fontSize18 row">
        <div align="center" class="col-sm-12 col-lg-6 pb-6">
          <span>{{ languageForShow.booker }} : </span>
          <span :style="{ color: '#607D8B' }">{{ dataBookLab.name }}</span>
        </div>

        <div align="center" class="mt-n3 col-sm-12 col-lg-6 pt-2">
          <!-- mt-n3 col-sm-12 col-lg-6 -->
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
          ></v-text-field>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <v-select
            v-model="dataBookLab.zone"
            :rules="floorRules"
            :label="languageForShow.zone"
            required
            outlined
            dense
            :items="['B', 'C', 'D']"
            variant="outlined"
          ></v-select>
        </div>
        <div class="col-4">
          <v-select
            v-model="dataBookLab.floor"
            :rules="floorRules"
            :label="languageForShow.floor"
            required
            outlined
            dense
            :items="['2', '3', '4']"
            variant="outlined"
          ></v-select>
        </div>
        <div class="col-4">
          <v-select
            v-model="dataBookLab.where_lab"
            :rules="floorRules"
            :label="languageForShow.room"
            required
            outlined
            dense
            :items="room_list"
            variant="outlined"
          ></v-select>
        </div>
      </div>

      <div class="fontSize18 row text-center">
        <div class="col-sm-12 col-md-4">
          <p>{{ languageForShow.dateTimeBooking }} :</p>
        </div>
        <div class="col-sm-12 col-md-4">
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
      </div>
      <div>
        <v-btn
          class="mt-5"
          @click="validate()"
          :loading="loadingBtn"
          color="green"
          append-icon="mdi-check-circle"
          block
          >{{ languageForShow.sentForm }}</v-btn
        >
      </div>
    </v-form>

    <v-card class="mx-auto my-7 col-lg-10"
      ><div class="table-responsive">
        <a-table :columns="columns" :data-source="dataBookingLab.data">
          <template #headerCell="{ column }">
            <template v-if="column.key === 'name'">
              <div>
                {{ languageForShow.headerTable.name }}
              </div>
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
            <template v-if="column.key === 'appove_status'">
              <span> {{ languageForShow.headerTable.status }} </span>
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
            <!-- ตรวจสอบว่า column.key เป็น 'appove_status' และ record.appove_status เป็น 0 -->
            <template v-if="column.key === 'appove_status'">
              <a-button
                class="custom-button"
                :style="getStatusButtonStyle(record.appove_status)"
                >{{ getStatusLabel(record.appove_status) }}</a-button
              >
            </template>
            <template v-if="column.key === 'action'">
              <!-- <v-icon
              @click="editBooking(item)"
              style="color: rgb(243, 156, 18)"
              >mdi-pencil</v-icon
            > -->
              <a-popconfirm
                title="Delete ?"
                @confirm="confirm(record.id)"
                v-if="this.$store.getters.userData.englishname === record.name"
              >
                <v-icon style="color: rgb(255, 0, 0)">mdi-delete</v-icon>
              </a-popconfirm>
            </template>
          </template>
        </a-table>
      </div></v-card
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
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
import apiRoomLab from "../services/apiRoomLab";
import { message } from "ant-design-vue";

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
    

    telNoRules: [(v) => !!v || "required field"],
    floorRules: [(v) => !!v || "required field"],
    dateRules: [(v) => !!v || "required field"],

    columns: [
      {
        key: "name",
        title: "ชื่อ-นามสกุล",
        dataIndex: "name",
        align: "center",
      },
      // { key: "phone", title: "เบอร์", dataIndex: "phone", align: "center" },
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

      {
        key: "appove_status",
        title: "สถานะ",
        dataIndex: "appove_status",
        align: "center",
      },
      { key: "action", title: "action", dataIndex: "action", align: "center" },
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
    found: false,
    loadingBtn: false,
    dataBookingLab: [],
  }),

  mounted() {
    // console.log(this.$store.getters.userData);
    setTimeout(async () => {
      this.checkUserPolicy();
    }, 500);
    if (
      this.$store.getters.userData == null ||
      this.$store.getters.userData == ""
    ) {
      this.$router.push({ path: "/home" });
    } else {
      if (localStorage.getItem("bookingLab") !== null) {
        const data = localStorage.getItem("bookingLab");
        this.dataBookLab = JSON.parse(data);
        this.dataBookLab.ac_name = this.$store.getters.userData.accountname;
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
      this.$store.getters.userPolicy.forEach((obj) => {
        if (obj.project_id === "1") {
          this.found = true;
        }
      });
    },

    async confirm(id) {
      const result = await apiRoomLab.deleteBookingLab(id);
      if (result.msg === "ok") {
        this.loadBookingLab();
        message.success("Delete Success.");
      } else {
        message.error("Delete Fail.");
      }
    },

    getStatusButtonStyle(appoveStatus) {
      switch (appoveStatus) {
        case 0:
          return { backgroundColor: "orange" };
        case 1:
          return { backgroundColor: "lightgreen" };
        case 2:
          return { backgroundColor: "lightcoral" };
        default:
          return {};
      }
    },

    getStatusLabel(appoveStatus) {
      switch (appoveStatus) {
        case 0:
          return this.languageForShow.status.wait;
        case 1:
          return this.languageForShow.status.allow;
        case 2:
          return this.languageForShow.status.not_Allowed;
        default:
          return "";
      }
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
      // console.log('dataBookLab : ',this.dataBookLab);
      const result = await apiRoomLab.createBookLabRoom(this.dataBookLab);

      setTimeout(async () => {
        if (result.data.msg === "ok") {
          this.alertShow(true, "Success", "success", "mdi-shield-check");
          this.loadingBtn = false;
          this.loadBookingLab();
          this.clearInputData();
          this.clearLocalStorage();
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

    deleteBooking(id) {
      console.log(id);
    },

    clearInputData() {
      (this.dataBookLab.phone = ""), (this.dataBookLab.zone = "");
      this.dataBookLab.floor = "";
      this.dateSelect = [];
    },

    // ต้อง settimeout ไม่งั้นเคลียไม่ได้
    clearLocalStorage() {
      const data = localStorage.getItem("bookingLab");
      const setNewData = JSON.parse(data);
      setNewData.phone = "";
      setNewData.zone = "";
      setNewData.floor = "";
      setNewData.where_lab = "";
      setTimeout(async () => {
        localStorage.setItem("bookingLab", JSON.stringify(setNewData));
      }, 500);
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

.custom-button {
  width: 100px; /* ปรับความกว้างตามต้องการ */
  height: 40px; /* ปรับความสูงตามต้องการ */
}
</style>
