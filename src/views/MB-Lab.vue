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
import apiRoomLab from "../services/apiRoomLab"

export default {
  data: () => ({
    form: {
      rent_name: "ธนกฤต นิ่มนวล",
      telNo: "",
      lab_room: []
    },
    telNoRules: [
      (v) => !!v || "กรุณาใส่เบอร์โทรศัพท์",
      //(v) => v >= 9 || "Height is more than 1",
    ],
    floorRules: [
      (v) => !!v || "กรุณาระบุห้องให้ชัดเจน",
      //(v) => v >= 9 || "Height is more than 1",
    ],
  }),

  mounted() {
    this.getRoomLab();
  },

  methods: {
    async validate() {
      this.$refs.form.validate();
      //console.log(this.$refs.form.validate());
    },

    async getRoomLab() {
      this.form.lab_room = await apiRoomLab.getRoomLab()
      console.log(this.form.lab_room[0].id)
      console.log(typeof(this.form.lab_room))
    }

    // async getRoomLab() {
    //   axios
    //     .get("http://10.20.5.205:9200/mb_lab_room")
    //     .then((res) => {
    //       this.lab_room = res.data;
    //       //console.log('lab_room ' , res.data)
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
  },
};
</script>
