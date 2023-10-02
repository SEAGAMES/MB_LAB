<template>
  <v-container class="fontSarabun">
    <v-row>
      <v-spacer></v-spacer>
      <h1 class="text-bold mt-3">ระบบอนุมัติห้องแล็บ</h1>
      <v-spacer></v-spacer>
    </v-row>
    <a-table :data-source="dataLoad" class="mt-6">
      <a-table-column title="ชื่อ-นามสกุล">
        <template v-slot:default="{ record }">
          {{ record.name }}
        </template>
      </a-table-column>
      <a-table-column title="เบอร์">
        <template v-slot:default="{ record }">
          {{ record.phone }}
        </template>
      </a-table-column>
      <a-table-column title="จองเวลา">
        <template v-slot:default="{ record }">
          {{ record.timebook }}
        </template>
      </a-table-column>
      <a-table-column title="เริ่มใช้เวลา">
        <template v-slot:default="{ record }">
          {{ record.start_date }}
        </template>
      </a-table-column>

      <a-table-column title="ถึง">
        <template v-slot:default="{ record }">
          {{ record.endtime }}
        </template>
      </a-table-column>

      <a-table-column title="จองเวลา">
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
      </a-table-column>
    </a-table>
  </v-container>
</template>
  
  <script>
import { ref, onMounted } from "vue";
import apiRoomLab from "../services/apiRoomLab";

export default {
  data: () => ({}),

  setup() {
    const dataLoad = ref([]);

    // ใช้ onMounted เพื่อเพิ่มข้อมูลลงในตารางเมื่อคอมโพเนนต์ถูกแสดง
    onMounted(() => {
      // ในที่นี้คุณสามารถดึงข้อมูลจาก API หรือที่เก็บข้อมูลอื่น ๆ แล้วกำหนดให้กับ dataSource
      // ตัวอย่างเพิ่มข้อมูลตั้งต้น
      //dataLoad.value = [];
    });

    return {
      dataLoad,
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

      //console.log(formattedDate); // วันจันทร์ 02/10/2023 (02:00:00 AM)
      return formattedDate;
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
      console.log(data);
    },
  },
};
</script>
  
  <style scoped>
/* ใช้ CSS เพื่อจัด Header อยู่กึ่งกลาง */
.centered {
  text-align: center;
}

.custom-button {
  width: 100px; /* ปรับความกว้างตามต้องการ */
  height: 40px; /* ปรับความสูงตามต้องการ */
}
</style>
  