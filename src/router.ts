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
        path: "/questions/add",
        name: "questions-add",
        component: () => import("./views/CompetencyQuestionCreateView.vue")
    },
    {
        path: "/consolidation/",
        name: "consolidation",
        component: () => import("./views/ConsolidationDashboardView.vue")
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
    {   path: "/projects/add",
        name: "projects-add",
        component: () => import("./views/ProjectCreateView.vue")
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
    },
    {
        path: "/groups",
        name: "groups",
        component: () => import("./views/GroupsDashboardView.vue")
    },
    {
        path: "/groups/add",
        name: "groups-add",
        component: () => import("./views/GroupCreateView.vue")
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