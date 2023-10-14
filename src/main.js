import './assets/main.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@fortawesome/fontawesome-free/js/all'
import '../node_modules/bootstrap/dist/js/bootstrap'
import print from 'vue3-print-nb'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import Paperizer from 'paperizer'


const app = createApp(App)

app.use(Paperizer)
app.use(VueSweetalert2)
app.use(print)
app.use(router)

app.mount('#app')
