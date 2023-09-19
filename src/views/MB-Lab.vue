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
                show-time
                required
                :rules="floorRules"
            /></v-col>
          </v-row>
          <v-row>
            <v-btn
              @click="validate"
              class="mt-11"
              color="green"
              append-icon="mdi-check-circle"
              block
              >Block Button</v-btn
            >
          </v-row>
        </v-card-text>
      </v-card>
      <v-card><a-calendar /></v-card>
      <div></div>
    </v-form>
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
    telNoRules: [
      (v) => !!v || "กรุณาใส่เบอร์โทรศัพท์",
      //(v) => v >= 9 || "Height is more than 1",
    ],
    floorRules: [
      (v) => !!v || "กรุณาระบุห้องให้ชัดเจน",
      //(v) => v >= 9 || "Height is more than 1",
    ],

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
    },
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
            // this.ceateBookLabRoom();
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
      });
      return room;
    },
  },
};
</script>
