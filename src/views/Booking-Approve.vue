<template>
  <v-container class="fontSarabun">
    <v-row>
      <v-spacer></v-spacer>
      <h1 class="text-bold mt-3">ระบบอนุมัติห้องแล็บ</h1>
      <v-spacer></v-spacer>
    </v-row>

    <!-- data -->
    <a-table :data-source="dataLoad" class="mt-6">
      <a-table-column
        v-for="column in columns"
        :key="column.key"
        :title="column.title"
      >
        <template v-slot:default="{ record }">
          {{ record[column.dataIndex] }}
        </template>
      </a-table-column>

      <!-- status -->
      <a-table-column title="สถานะ">
        <template v-slot:default="{ record }">
          <a-button
            class="custom-button"
            @click="selectStatus"
            :style="getStatusButtonStyle(record.appove_status)"
          >
            {{ getStatusLabel(record.appove_status) }}
          </a-button>
        </template>
      </a-table-column>

      <!-- สำรอง status -->
      <!-- <a-table-column title="สถานะ">
        <template v-slot:default="{ record }">
          <a-button
            class="custom-button"
            v-if="record.appove_status === 0"
            style="background-color: orange"
          >
            รออนุมัติ
          </a-button>
          <a-button
            class="custom-button"
            v-if="record.appove_status === 1"
            style="background-color: lightgreen"
          >
            ไม่อนุมัติ
          </a-button>
          <a-button
            class="custom-button"
            v-if="record.appove_status === 2"
            style="background-color: lightcoral"
          >
            อนุมัติแล้ว
          </a-button>
        </template>
      </a-table-column> -->
    </a-table>
    <a-button
      style="background-color: lightcoral"
      @click="$router.push({ name: 'Mb_Lab' })"
      >กลับ</a-button
    >
  </v-container>

  <!-- popup เปลี่ยนสถานะ -->
  <div>
    <a-modal
      v-model:open="changeStatus"
      title="เปลี่ยนสถานะ"
      @cancel="changeStatus === false"
      @ok="changStatus()"
    >
      <a-select
        v-model="selectedOption"
        :options="options"
        style="width: 100%"
      />
    </a-modal>
  </div>
</template>
  
  <script>
import { ref, onMounted } from "vue";
import { Select } from "ant-design-vue";
import apiRoomLab from "../services/apiRoomLab";

export default {
  components: {
    "a-select": Select,
  },
  data: () => ({
    changeStatus: false,
    bookingStatus: [
      { status_code: 0, status_name: "รออนุมัติ" },
      // เพิ่มข้อมูลสถานะอื่น ๆ ตามต้องการ
    ],
  }),

  setup() {
    const dataLoad = ref([]);

    const columns = ref([
      { key: "name", title: "ชื่อ-นามสกุล", dataIndex: "name" },
      { key: "phone", title: "เบอร์", dataIndex: "phone" },
      { key: "timebook", title: "จองเวลา", dataIndex: "timebook" },
      { key: "start_date", title: "เริ่มใช้เวลา", dataIndex: "start_date" },
      { key: "endtime", title: "ถึง", dataIndex: "endtime" },
    ]);

    const selectedOption = ref(null);
    const options = ref([
      { label: "รออนุมัติ", value: "0" },
      { label: "อนุมัติ", value: "1" },
      { label: "ไม่อนุมัติ", value: "2" },
    ]);

    // ใช้ onMounted เพื่อเพิ่มข้อมูลลงในตารางเมื่อคอมโพเนนต์ถูกแสดง
    onMounted(() => {
      // ในที่นี้คุณสามารถดึงข้อมูลจาก API หรือที่เก็บข้อมูลอื่น ๆ แล้วกำหนดให้กับ dataSource
    });

    return {
      dataLoad,
      columns,
      selectedOption,
      options,
    };
  },

  mounted() {
    this.getRoomLab();
  },
  methods: {
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
      });
      const formattedDate = `${dayName} ${dateObject.getDate()}/${
        dateObject.getMonth() + 1
      }/${dateObject.getFullYear()} (${timeString} น.)`;
      return formattedDate;
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
          return "รออนุมัติ";
        case 1:
          return "อนุมัติแล้ว";
        case 2:
          return "ไม่อนุมัติ";
        default:
          return "";
      }
    },

    async getRoomLab() {
      const data = await apiRoomLab.getBookingLab();
      //   console.log(this.formatdate(time[0].start_date))

      data.forEach((obj) => {
        obj.start_date = this.formatdate(obj.start_date);
        obj.endtime = this.formatdate(obj.endtime);
        obj.timebook = this.formatdate(obj.timebook);
      });
      this.dataLoad = data;
      //console.log(data);
    },

    selectStatus() {
      this.changeStatus = true,
      console.log("change status");
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
  