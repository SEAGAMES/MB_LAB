<template>
  <v-app>
    <v-main>
      <!-- {{ this.$store.getters.language }} -->
      <div>
        <v-toolbar color="blue-grey-lighten-4" dark>
          <v-row>
            <v-col
              ><a href="https://mb.mahidol.ac.th/app/#/">
                <v-img
                  src="./assets/mbmu.png"
                  alt="Icon"
                  max-height="65"
                  class="mt-n3"
                ></v-img> </a
            ></v-col>
            <v-col cols="7"> </v-col>
            <v-col cols="2" class="mt-2">
              <!-- <v-switch
                v-model="form.language"
                @change="memoryLanguage"
                hide-details
                true-value="ENG"
                false-value="TH"
                color="indigo"
                :label="`${form.language}`"
              ></v-switch> -->
              <a-switch
                v-model:checked="form.language"
                @change="memoryLanguage"
                checked-children="ENG"
                un-checked-children="TH"
              />
            </v-col>
          </v-row>
        </v-toolbar>
      </div>
      <router-view />
      <LanguagePageVue />
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
    };
  },

  mounted() {
    // const dataForm =
    //   JSON.parse(localStorage.getItem("mb_select_language")) || {};
    // console.log(dataForm.language);
    // this.form = { ...this.form, ...dataForm };

    // if (localStorage.getItem("mb_select_language") === null) {
    //   this.memoryLanguage();
    // } else {
    //   this.form.language = localStorage.getItem("mb_select_language");
    //   if (this.form.language === "TH") {
    //     this.form.language = 'TH'
    //     console.log('ดึง TH')
    //   } else {
    //     this.form.language = 'ENG'
    //     console.log('ดึง ENG');
    //   }
    // }

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
        this.$store.dispatch("addLanguage", 'TH')
      } else {
        this.form.language = true;
       // this.$store.dispatch("language", 'ENG')
      }
    }
  },

  methods: {
    memoryLanguage() {
      console.log("language : ", this.form.language);
      localStorage.setItem("mb_select_language", JSON.stringify(this.form));
    },
  },
};
</script>

<style>
.v-main {
  background-image: url('./assets/background/mb-building2.jpg');
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
