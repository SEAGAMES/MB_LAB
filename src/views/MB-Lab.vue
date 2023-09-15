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
                  v-model="form.telNo"
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
                  v-model="selectRoomLab.zone"
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
                  v-model="selectRoomLab.floor"
                  :rules="floorRules"
                  label="ชั้น"
                  outlined
                  dense
                  :items="['2', '3', '4']"
                  variant="outlined"
                ></v-select></div
            ></v-col>
            <v-col>
              <div>
                <v-select
                  :rules="floorRules"
                  label="ห้อง"
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
            >
          </v-row>
          <v-row>
            <v-btn
              @click="getdataDate()"
              class="mt-11"
              color="green"
              append-icon="mdi-check-circle"
              block
              >Block Button</v-btn
            >
          </v-row>
        </v-card-text>
      </v-card>
      <div></div>
    </v-form>
  </v-container>
</template>

<script>
// import axios from "axios";
// import { apiUrl } from "../services/getUrl";
import apiRoomLab from "../services/apiRoomLab";

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

    selectRoomLab: {
      zone: "",
      floor: ""
    },

    objTest: {
      ac_name: "thanakrit.nim",
      name: "Thanakrit Nimnual",
      num_in_team: 5,
      phone: "062-169xxxx",
      zone: "A",
      floor: "1",
      where_lab: "A103",
      start_date: "2023-01-19 10:00:00",
      endtime: "2023-01-19 11:00:00",
      timebook: "2023-01-19 11:10:27",
      appove_status: "true",
      appove_ac_name: "thanakrit.nim",
    },

    date: "",
    
  }),

  async mounted() {
    this.getRoomLab();
    //this.ceateBookLabRoom();
  },

  methods: {
    async validate() {
      this.$refs.form.validate();
      //console.log(this.$refs.form.validate());
    },

    // async ceateBookLabRoom() {
    //   await apiRoomLab.createBookLabRoom(this.objTest);
    // },

    async getRoomLab() {
      this.form.lab_room = await apiRoomLab.getRoomLab();

    },
  },
  computed: {
    room_list() {
      let room = [];
      let room_filter = this.form.lab_room.filter((row) => {
        return row.zone == this.selectRoomLab.zone && row.floor == this.selectRoomLab.floor;
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
