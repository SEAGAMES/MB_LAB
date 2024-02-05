<template>
  <div class="fontSarabun container text-center">
    <div>
      <h1 class="text-bold mt-3 text-indigo-darken-4">
        {{ languageForShow.nameApprove }}
      </h1>
    </div>
    <v-card>
      <div class="table-responsive">
        <a-table :columns="columns" :data-source="dataLoad">
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
            <template v-if="column.key === 'timebook'">
              <span> {{ languageForShow.headerTable.sentTime }} </span>
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
              <div :style="{ color: '#F57C00' }">
                {{ record.end_date }}
              </div>
            </template>
            <!-- ตรวจสอบว่า column.key เป็น 'appove_status' และ record.appove_status เป็น 0 -->
            <template v-if="column.key === 'appove_status'">
              <!-- แสดง textbox แทนที่ -->
              <a-button
                class="custom-button"
                @click="selectRow(record)"
                :style="getStatusButtonStyle(record.appove_status)"
              >
                {{ getStatusLabel(record.appove_status) }}
              </a-button>
            </template>
          </template>
        </a-table>
      </div>
    </v-card>
    <div class="p-2 text-left">
      <a-button
        style="background-color: lightcoral"
        @click="$router.push({ name: 'Mb_Lab' })"
        >{{ this.languageForShow.btn.backPage }}</a-button
      >
    </div>
  </div>

  <!-- popup เปลี่ยนสถานะ -->
  <div>
    <a-modal
      v-model:open="changeStatus"
      title="เปลี่ยนสถานะ"
      @cancel="changeStatus === false"
      @ok="updateApproveStatus()"
    >
      <a-select
        v-model:value="value"
        style="width: 100%"
        :options="options"
      ></a-select>
    </a-modal>
  </div>

  <!-- snackbar -->
  <v-snackbar v-model="snackBar.showSnackBar" :timeout="3000" top>
    <div class="text-center">
      {{ snackBar.titleSnackBar }}
      <v-icon large class="ml-1" :color="snackBar.colorSnackBar">{{
        snackBar.iconSnackBar
      }}</v-icon>
    </div>
  </v-snackbar>
</template>
  
  <script>
import { ref, onMounted } from "vue";
import { mapGetters } from "vuex";
import { message } from "ant-design-vue";
import { Select } from "ant-design-vue";
import apiRoomLab from "../services/apiRoomLab";

export default {
  components: {
    "a-select": Select,
  },
  data: () => ({
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
    snackBar: {
      showSnackBar: false,
      titleSnackBar: "",
      colorSnackBar: "",
      iconSnackBar: "",
    },
    changeStatus: false,
    dataDetail: [],
    dataID: [],

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
        key: "timebook",
        title: "เวลาที่กดจอง",
        dataIndex: "timebook",
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
    ],
  }),

  setup() {
    const dataLoad = ref([]);
    const options = ref([
      { label: "รออนุมัติ", value: 0 },
      { label: "อนุมัติ", value: 1 },
      { label: "ไม่อนุมัติ", value: 2 },
    ]);

    // ใช้ onMounted เพื่อเพิ่มข้อมูลลงในตารางเมื่อคอมโพเนนต์ถูกแสดง
    onMounted(() => {
      // ในที่นี้คุณสามารถดึงข้อมูลจาก API หรือที่เก็บข้อมูลอื่น ๆ แล้วกำหนดให้กับ dataSource
    });

    return {
      dataLoad,
      options,
    };
  },

  mounted() {
    if (
      this.$store.getters.userData == null ||
      this.$store.getters.userData == "" ||
      this.$store.getters.userData == undefined
    ) {
      console.log("มา font ไม่ผ่าน");
      this.$router.push({ name: "Login" });
    } else {
      this.getRoomLab();
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

    async getRoomLab() {
      const data = await apiRoomLab.getBookingLab();
      //   console.log(this.formatdate(time[0].start_date))

      data.forEach((obj) => {
        obj.start_date = this.formatdate(obj.start_date);
        obj.end_date = this.formatdate(obj.end_date);
        obj.timebook = this.formatdate(obj.timebook);
      });
      this.dataLoad = data;
      //console.log(this.dataLoad);
    },

    selectRow(data) {
      this.changeStatus = true;
      // console.log(data.id);
      this.dataID = data.id;
    },

    async updateApproveStatus() {
      this.changeStatus = false;
      const result = await apiRoomLab.updateApproveStatus(
        this.dataID,
        this.value
      );

      setTimeout(async () => {
        if (result.data.msg === "ok") {
          message.success("save data is success");
          //this.alertShow(true, "Success", "success", "mdi-shield-check");
          this.getRoomLab();
        } else {
          message.error("error can not to save");
          // this.alertShow(
          //   true,
          //   "มีการใช้ช่วงเวลานี้เเล้ว",
          //   "red",
          //   "mdi-shield-alert"
          // );
        }
      }, 1500);
    },
  },

  computed: {
    ...mapGetters(["formLanguge"]),

    languageForShowComputed() {
      return this.formLanguge || this.languageForShow;
    },
  },

  watch: {
    languageForShowComputed: {
      handler(newVal) {
        this.languageForShow = newVal;
        //console.log("this.languageForShow : ", this.languageForShow);
      },
      immediate: true, // ให้ watch ทำงานทันทีเมื่อ component ถูกสร้าง
    },
  },
};
</script>
  
  <style scoped>
.custom-button {
  width: 100px; /* ปรับความกว้างตามต้องการ */
  height: 40px; /* ปรับความสูงตามต้องการ */
}
</style>
  