import { createWebHistory, createRouter } from "vue-router";
import { useStore } from "./store.ts";

/**
 * naming conventions:
 *   - for a dashboard aka list view write /<modelName in plural>
 *   - detail view: /<modelName in plural>/:id
 *   - for a "add new" view: /<modelName in plural>/add
 */

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
    {
        path: "/questions/:id",
        name: "question-detail",
        component: () => import("./views/CompetencyQuestionDetailView.vue"),
        props: true
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


// TODO check for token validity
//  if invalid, show a popup and ask the user to login again.
router.beforeEach((_to, _from, next) => {
    const useStore1 = useStore()
    const publicPages = ['/', '/login'];
    
    if (!useStore1.isLoggedIn && !publicPages.includes(_to.path)) {
        next('/login');
    }
    next();
});

export default router;