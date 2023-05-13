import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { fireApp, fireAuth, fireAnalytics } from "./firebaseConfig";
import App from './App.vue';
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import DashboardPage from "./components/DashboardPage";

const routes = [
    { path: '/', redirect: "/login" },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/dashboard', component: DashboardPage },
]
  
const router = createRouter({
    history: createWebHistory(),
    routes,
})

const app = createApp(App)
app.use(router, fireApp, fireAuth, fireAnalytics).mount('#app')
app.mount('app')
