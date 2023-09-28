<template>
  <v-container class="fontSarabun">
    <v-row>
      <v-spacer></v-spacer>
      <h1 class="text-bold mt-3">ระบบจองห้อง Lab</h1>
      <v-spacer></v-spacer>
    </v-row>

    <!-- v-card input data -->
    <v-form ref="form" lazy-validation>
      <v-card class="mx-auto my-7" width="900" height="400">
        <v-card-text>
          <v-row class="fontSize18"
            ><v-col>
              <div align="center" class="mt-3">
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
          <v-row>
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
                ></v-select></div
            ></v-col>
          </v-row>
          <v-row class="fontSize18 mt-2">
            <v-col>
              <div>
                <p>ช่วงเวลาที่ต้องการจอง :</p>
              </div></v-col
            ><v-col class="mt-n2"
              ><a-range-picker
                v-model:value="dateSelect"
                :rules="dateRules"
                show-time
                required
            /></v-col>
          </v-row>
          <v-row>
            <v-btn
              @click="validate()"
              class="mt-11"
              color="green"
              append-icon="mdi-check-circle"
              block
              >Block Button</v-btn
            >
          </v-row>
        </v-card-text>
      </v-card>
    </v-form>

    <div class="iframe-container">
      <iframe
        src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Asia%2FBangkok&showTitle=0&src=OTMxZGJmZjYwYjExMjc1NThiODU2ZWU2Y2JhZTg3N2U0ZDI2MTRkODJkN2M1MWE5YzIxN2ExNmIwNGJkNGVkNkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=YzA1ZGY3Y2U5YWNhMGFlNWY1YTc0MmE2NzY2NTdjMWU0N2U4MzdkOTY4YTg2NmU3ZWQ2NjdlNzU2MzRhY2IzNkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=OTA5Yjk5NzUwOGY1MDcxYTFiM2JiMDg2ODJkZmYzM2FjNDgwODFiOTAzY2M4NzhkZjI2YTU3YzcwNTc4YmI4YUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZmE3MzFhZjZmZDM0N2Y5NTE4MzY0NmNhNTZjMjQ0ZTU2MmNiZmE5OWM4ZGRmOTIxYjZkMWUyNDM0NDVlY2E5YUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=YmZkMTg1OWM5Mzg0MTJkM2Y0YjJlOGVmZjVmZDRjYzQ5NzQwNDc5ZmRjZGQwOWU5YWE3NzMwZjhiNDgwMmU5NUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=NjJmMjIxOGFjMDczZjFjNzU4NmE3YjdjZDgwZmQ4NWQwMDZhMjZiOWIxMjYyMzdkNGEzMTI1NmViNWQwODI2OUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZTFhYzVkNTIyNWI0ZWZjMTYzNTI0ZWU1NzM2NmQyYmI5YWU1MWQ1OGYwYjI0NWUyZDA2YmUwMGY1ZTYxNWM3M0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZDJmNTQ3MGEzZGMwMjI3Yzk4N2Y2ZWY2YjhkODYwNDRmN2I0YTk0NjdkOTNiZWNmNGY0OGQ5NWYxN2M4ZWJkNUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=MjAzMTQ5Yzk2OWNhOTdhNTRjYTI1OWJjMGY0NTE5YmYyNjc1ZTRlZWE4MDkzZWQ2ZjIwNzBmNTUxZmY1MzZjYUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=MGZlZjU1NWQxZThkZjA5YjIzODcxZmYzZTJiNmIxODQ5NTQyNDNmNmI2NWQyOGMwMTMxNzMwMGUwNDc5M2E5NkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=NmMzOTZmNzRlOGMwNmZiNjZjMDE5ZjFiZmU0NWIyNjYxMmRkMzhiNzY1ZjgxYWJhMDRhZTBiYTNjMGNjYjY2M0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=YjY5NTBlOTA4MGZiZTU3MmVkOTY4YzhkZjdjYjY4OWQwZjY4NDRiMzkxNjFmZTAxYTZmZDYxYzBiMTZkNGNlOEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ODgzMjM4M2Q2ODQ0ZjY2YjBiMjM0NGY1MTUxYWYzZTk1YTlhNWI5ZWM0YjY0YWY3YjI5ZTlhMDAwN2UzYTAzZkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=YThiN2E2ZTJhNmVlMWNiYmE0N2MyYWU0NDIxOTg3YjQ1YTE5MjU3ZmU2N2NhOGFiZDNhODc4MDEwMGM5MzUzYUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=YTA1N2RiZjRkNTg2MjYxMWRiM2IxNGI2NDk4ODZjN2NiNDhhOWFkM2U3ODNlZTllM2VjZjk3NTBkMTdhOGVmY0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=NWU0NjdiYzI3MDQ0YzlhNDk3Y2Q2MzQwZWMyNzAzMmRiNmNhNmUzZWUyMzFmMjJiZmJhNjljM2NmMzVkMjI3M0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ODQxMDBmYTgxMjE5MDZjZjMzNDY1YmQwODg4ZWQzZjFmNWRmMDk1ZGFlMDNiZjlmNjcxODFkYTRlNWEyZDBiMkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZjRhY2M2Yzg3ZDM3OTc4NjNiOWRlMjczY2QwMjdiYzlmOTFjMGI5YTI0NzI3Njk4NjUwZDU2MjkwMTZhNmZjMEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=MTQ4NjJjMzNjYjBmZWVmNzVkNDBhZjAwOTdmNTQ3M2FmMGI2MjIzNWI1YTFlMmJjMTNlODUwZGI2NTQ2MzljN0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=OGRlMTA4YWVhOTYwZmUyYTVkMGFiNDc5ZWY4OWUwYzQ1ZWM0NzkzZmRlMDMxOWM4MTAzMmEwYjY0ZTAyYjdkY0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZTc0NTUyNGUzYWVhNTAxNTEwYjc3ZWFjZTZiYTE4MzJhMzRmZDc3MmY4MTI3MTg0OGI5NzMxMWVkODVjZDkyMkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=YTQwZGViZjA4MzRmN2MwNmFhOTg1YTRhYmNjMWIyZTk0YTIxNmI2NjcyYjg5ZmMzMGZkOTE3NmNjNTRmZTQyNUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=OTgxM2M5MmUyNDExY2EwZTg5MmZiMmE3YTdiOTM4MmJlNGZiNzdmY2Y4YTkxOTNkMmJkMDk2MjM4NTYyYTA1ZUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=dGgudGgjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%234285F4&color=%238E24AA&color=%23F4511E&color=%23D50000&color=%23D50000&color=%237CB342&color=%23C0CA33&color=%238E24AA&color=%233F51B5&color=%23D81B60&color=%233F51B5&color=%23D50000&color=%23B39DDB&color=%23009688&color=%23EF6C00&color=%23EF6C00&color=%23616161&color=%23C0CA33&color=%237CB342&color=%23AD1457&color=%23E4C441&color=%23E4C441&color=%234285F4&color=%230B8043"
        style="border-width: 0"
        width="800"
        height="600"
        frameborder="0"
        scrolling="no"
      ></iframe>
      <iframe
        src="https://calendar.google.com/calendar/embed?height=575&wkst=2&bgcolor=%23ffffff&ctz=Asia%2FBangkok&showTitle=0&showTz=0&mode=WEEK&showTabs=1&src=dC5zZWFnYW1lc0BnbWFpbC5jb20&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZmFtaWx5MTM2OTY1MTU1ODQ1MjYyOTA0ODJAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=dGgudg&color=%237986CB&color=%2333B679&color=%23C0CA33&color=%230B8043"
        frameborder="0"
      ></iframe>
      <iframe
        src="https://calendar.google.com/calendar/embed?height=575&wkst=2&bgcolor=%23ffffff&ctz=Asia%2FBangkok&showTitle=0&showTz=0&mode=WEEK&showTabs=1&src=dC5zZWFnYW1lc0BnbWFpbC5jb20&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZmFtaWx5MTM2OTY1MTU1ODQ1MjYyOTA0ODJAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=dGgudg&color=%237986CB&color=%2333B679&color=%23C0CA33&color=%230B8043"
        frameborder="0"
      ></iframe>
    </div>
  </v-container>
</template>

<script>
// import axios from "axios";
// import { apiUrl } from "../services/getUrl";
import apiRoomLab from "../services/apiRoomLab";

// import moment from 'moment';
// // ตัวอย่างการใช้ Moment.js
// const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
// console.log(currentTime);

export default {
  data: () => ({
    form: {
      rent_name: "ธนกฤต นิ่มนวล",
      telNo: "",
      lab_room: [],
    },
    telNoRules: [(v) => !!v || "กรุณาใส่เบอร์โทรศัพท์"],
    floorRules: [(v) => !!v || "กรุณาระบุข้อมูล"],
    dateRules: [(v) => !!v || "กรุณาระบุวันที่จอง"],

    dataBookLab: {
      ac_name: "thanakrit.nim",
      name: "Thanakrit Nimnual",
      num_in_team: 5,
      phone: "",
      zone: "",
      floor: "",
      where_lab: "",
      start_date: "",
      endtime: "",
      appove_status: "true",
      appove_ac_name: "thanakrit.nim",
      room_code: "",
    },
    googleIframe:
      "https://calendar.google.com/calendar/embed?height=575&wkst=2&bgcolor=%23ffffff&ctz=Asia%2FBangkok&showTitle=0&showTz=0&mode=WEEK&showTabs=1&src=dC5zZWFnYW1lc0BnbWFpbC5jb20&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZmFtaWx5MTM2OTY1MTU1ODQ1MjYyOTA0ODJAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=dGgudg&color=%237986CB&color=%2333B679&color=%23C0CA33&color=%230B8043",
  }),

  mounted() {
    this.getRoomLab();
    //this.ceateBookLabRoom();
  },

  methods: {
    async validate() {
      this.$refs.form
        .validate()
        .then((result) => {
          // เข้าถึงค่า "valid" และเก็บไว้ในตัวแปรใหม่
          const isValid = result.valid;
          if (isValid === true) {
            const dayObject = JSON.parse(JSON.stringify(this.dateSelect));
            this.dataBookLab.start_date = dayObject[0];
            this.dataBookLab.endtime = dayObject[1];
            this.ceateBookLabRoom();

            //   if (isValid === true) {
            //   const dayObject = JSON.parse(JSON.stringify(this.dateSelect));

            //   // แปลงข้อมูล start_date และ endtime เป็นวัตถุ Date
            //   const startDate = new Date(dayObject[0]);
            //   const endDate = new Date(dayObject[1]);

            //   console.log('1 : ', startDate , endDate )

            //   this.dataBookLab.start_date = startDate;
            //   this.dataBookLab.endtime = endDate;
            //   this.ceateBookLabRoom();
            //   // this.ceateBookLabRoom();
            // }
          }
          //console.log("IsValid:", isValid);
        })
        .catch((error) => {
          // จัดการข้อผิดพลาดที่อาจเกิดขึ้นในระหว่างการทำ Promise
          console.error(error);
        });
      //console.log(this.$refs.form.validate());
    },

    async ceateBookLabRoom() {
      await apiRoomLab.createBookLabRoom(this.dataBookLab);
    },

    async getRoomLab() {
      this.form.lab_room = await apiRoomLab.getRoomLab();

      console.log("this.form.lab_room ", this.form.lab_room);
      //console.log(JSON.parse(JSON.stringify(this.form.lab_room)));
      //console.log(typeof(this.form.lab_room))
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
        //console.log(element.room_no);
        room.push(element.room_no);
        this.dataBookLab.room_code = element.room_code;
      });
      return room;
    },
  },
};
</script>

<style>
.background-image {
  background-image: url("../assets//background/mb-building.jpg");
  /* ปรับแต่ง properties อื่นๆ ตามความต้องการ */
  background-size: cover;
  background-position: center;
  height: 300px; /* ปรับความสูงตามความต้องการ */
}
.iframe-container {
  display: flex;
  flex-wrap: nowrap; /* ป้องกันการขึ้นบันไดในกรณีที่ความกว้างเกินขอบเขตของ container */
  overflow-x: auto; /* เพื่อสามารถเลื่อนตามเนื้อหา */
  gap: 10px; /* ระยะห่างระหว่าง iframe */
}

.iframe-container iframe {
  border: none;
  width: 100%; /* กำหนดความกว้างของ iframe เป็น 100% ของ container */
  height: 575px;
}
</style>
