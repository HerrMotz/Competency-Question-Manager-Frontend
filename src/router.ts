import { createWebHistory, createRouter } from "vue-router";

const routes =  [
    {
        path: "/",
        name: "landing-page",
        component: () => import("./views/LandingView.vue")
    },
    {
        path: "/questions",
        name: "questions",
        component: () => import("./views/CompentencyQuestionOverviewView.vue")
    },
    {
        path: "/team",
        name: "team",
        component: () => import("./views/TeamOverviewView.vue")
    },
    {
        path: "/projects",
        name: "projects",
        component: () => import("./views/ProjectsOverviewView.vue")
    },
    {
        path: "/reports",
        name: "reports",
        component: () => import("./views/ReportsView.vue")
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((_to, _from, next) => {
    // const publicPages = ['/', '/login', '/contact'];
    next();
});

export default router;