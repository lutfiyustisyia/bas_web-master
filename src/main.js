import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import myAxios from './plugin/axios'
import VueAxios from 'vue-axios'
import piniapluginpersistedstate from 'pinia-plugin-persistedstate'



const app = createApp(App)

const vuetify = createVuetify({
    components,
    directives,
  })

  //axios

  app.use(VueAxios,myAxios)
  app.provide(`myAxios`, app.config.globalProperties.axios)

  app.use(vuetify)
const pinia = createPinia()
pinia.use(piniapluginpersistedstate)
app.use(pinia)
app.use(router)

app.mount('#app')
