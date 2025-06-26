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
        name: 'home',
        meta: {title: "SF6XMP Home", requiresAuth: false},
        component: () => import('../views/HomePage.vue')
    },
    {
        path: '/character-detail',
        name: 'character-detail',
        meta: {title: "SF6XMP Character Detail", requiresAuth: false},
        component: () => import('../views/CharacterDetailPage.vue')
    },
    {
        path: '/search',
        name: 'search',
        meta: {title: "SF6XMP Search", requiresAuth: false},
        component: () => import('../views/SearchPage.vue')
    },
    {
        path: '/my-page',
        name: 'my-page',
        meta: {title: "SF6XMP MyPage", requiresAuth: false},
        component: () => import('../views/MyPage.vue')
    },
    {
        path: '/article-editor',
        name: 'article-editor',
        meta: {title: "SF6XMP ArticleEditor", requiresAuth: false},
        component: () => import('../views/ArticleEditorPage.vue')
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
