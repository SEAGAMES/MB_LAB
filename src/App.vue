<template>
  <v-app>
    <v-main>
      <div>
        <v-toolbar color="blue-grey-lighten-4" dark>
          <v-row>
            <v-col
              ><v-img src="./assets/mbmu.png" alt="Icon" max-height="70"></v-img
            ></v-col>
            <v-col cols="7">
              <v-toolbar-title align="center"></v-toolbar-title>
            </v-col>
            <v-col cols="2">
              <v-switch
                v-model="form.language"
                @change="memoryLanguage"
                hide-details
                true-value="ENG"
                false-value="TH"
                color="indigo"
                :label="`${form.language}`"
              ></v-switch>
            </v-col>
            <!-- <v-col
              ><a-switch
              v-model:checked="form.language"
                checked-children="ENG"
                un-checked-children="TH"
            /></v-col> -->
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
        language: "TH",
      },
    };
  },

  mounted() {
    const dataForm =
      JSON.parse(localStorage.getItem("mb_select_language")) || {};
    console.log(dataForm.language);
    this.form = { ...this.form, ...dataForm };

    if (dataForm.language !== undefined) {
      console.log("ใช่");
    }
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
