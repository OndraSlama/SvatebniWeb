import { createApp } from 'troisjs'
import App from './App.vue'
import router from './router'
import { loadFonts } from './plugins/webfontloader'
import './assets/tailwind.css'

loadFonts()

const app = createApp(App)
  .use(router)
  .mount('#app')
