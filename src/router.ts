import { createWebHistory, createRouter } from "vue-router";

const routes =  [
    {
        path: "/",
        name: "landing-page",
        component: () => import("./views/LandingView.vue")
    },
    {
        path: "/cq/",
        name: "cq",
        component: () => import("./views/CompentencyQuestionOverviewView.vue")
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