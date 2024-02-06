<template>
  <v-app>
    <v-main>
      <!-- {{ this.$store.getters.language }} -->
      <div>
        <v-toolbar color="blue-grey-lighten-4" dark>
          <div class="col-4 col-sm-2 col-md-3 col-lg-2">
            <a href="https://mb.mahidol.ac.th/app/#/">
              <v-img
                src="./assets/mbmu.png"
                max-width="200"
                alt="Icon"
                class="mt-n3"
              ></v-img>
            </a>
          </div>

          <div class="ml-auto p-2 pb-6">
            <a-switch
              v-model:checked="form.language"
              @change="memoryLanguage"
              checked-children="ENG"
              un-checked-children="TH"
            />
          </div>
        </v-toolbar>
        <router-view />
        <LanguagePageVue />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import LanguagePageVue from "./components/LanguagePage.vue";

export default {
  components: {
    LanguagePageVue,
  },
  data() {
    return {
      form: {
        language: false,
      },
      languageForShow: {
        nameBooking: "",
        nameApprove: "",
        booker: "",
        zone: "",
        floor: "",
        room: "",
        dateTimeBooking: "",
        sentForm: "",

        headerTable: {
          name: "",
          tel: "",
          room: "",
          sentTime: "",
          startTime: "",
          endTime: "",
          status: "",
        },

        ruleAlet: {
          telNoRules: "",
          requiredField: "",
        },

        labelSelect: {
          customZone: "",
          customFloor: "",
          customRoom: "",
        },

        days: [],

        status: {
          wait: "",
          allow: "",
          not_Allowed: "",
        },

        btn: {
          backPage: "",
        },
      },
    };
  },

  mounted() {
    const dataForm =
      JSON.parse(localStorage.getItem("mb_select_language")) || {};
    this.form = { ...this.form, ...dataForm };

    const language = this.form.language;

    if (localStorage.getItem("mb_select_language") === null) {
      this.memoryLanguage();
    } else {
      this.form.language = localStorage.getItem("mb_select_language");
      if (language === false) {
        this.form.language = false;
        this.$store.dispatch("addLanguage", "TH");
      } else {
        this.form.language = true;
      }
      this.memoryLanguage();
    }
  },

  methods: {
    // สำหรับเปลี่ยนภาษา
    memoryLanguage() {
      // console.log("language : ", this.form.language);
      localStorage.setItem("mb_select_language", JSON.stringify(this.form));
      if (this.form.language === false) {
        (this.languageForShow.nameBooking = "ระบบจองห้องแล็บ"),
        (this.languageForShow.nameApprove = "ระบบอนุมัติห้องแล็บ"),
          (this.languageForShow.booker = "ผู้จอง"),
          (this.languageForShow.zone = "โซน"),
          (this.languageForShow.floor = "ชั้น"),
          (this.languageForShow.room = "ห้อง"),
          (this.languageForShow.dateTimeBooking = "ช่วงเวลาที่ต้องการจอง"),
          (this.languageForShow.sentForm = "ส่งแบบฟอร์ม"),
          (this.languageForShow.approve = "สำหรับอนุมัติ"),
          ///////////////////// headerTable /////////////////////////
          (this.languageForShow.headerTable.name = "ชื่อ-นามสกุล"),
          (this.languageForShow.headerTable.tel = "เบอร์"),
          (this.languageForShow.headerTable.room = "ห้อง"),
          (this.languageForShow.headerTable.sentTime = "เวลาที่กดจอง"),
          (this.languageForShow.headerTable.startTime = "เริ่มใช้เวลา"),
          (this.languageForShow.headerTable.endTime = "ถึง"),
          (this.languageForShow.headerTable.status = "สถานะ");
        /////////////////////// btn approve ///////////////////////////
        (this.languageForShow.status.wait = "รออนุมัติ"),
          (this.languageForShow.status.allow = "อนุมัติเเล้ว"),
          (this.languageForShow.status.not_Allowed = "ไม่อนุมัติ"),
          ///////////////////// ตัวย่อวัน //////////////////////////////
          (this.languageForShow.days = [
            "(อา.)",
            "(จ.)",
            "(อ.)",
            "(พ.)",
            "(พฤ.)",
            "(ศ.)",
            "(ส.)",
          ]);
        ////////////////////////// ปุ่ม ////////////////////////////
        this.languageForShow.btn.backPage = "กลับ";
      } else {
        (this.languageForShow.nameBooking = "Booking Lab"),
        (this.languageForShow.nameApprove = "Approve Lab"),
          (this.languageForShow.booker = "Booker"),
          (this.languageForShow.zone = "Zone"),
          (this.languageForShow.floor = "Floor"),
          (this.languageForShow.room = "Room"),
          (this.languageForShow.dateTimeBooking = "Date Time Booking"),
          (this.languageForShow.sentForm = "Sent Form");
        (this.languageForShow.approve = "Approve"),
          ///////////////////// headerTable /////////////////////////
          (this.languageForShow.headerTable.name = "Name"),
          (this.languageForShow.headerTable.tel = "Tel."),
          (this.languageForShow.headerTable.room = "Room"),
          (this.languageForShow.headerTable.sentTime = "Sent Time"),
          (this.languageForShow.headerTable.startTime = "Start"),
          (this.languageForShow.headerTable.endTime = "End"),
          (this.languageForShow.headerTable.status = "Status");
        /////////////////////// rule alet /////////////////////////
        (this.languageForShow.ruleAlet.telNoRules = "required phone number."),
          (this.languageForShow.ruleAlet.requiredField = "required field."),
          /////////////////////// btn approve ///////////////////////////
          (this.languageForShow.status.wait = "Wait"),
          (this.languageForShow.status.allow = "Allowed"),
          (this.languageForShow.status.not_Allowed = "Not Allowed"),
          ////////////////////////// ตัวย่อวัน ////////////////////////////
          (this.languageForShow.days = [
            "(Sun.)",
            "(Mon.)",
            "(Tue.)",
            "(Wed.)",
            "(Thu.)",
            "(Fri.)",
            "(Sat.)",
          ]);

        ////////////////////////// ปุ่ม ////////////////////////////
        this.languageForShow.btn.backPage = "Back";
      }
      this.$store.dispatch("addFormLanguage", this.languageForShow);
      //console.log(this.$store.getters.formLanguge);
    },
  },
};
</script>

<style>
.v-main {
  background-image: url("./assets/background/mb-building3.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white; /* สีของข้อความ */
}

.v-toolbar {
  height: 50px; /* ปรับความสูงตามที่ต้องการ */
}

@font-face {
  font-family: "Prompt";
  src: url("./assets/Font/Prompt/Prompt-Regular.ttf") format("truetype");
  font-style: normal;
}

@font-face {
  font-family: "Sarabun";
  src: url("./assets/Font/Sarabun/Sarabun-Regular.ttf") format("truetype");
  font-style: normal;
}

.fontSarabun {
  font-family: "Sarabun", sans-serif;
}

.fontSize4 {
  font-size: 4px;
}

.fontSize6 {
  font-size: 6px;
}

.fontSize8 {
  font-size: 8px;
}

.fontSize9 {
  font-size: 9px;
}

.fontSize10 {
  font-size: 10px;
}

.fontSize11 {
  font-size: 11px;
}
.fontSize12 {
  font-size: 12px;
}

.fontSize13 {
  font-size: 13px;
}

.fontSize14 {
  font-size: 14px;
}

.fontSize16 {
  font-size: 16px;
}

.fontSize18 {
  font-size: 18px;
}

.fontSize20 {
  font-size: 20px;
}

.fontSize22 {
  font-size: 22px;
}

.fontSize24 {
  font-size: 24px;
}

.fontSize26 {
  font-size: 26px;
}

.fontSize28 {
  font-size: 28px;
}

.fontSize30 {
  font-size: 30px;
}
</style>
