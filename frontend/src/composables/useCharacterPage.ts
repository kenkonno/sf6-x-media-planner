/*
 * =================================================================
 * ファイル: src/composables/useCharacterPage.ts (ロジックを管理)
 * =================================================================
 */
import {ref, readonly} from 'vue';
import type {Character, ArticleSummary, RecipeSummary, StrategyPageSummary} from '../types';

// --- モックデータ (実際はAPIから非同期で取得) ---
const mockCharacter: Character = {
    id: 1,
    name: 'リュウ',
    slug: 'ryu',
    iconUrl: 'https://placehold.co/96x96/f97316/FFFFFF?text=R',
    imageUrl: 'https://placehold.co/1280x320/1a1a1a/cccccc?text=RYU_BACKGROUND_IMAGE'
};

const mockArticles: ArticleSummary[] = [
    {
        id: 'art01',
        type: 'article',
        title: 'リュウの基本：ドライブインパクト後の最大ダメージコンボまとめ',
        author: {name: 'ExampleUser', avatarUrl: 'https://placehold.co/20x20/3b82f6/FFFFFF?text=U'},
        stats: {likes: 1205, views: 10800},
        description: 'ドライブインパクトがヒットした後の基本的な高火力コンボをまとめました。'
    },
    {
        id: 'art02',
        type: 'article',
        title: 'リュウの起き攻め連携パターン',
        author: {name: 'ProPlayerX', avatarUrl: 'https://placehold.co/20x20/10b981/FFFFFF?text=P'},
        stats: {likes: 980, views: 8500},
        description: '柔道連携から択を迫るセットプレイを解説します。'
    },
];

const mockRecipes: RecipeSummary[] = [
    {
        id: 'rec01',
        type: 'recipe',
        title: 'DI > 強P > OD波動 > 真・昇龍拳',
        author: {name: 'ExampleUser', avatarUrl: 'https://placehold.co/20x20/3b82f6/FFFFFF?text=U'},
        stats: {likes: 412},
        description: 'リーサルに使える高火力コンボ。'
    },
    {
        id: 'rec02',
        type: 'recipe',
        title: '中足 > OD竜巻 > 強昇龍',
        author: {name: 'ComboGod', avatarUrl: 'https://placehold.co/20x20/a855f7/FFFFFF?text=C'},
        stats: {likes: 350},
        description: 'ヒット確認から安定して繋がる基本コンボ。'
    },
];

const mockStrategyPages: StrategyPageSummary[] = [
    {
        id: 'sp01',
        type: 'strategy_page',
        title: '対JP戦 リュウでの立ち回り記事まとめ',
        author: {name: 'CuratorB', avatarUrl: 'https://placehold.co/20x20/ef4444/FFFFFF?text=B'},
        stats: {likes: 550},
        description: 'トッププレイヤーたちのJP戦術を集約した攻略ページです。'
    }
];

// --- モックデータ終 ---

export function useCharacterPage(characterSlug: string) {
    const character = ref<Character | null>(null);
    const articles = ref<ArticleSummary[]>([]);
    const recipes = ref<RecipeSummary[]>([]);
    const strategyPages = ref<StrategyPageSummary[]>([]);
    const loading = ref(false);
    const error = ref<Error | null>(null);

    const fetchData = async () => {
        loading.value = true;
        error.value = null;
        try {
            // API通信をシミュレート
            await new Promise(resolve => setTimeout(resolve, 500));
            character.value = mockCharacter;
            articles.value = mockArticles;
            recipes.value = mockRecipes;
            strategyPages.value = mockStrategyPages;
        } catch (e) {
            error.value = e instanceof Error ? e : new Error('An unknown error occurred');
        } finally {
            loading.value = false;
        }
    };

    return {character, articles, recipes, strategyPages, loading, error, fetchData};
}