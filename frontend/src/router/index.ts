import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import {loggedIn} from "@/composables/auth";
import {Api} from "@/api/axios";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'login',
        meta: {title: "SF6XMP | ログイン", requiresAuth: false},
        component: () => import('../views/LoginView.vue'),
    },
    {
        path: '/',
        component: () => import('../views/TopPage.vue'),
        meta: {title: "SF6XMP", requiresAuth: false},
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
    history: createWebHistory(),
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
    // デフォルトタイトル
    const defaultTitle = import.meta.env.VITE_APP_TITLE || 'アプリケーション'

    // ルートのmetaからタイトルを取得、なければデフォルト
    const title = to.meta.title as string || defaultTitle
    console.log(to, to.meta)
    document.title = title
})
export default router
