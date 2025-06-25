import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import {loggedIn} from "@/composable/auth";
import {Api} from "@/api/axios";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'login',
        meta: {title: "+MaP | ログイン", requiresAuth: false},
        component: () => import('../views/LoginView.vue'),
    },
    {
        path: '/',
        component: () => import('../views/TopPage.vue'),
        children: [
            // {
            //     path: '/',
            //     name: 'gantt',
            //     meta: {title: "+MaP | 案件ビュー", requiresAuth: true},
            //     component: () => import('../views/GanttFacilityView.vue')
            // },
            // {
            //     path: '/all-view',
            //     name: 'gantt-all-view',
            //     meta: {title: "+MaP | 全体ビュー", requiresAuth: true},
            //     component: () => import('../views/GanttAllView.vue')
            // },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
router.beforeEach(async (to, from, next) => {

    const {user} = await loggedIn()

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (user?.email == "") {
            // ログインしていない場合、ログインページへリダイレクトします
            next({
                path: '/login',
                query: {redirect: to.fullPath},
            });
        } else {
            next();
        }
    } else {
        next();
    }
});
router.afterEach((to) => {
    document.title = to.meta.title as string
})
export default router
