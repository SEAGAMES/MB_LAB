<template>
  <v-container class="fontSarabun">
    <v-row>
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
      <v-card class="mx-auto my-7" width="900" height="320">
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
          <v-row class="fontSize18">
            <div>
              <p>ช่วงเวลาที่ต้องการจอง :</p>
            </div>
            <div class="mt-n1 ml-2">
              <a-range-picker
                v-model:value="dateSelect"
                :rules="dateRules"
                show-time
                required
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

    <v-card>
      <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
        <v-tab :value="one">ห้องทั้งหมด</v-tab>
        <v-tab :value="two">ห้องหลัก</v-tab>
        <v-tab :value="three">Abstract</v-tab>
      </v-tabs>
      <v-window v-model="tab" class="mt-3">
        <v-window-item value="one"> One </v-window-item>

        <v-window-item value="two">
          <div class="iframe-container">
            <iframe
              src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Asia%2FBangkok&showTabs=0&showCalendars=0&showTz=0&showPrint=0&src=OTMxZGJmZjYwYjExMjc1NThiODU2ZWU2Y2JhZTg3N2U0ZDI2MTRkODJkN2M1MWE5YzIxN2ExNmIwNGJkNGVkNkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%234285F4"
              style="border-width: 0"
              width="800"
              height="600"
              frameborder="0"
              scrolling="no"
            ></iframe>
            <iframe
              src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Asia%2FBangkok&showDate=1&showPrint=0&showTabs=0&showCalendars=0&showTz=0&src=YzA1ZGY3Y2U5YWNhMGFlNWY1YTc0MmE2NzY2NTdjMWU0N2U4MzdkOTY4YTg2NmU3ZWQ2NjdlNzU2MzRhY2IzNkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%238E24AA"
              style="border-width: 0"
              width="800"
              height="600"
              frameborder="0"
              scrolling="no"
            ></iframe>
            <iframe
              src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Asia%2FBangkok&showDate=0&showPrint=0&showTabs=0&showCalendars=0&showTz=0&src=NzI1MjI2ZDZiMDQ0YzYyNzViZjFkNTYyNjAzOWMyNzE3NTljNjgzZDI2NzAyNGYzZjIzYTRiNmM0OGJlYTkwOEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23AD1457"
              style="border-width: 0"
              width="800"
              height="600"
              frameborder="0"
              scrolling="no"
            ></iframe>
          </div>
        </v-window-item>

        <v-window-item value="three"> Three </v-window-item>
      </v-window>
    </v-card>
    
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
import apiRoomLab from "../services/apiRoomLab";

export default {
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
    tab: null,
    loadingBtn: false,
  }),

  mounted() {
    this.tab = "two";
    this.getRoomLab();
    //this.ceateBookLabRoom();
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

    async validate() {
      this.$refs.form
        .validate()
        .then((result) => {
          // เข้าถึงค่า "valid" และเก็บไว้ในตัวแปรใหม่
          const isValid = result.valid;
          if (isValid === true) {
            const dataRoomSelect = JSON.parse(
              JSON.stringify(
                this.form.lab_room.filter((row) => {
                  return row.room_no === this.dataBookLab.where_lab;
                })
              )
            );
            this.dataBookLab.room_code = dataRoomSelect[0].room_code;
            console.log(this.dataBookLab.room_code);

            const dayObject = JSON.parse(JSON.stringify(this.dateSelect));
            this.dataBookLab.start_date = dayObject[0];
            this.dataBookLab.endtime = dayObject[1];
            this.ceateBookLabRoom();
          }
        })
        .catch((error) => {
          // จัดการข้อผิดพลาดที่อาจเกิดขึ้นในระหว่างการทำ Promise
          console.error(error);
        });
      //console.log(this.$refs.form.validate());
    },

    async ceateBookLabRoom() {
      this.loadingBtn = true;
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
};
</script>

<style>
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
