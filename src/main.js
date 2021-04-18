import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'

import router from './router'
import TeamMember from './components/TeamMember'
import RegisterForm from './components/RegisterForm'
const app = createApp(App)
app.component('register-form', RegisterForm)
app.component('team-member', TeamMember)
app.use(router).mount('#app')