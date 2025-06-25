/*
 * =================================================================
 * ファイル: src/composables/useArticle.ts (JSからTSに変更)
 * =================================================================
 * 記事とレシピのデータを取得・管理するロジックをカプセル化した
 * Composable（再利用可能な関数）です。
 */
import {ref, readonly} from 'vue';
import type {Article} from '../types'; // 型定義をインポート

// モックデータ (Article型に準拠)
const mockArticleData: Article = {
    id: 'article-01',
    character: {
        name: 'リュウ',
        iconUrl: 'https://placehold.co/40x40/f97316/FFFFFF?text=R'
    },
    title: 'リュウの基本：ドライブインパクト後の最大ダメージコンボまとめ',
    author: {
        name: 'ExampleUser',
        avatarUrl: 'https://placehold.co/48x48/3b82f6/FFFFFF?text=U'
    },
    publishedAt: '2025年6月26日',
    stats: {
        pv: '10.8k',
        likes: '1.2k'
    },
    tags: ['コンボ', 'ドライブインパクト', '画面中央'],
    body: `
        <p>ドライブインパクトがヒット、または相手がバーンアウト中にガードさせた後は、大きなダメージを取る絶好のチャンスです。このページでは、様々な状況で使えるリュウの基本的な高火力コンボをまとめて紹介します。</p>
        <h3 class="text-white">画面中央 (SAゲージ不使用)</h3>
        <p>まずはゲージを使わない基本形。安定してダメージを稼ぐことができます。ここから様々なコンボに派生させていきましょう。</p>
    `,
    recipes: [
        {
            id: 'recipe-01',
            title: 'DI > 中足 > 竜巻 > 強昇龍',
            damage: 2550,
            driveGauge: -1.0,
            saGaugeCost: 0,
            saGaugeGain: 0.8,
            likes: 235,
            commands: '<span>強P+強K</span> > <span class="key-jp">中足</span> > <span>弱 竜巻旋風脚</span> > <span>強 昇龍拳</span>',
            description: 'ドライブインパクトからの基本コンボ。弱竜巻の後に最速で昇龍拳を出すのがポイントです。',
            videoUrl: 'https://www.youtube.com/watch?v=example'
        },
        {
            id: 'recipe-02',
            title: 'DI > 強P > OD波動 > 真・昇龍拳',
            damage: 5280,
            driveGauge: -3.0,
            saGaugeCost: -3,
            saGaugeGain: 0.5,
            likes: 412,
            commands: '<span>強P+強K</span> > <span class="key-jp">強P</span> > <span>OD 波動拳</span> > <span>SA3 真・昇龍拳</span>',
            description: 'OD波動拳で相手を壁にバウンドさせてからSA3に繋げる高火力コンボ。OD波動の後のSA3入力は少し忙しいので要練習。',
            videoUrl: 'https://www.youtube.com/watch?v=example2'
        }
    ]
};

export function useArticle(articleId: string) {
    const article = ref<Article | null>(null);
    const loading = ref<boolean>(false);
    const error = ref<Error | null>(null);

    const fetchArticle = async () => {
        loading.value = true;
        error.value = null;
        try {
            // ここでaxiosなどを使ってAPIを叩くことを想定
            // const response = await api.get<Article>(`/articles/${articleId}`)
            await new Promise(resolve => setTimeout(resolve, 500)); // API通信をシミュレート
            article.value = mockArticleData;
        } catch (e) {
            error.value = e instanceof Error ? e : new Error('An unknown error occurred');
            console.error('Failed to fetch article:', e);
        } finally {
            loading.value = false;
        }
    };

    return {
        article: readonly(article),
        loading: readonly(loading),
        error: readonly(error),
        fetchArticle
    };
}