/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Composables
import { createApp } from 'vue'
// Components
import App from './App.vue'
// import ant
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

import store from './store'


// Plugins
import { registerPlugins } from '@/plugins'


const app = createApp(App)

registerPlugins(app)

app.use(Antd).use(store).mount('#app')


