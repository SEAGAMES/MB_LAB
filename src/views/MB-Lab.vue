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
                  :rules="floorRules"
                  label="โซน"
                  required
                  outlined
                  dense
                  :items="['A', 'B', 'C', 'D']"
                  variant="outlined"
                ></v-select></div
            ></v-col>
            <v-col>
              <div>
                <v-select
                  :rules="floorRules"
                  label="ชั้น"
                  outlined
                  dense
                  :items="['1', '2', '3', '4']"
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
                  :items="['101', '102', '103', '104']"
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
            <v-col><v-text-field dense></v-text-field></v-col>
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
  }),

  mounted() {
    this.getRoomLab();
    //this.ceateBookLabRoom();
  },

  methods: {
    async validate() {
      this.$refs.form.validate();
      //console.log(this.$refs.form.validate());
    },

    async ceateBookLabRoom() {
      await apiRoomLab.createBookLabRoom(this.objTest);
    },

    async getRoomLab() {
      this.form.lab_room = await apiRoomLab.getRoomLab();

      let dataForUse = this.convertData_From_Proxy(this.form.lab_room)
      this.form.lab_room2 = dataForUse

      console.log('this.form.lab_room2 ' , this.form.lab_room)
      //console.log(JSON.parse(JSON.stringify(this.form.lab_room)));
      //console.log(typeof(this.form.lab_room))
    },

    convertData_From_Proxy(data) {
      const proxy1 = new Proxy(data, {});
      //console.log(proxy1);
      //console.log({ ...proxy1 });
        let result_data = JSON.parse(JSON.stringify(proxy1))
        return result_data
    }
  },
};
</script>
