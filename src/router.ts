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
        path: "/questions/add",
        name: "questions-add",
        component: () => import("./views/CompetencyQuestionCreateView.vue")
    },
    {
        path: "/consolidations/",
        name: "consolidations",
        component: () => import("./views/ConsolidationDashboardView.vue")
    },
    {
        path: "/consolidations/:projectid/:id",
        name: "consolidation",
        component: () => import("./views/ConsolidationDetailView.vue"),
        props: true
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
        path: "/questions/:groupid/:id",
        name: "question-detail",
        component: () => import("./views/CompetencyQuestionDetailView.vue"),
        props: true
    },
    {
        path: "/consolidations/add",
        name: "consolidations-add",
        component: () => import("./views/ConsolidationCreateView.vue")
    },
    {
        path: "/groups/",
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

// TODO construct URLs so, that the project
//  is part of the URL ->
//  - this allows the user to send links to a specific project
//  - every tab should be able to edit a different project
router.beforeEach((_to, _from, next) => {
    const useStore1 = useStore()
    const publicPages = ['/', '/login'];
    
    if (!useStore1.isLoggedIn && !publicPages.includes(_to.path)) {
        next('/login');
    }
    next();
});

export default router;