<template>
  <!-- <span>{{ version }}</span> -->
  <div class="fontSarabun container">
    <div class="row">
      <div class="col-12 col-sm-12 col-md-12 col-lg-12 p-2">
        <!-- <div class="text-bold text-indigo-darken-4 text-center">{{ this.$store.getters }}</div> -->
        <h1 class="text-bold text-indigo-darken-4 text-center">
          {{ languageForShow.nameBooking }}
        </h1>
        <div class="text-right">
          <a-button
            v-if="found"
            :style="{ backgroundColor: 'lightgreen', color: 'black' }"
            @click="$router.push({ name: 'Mb_Approve' })"
            >{{ languageForShow.approve }}</a-button
          >
        </div>
      </div>
    </div>

    <!-- v-card input data -->
    <v-form
      ref="form"
      lazy-validation
      class="mx-auto rounded bg-white p-3 mb-3 col-lg-10"
    >
      <div>
        <div align="center" class="col-sm-12 col-lg-12 pb-6">
          <span>{{ languageForShow.booker }} : </span>
          <span :style="{ color: '#607D8B' }">{{ dataBookLab.name }}</span>
        </div>
      </div>
      <div class="fontSize18 row">
        <div align="center" class="col-sm-12 col-lg-6">
          <v-autocomplete
            v-model="dataBookLab.student_id"
            label="ชื่อ-นามสกุล"
            :rules="floorRules"
            variant="outlined"
            :items="studentDataWithCombinedValue"
            item-title="combinedValue"
            item-value="no"
          ></v-autocomplete>
        </div>

        <div align="center" class="col-sm-12 col-lg-6">
          <v-select
            v-model="dataBookLab.aca_id"
            :items="aca_Programs"
            item-title="aca_prog"
            item-value="aca_id"
            :label="languageForShow.academic"
            :rules="floorRules"
            required
            outlined
            dense
            variant="outlined"
          ></v-select>
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
            @change="
              {
                memoryData();
                dateValidate();
              }
            "
            show-time
            required
            :format="'YYYY-MM-DD HH:mm'"
            :disabled-date="disabledDate"
            style="width: 100%"
          />
          <p v-if="dateCheck" class="fontSize12 text-red">required time</p>
        </div>

        <!-- <div class="mt-2">
          <a-textarea
            v-model="dataBookLab.reason"
            :rules="floorRules"
            :placeholder="languageForShow.reason"
            :rows="3"
          />
        </div> -->
        <div class="mt-2">
          <v-text-field
            maxlength="300"
            v-model="dataBookLab.reason"
            :rules="floorRules"
            required
            :label="languageForShow.reason"
          ></v-text-field>
        </div>
      </div>
      <div>
        <v-btn
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
            <template v-if="column.key === 'student_name'">
              <div>
                {{ languageForShow.headerTable.student_name }}
              </div>
            </template>
            <template v-if="column.key === 'name'">
              <div>
                {{ languageForShow.headerTable.name }}
              </div>
            </template>
            <!-- <template v-if="column.key === 'phone'">
              <span> {{ languageForShow.headerTable.tel }} </span>
            </template> -->
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
              <div :style="{ color: '#3F51B5' }">
                {{ record.name }}
              </div>
            </template>
            <template v-if="column.key === 'where_lab'">
              <div :style="{ color: '#00BFA5' }">
                {{ record.where_lab }}
              </div>
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
                v-if="this.$store.getters.userData.thainame === record.name"
              >
                <v-icon style="color: rgb(255, 0, 0)">mdi-delete</v-icon>
              </a-popconfirm>
            </template>
          </template>
        </a-table>
      </div></v-card
    >
  </div>

  <!-- snackbar -->
  <v-snackbar v-model="snackBar.showSnackBar" :timeout="3000" location="top">
    <div class="text-center">
      {{ snackBar.titleSnackBar }}
      <v-icon large class="ml-1" :color="snackBar.colorSnackBar">{{
        snackBar.iconSnackBar
      }}</v-icon>
    </div>
  </v-snackbar>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
import apiRoomLab from "../services/apiRoomLab";
import apiAcademic from "@/services/apiAcademic";
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

    //telNoRules: [(v) => !!v || "required field"],
    floorRules: [(v) => !!v || ""],
    dateRules: [(v) => !!v || ""],

    columns: [
      {
        key: "student_name",
        title: "ชื่อ-นามสกุล",
        dataIndex: "student_name",
        align: "center",
      },
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

    academic_programs: [
      { name: "รออนุมัติ", value: 0 },
      { name: "อนุมัติ", value: 1 },
      { name: "ไม่อนุมัติ", value: 2 },
    ],

    lab_room: [],
    aca_Programs: [],
    studentData: [],

    dataBookLab: {
      ac_name: "",
      name: "",
      // phone: "",
      zone: "",
      floor: "",
      where_lab: "",
      start_date: "",
      endtime: "",
      reason: "",
      student_id: "",
      aca_id: "",
    },

    dateSelect: [],
    found: false,
    loadingBtn: false,
    dateCheck: false,
    dataBookingLab: [],
  }),

  async mounted() {
    //studentData
    this.studentData = await apiAcademic.getStudentData();
    //console.log(this.studentData);
    //apiAcademic
    this.aca_Programs = await apiAcademic.getAcademicPrograms();

    setTimeout(async () => {
      this.checkUserPolicy();
    }, 500);
    // console.log("มา Font");
    if (
      this.$store.getters.userData == null ||
      this.$store.getters.userData == "" ||
      this.$store.getters.userData == undefined
    ) {
      // console.log("มา font ไม่ผ่าน");
      this.$router.push({ name: "Login" });
    } else {
      if (localStorage.getItem("bookingLab") !== null) {
        const data = localStorage.getItem("bookingLab");
        this.dataBookLab = JSON.parse(data);
        this.dataBookLab.ac_name = this.$store.getters.userData.accountname;
      }
      this.getRoomLab();
      this.dataBookLab.name = this.$store.getters.userData.thainame;
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
      //console.log(this.$store.getters.userPolicy)
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
          // console.log(this.dataBookLab)
          // เข้าถึงค่า "valid" และเก็บไว้ในตัวแปรใหม่
          const isValid = result.valid;
          if (isValid === true && this.dateSelect.length === 2) {
            //console.log(this.dataBookLab)
            const dayObject = JSON.parse(JSON.stringify(this.dateSelect));
            this.dataBookLab.start_date = dayObject[0];
            this.dataBookLab.endtime = dayObject[1];
            this.createBookLabRoom();
          } else {
            this.dateValidate();
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

    dateValidate() {
      // validate manual ให้ a-datepicker
      if (this.dateSelect.length === 0) {
        this.dateCheck = true;
      } else {
        this.dateCheck = false;
      }
    },

    async createBookLabRoom() {
      this.loadingBtn = true;
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

    addData_Form_StudentID() {
      if (this.dataBookLab.student_id) {
        let studentData = this.studentData[this.dataBookLab.student_id - 1];
        //console.log(studentData.th_prefix + studentData.th_name + ' ' + studentData.th_lastname);
        // console.log(studentData);
        this.dataBookLab.student_name =
          studentData.th_name + " " + studentData.th_lastname;
        this.dataBookLab.aca_id = studentData.aca_id;
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

    clearInputData() {
      // (this.dataBookLab.phone = ""),
      this.dataBookLab.student_id = "";
      this.dataBookLab.student_name;
      this.dataBookLab.aca_id = "";
      this.dataBookLab.reason = "";
      this.dataBookLab.zone = "";
      this.dataBookLab.floor = "";
      this.dateSelect = [];
    },

    // ต้อง settimeout ไม่งั้นเคลียไม่ได้
    clearLocalStorage() {
      const data = localStorage.getItem("bookingLab");
      const setNewData = JSON.parse(data);
      // setNewData.phone = "";
      setNewData.student_id = "";
      setNewData.student_name = "";
      setNewData.aca_id = "";
      setNewData.reason = "";
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

    // รวมชื่อกับนามสกุล
    studentDataWithCombinedValue() {
      return this.studentData.map((item) => ({
        th_lastname: item.th_lastname,
        th_name: item.th_name,
        no: item.no,
        combinedValue: `${item.th_name} ${item.th_lastname}`, // รวมข้อมูลทั้งสอง
      }));
    },
  },

  watch: {
    "dataBookLab.student_id": ["addData_Form_StudentID", "memoryData"],
    "dataBookLab.where_lab": ["loadBookingLab", "memoryData"], // ตรวจสอบการเปลี่ยนแปลงใน dataBookLab.where_lab
    "dataBookLab.zone": "memoryData",
    "dataBookLab.floor": "memoryData",
    "dataBookLab.aca_id": "memoryData",
    "dataBookLab.reason": "memoryData",

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
  width: px; /* ปรับความกว้างตามต้องการ */
  height: 40px; /* ปรับความสูงตามต้องการ */
}

.ant-picker {
  width: 100%;
}
</style>
