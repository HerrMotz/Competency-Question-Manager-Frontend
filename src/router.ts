import { createWebHistory, createRouter } from "vue-router";
import { useStore } from "./store.ts";

const routes =  [
    {
        path: "/",
        name: "landing-page",
        component: () => import("./views/LandingView.vue")
    },
    {
        path: "/login",
        name: "login",
        component: () => import("./views/LoginView.vue")
    },
    {
        path: "/questions",
        name: "questions",
        component: () => import("./views/CompentencyQuestionDashboardView.vue")
    },
    {
        path: "/team",
        name: "team",
        component: () => import("./views/TeamDashboardView.vue")
    },
    {
        path: "/projects",
        name: "projects",
        component: () => import("./views/ProjectsDashboardView.vue")
    },
    {
        path: "/reports",
        name: "reports",
        component: () => import("./views/ReportsDashboardView.vue")
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((_to, _from, next) => {
    const useStore1 = useStore()
    const publicPages = ['/', '/login'];
    
    if (!useStore1.isLoggedIn && !publicPages.includes(_to.path)) {
        next('/login');
    }
    next();
});

export default router;