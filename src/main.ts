import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router'
import { i18n } from './plugins/i18n'
import Toast from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'animate.css'
import './style.css'
import './theme-sidebar.css'
import { initTheme, ensureThemeOverrideLast } from './config/themes'

initTheme()

const app = createApp(App)
app.use(i18n)
setupRouter(app)
app.use(Toast, {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
})
app.mount('#app')
ensureThemeOverrideLast()
