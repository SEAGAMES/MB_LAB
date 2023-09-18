// auth.js
import Vue from 'vue';
import VueGoogleOAuth from 'vue-google-oauth2';

const gauthOption = {
  clientId: '622962772006-1aranhkuu0hn0s1q4l39jj86651gk35r.apps.googleusercontent.com',
  scope: 'https://www.googleapis.com/auth/calendar',
  prompt: 'select_account',
};

Vue.use(VueGoogleOAuth, gauthOption);

export default VueGoogleOAuth;
