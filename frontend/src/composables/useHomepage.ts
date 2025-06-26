/*
 * =================================================================
 * ファイル: src/composables/useHomepage.ts (新規作成)
 * =================================================================
 * TOPページの表示に必要なデータを取得・管理するComposableです。
 */
import {ref, readonly} from 'vue';
import type {TimelineItem, FeaturedItem, Character, NewsItem} from '../types';

// --- モックデータ ---
const mockTimelineItems: TimelineItem[] = [
    {
        id: 'tl01',
        author: {name: 'AuthorA', avatarUrl: 'https://placehold.co/32x32/a855f7/FFFFFF?text=A'},
        actionText: 'さんが新しい記事を投稿しました',
        postType: 'article',
        title: 'モダンJPの立ち回りと思考',
        description: '序盤の牽制から、ODアムネジアの使いどころまでを解説します。',
        createdAt: '2分前'
    },
    {
        id: 'tl02',
        author: {name: 'CuratorB', avatarUrl: 'https://placehold.co/32x32/f97316/FFFFFF?text=B'},
        actionText: 'さんが新しい攻略ページを作成しました',
        postType: 'strategy_page',
        title: '全キャラ共通：バーンアウト対策まとめ',
        description: '各トッププレイヤーの記事から、バーンアウト中の重要な立ち回り記事を集めました。',
        createdAt: '15分前'
    },
    {
        id: 'tl03',
        author: {name: 'ExampleUser', avatarUrl: 'https://placehold.co/32x32/3b82f6/FFFFFF?text=U'},
        actionText: 'さんが新しい記事を投稿しました',
        postType: 'article',
        title: 'リュウの基本：ドライブインパクト後の最大ダメージコンボまとめ',
        description: 'ドライブインパクトがヒットした後の基本的な高火力コンボをまとめました。',
        createdAt: '1時間前'
    },
];

const mockPopularArticles: FeaturedItem[] = [
    {
        id: 'art01',
        rank: 1,
        title: 'リュウの基本：ドライブインパクト後の最大ダメージコンボまとめ',
        authorName: 'ExampleUser'
    },
    {id: 'art02', rank: 2, title: 'モダンJPの立ち回りと思考', authorName: 'AuthorA'},
];
const mockPopularRecipes: FeaturedItem[] = [
    {id: 'rec01', rank: 1, title: 'DI > 強P > OD波動 > 真・昇龍拳', authorName: 'ExampleUser', characterName: 'リュウ'},
];

const mockCharacters: Character[] = [
    {id: 1, name: 'RYU', slug: 'ryu', iconUrl: 'https://placehold.co/64x64/f97316/FFFFFF?text=RYU'},
    {id: 2, name: 'LUKE', slug: 'luke', iconUrl: 'https://placehold.co/64x64/3b82f6/FFFFFF?text=LUK'},
    {id: 3, name: 'JAMIE', slug: 'jamie', iconUrl: 'https://placehold.co/64x64/10b981/FFFFFF?text=JAM'},
    {id: 4, name: 'KEN', slug: 'ken', iconUrl: 'https://placehold.co/64x64/ef4444/FFFFFF?text=KEN'},
    {id: 5, name: 'CHUN-LI', slug: 'chun-li', iconUrl: 'https://placehold.co/64x64/facc15/FFFFFF?text=CHU'},
    {id: 6, name: 'JP', slug: 'jp', iconUrl: 'https://placehold.co/64x64/a855f7/FFFFFF?text=JP'},
];

const mockNews: NewsItem[] = [
    {id: 'n01', date: '06/25', title: 'サイトをオープンしました！'},
    {id: 'n02', date: '06/20', title: 'メンテナンスのお知らせ'},
];

// --- モックデータ終 ---

export function useHomepage() {
    const timelineItems = ref<TimelineItem[]>([]);
    const popularArticles = ref<FeaturedItem[]>([]);
    const popularRecipes = ref<FeaturedItem[]>([]);
    const characters = ref<Character[]>([]);
    const news = ref<NewsItem[]>([]);
    const loading = ref(false);

    const fetchData = async () => {
        loading.value = true;
        await new Promise(resolve => setTimeout(resolve, 500)); // API通信をシミュレート
        timelineItems.value = mockTimelineItems;
        popularArticles.value = mockPopularArticles;
        popularRecipes.value = mockPopularRecipes;
        characters.value = mockCharacters;
        news.value = mockNews;
        loading.value = false;
    };

    return {timelineItems, popularArticles, popularRecipes, characters, news, loading, fetchData};
}