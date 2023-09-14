/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// import ant
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';


// Composables
import { createApp } from 'vue'


// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)

registerPlugins(app)

app.use(Antd).mount('#app')
