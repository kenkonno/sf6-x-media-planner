/*
 * =================================================================
 * ファイル: src/composables/useSearch.ts (新規作成)
 * =================================================================
 * 検索ロジックと結果データを管理するComposableです。
 */
import {ref, reactive, readonly} from 'vue';
import type {ContentSummary, SearchFilters, Character, PaginationInfo} from '../types';

// --- モックデータ ---
const mockCharacters: Character[] = [
    {id: 1, name: 'リュウ', slug: 'ryu'},
    {id: 2, name: 'ルーク', slug: 'luke'},
    {id: 6, name: 'JP', slug: 'jp'},
];

const allMockResults: ContentSummary[] = Array.from({length: 45}, (_, i) => {
    const type = ['article', 'recipe', 'strategy_page'][i % 3] as 'article' | 'recipe' | 'strategy_page';
    return {
        id: `${type}-${i + 1}`,
        type: type,
        title: `サンプル${type === 'article' ? '記事' : type === 'recipe' ? 'レシピ' : '攻略'} ${i + 1}`,
        author: {name: `User${i % 5}`, avatarUrl: `https://placehold.co/20x20/3b82f6/FFFFFF?text=${'U' + (i % 5)}`},
        stats: {
            likes: Math.floor(Math.random() * 1000),
            views: type === 'article' ? Math.floor(Math.random() * 10000) : undefined
        },
        description: `これはサンプル${i + 1}の説明文です。`
    };
});

// --- モックデータ終 ---

export function useSearch() {
    const filters = reactive<SearchFilters>({
        keyword: '',
        types: ['article', 'recipe', 'strategy_page'],
        characterId: 'all',
        tags: [],
    });

    const results = ref<ContentSummary[]>([]);
    const characters = ref<Character[]>([]);
    const pagination = ref<PaginationInfo>({currentPage: 1, totalPages: 4, totalResults: 45});
    const loading = ref(false);

    const search = async (page = 1) => {
        loading.value = true;
        console.log(`Searching page ${page} with filters:`, JSON.parse(JSON.stringify(filters)));
        // ここでfiltersとpageを元にAPIを叩く
        await new Promise(resolve => setTimeout(resolve, 500));

        // ページングをシミュレート
        const itemsPerPage = 12;
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        results.value = allMockResults.slice(startIndex, endIndex);
        pagination.value = {
            currentPage: page,
            totalPages: Math.ceil(allMockResults.length / itemsPerPage),
            totalResults: allMockResults.length,
        };
        loading.value = false;
    };

    const fetchInitialData = async () => {
        characters.value = mockCharacters;
        await search(1);
    };

    return {
        filters,
        results: readonly(results),
        pagination: readonly(pagination),
        characters: readonly(characters),
        loading: readonly(loading),
        search,
        fetchInitialData
    };
}