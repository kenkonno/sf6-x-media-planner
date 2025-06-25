import "bootstrap/dist/css/bootstrap.min.css"
import 'vue3-toastify/dist/index.css';
import '@vueform/multiselect/themes/default.css'
import 'tippy.js/dist/tippy.css' // optional for styling
import "vue3-colorpicker/style.css";
import 'vue-final-modal/style.css'

import '@kouts/vue-modal/dist/vue-modal.css'


import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import {createVfm} from 'vue-final-modal'

import {dateFormat, dateFormatYMD, unixTimeFormat, progressFormat} from "@/utils/filters";

import dayjs from "dayjs";
import 'dayjs/locale/ja'

// locale & 月曜日始まり対応
dayjs.locale('ja')
dayjs.Ls.ja.weekStart = 1

const vfm = createVfm()
const app = createApp(App)
app.config.globalProperties.$filters = {
    dateFormat: dateFormat,
    dateFormatYMD: dateFormatYMD,
    unixTimeFormat: unixTimeFormat,
    progressFormat: progressFormat
}
app.use(router)
    .use(vfm)
    .mount('#app')

