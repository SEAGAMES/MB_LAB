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

// Plugins
import { registerPlugins } from '@/plugins'

import store from './store';


const app = createApp(App)

registerPlugins(app)

app.use(Antd).use(store).mount('#app')


