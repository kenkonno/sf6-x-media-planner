/*
 * =================================================================
 * ファイル: src/composables/useArticleEditor.ts (新規作成)
 * =================================================================
 * 記事エディタの状態管理とロジックを担当するComposableです。
 */
import {ref, reactive, readonly} from 'vue';
import type {ArticleForm, Character} from '../types';

// --- モックデータ ---
const mockCharacters: Character[] = [
    {id: 1, name: 'リュウ', slug: 'ryu'},
    {id: 2, name: 'ルーク', slug: 'luke'},
    {id: 6, name: 'JP', slug: 'jp'},
];

// --- モックデータ終 ---

export function useArticleEditor(articleId?: string) {
    // 記事のフォームデータ
    const articleForm = reactive<ArticleForm>({
        title: '',
        characterId: null,
        tags: [],
        body: '',
    });

    const characters = ref<Character[]>([]);
    const loading = ref(false);
    const saving = ref(false);

    // ページ初期化時にキャラクターリストを取得したり、
    // 編集の場合は既存の記事データを取得したりする
    const initialize = async () => {
        loading.value = true;
        // キャラクターリストを取得
        characters.value = mockCharacters;

        if (articleId) {
            // 編集モードの場合、APIから記事データを取得してフォームにセットする
            console.log(`記事ID: ${articleId} のデータを取得します...`);
            await new Promise(resolve => setTimeout(resolve, 500));
            articleForm.title = 'リュウの基本コンボまとめ';
            articleForm.characterId = 1; // リュウのID
            articleForm.tags = ['コンボ', '確定反撃'];
            articleForm.body = '## ドライブインパクト後の基本\n\nここから解説が始まります...';
        } else {
            // 新規作成モード
            console.log("新規記事作成モード");
        }
        loading.value = false;
    };

    const saveAsDraft = async () => {
        saving.value = true;
        console.log('下書きとして保存:', JSON.parse(JSON.stringify(articleForm)));
        await new Promise(resolve => setTimeout(resolve, 1000));
        saving.value = false;
        alert('下書きを保存しました！');
    };

    const publish = async () => {
        saving.value = true;
        console.log('公開:', JSON.parse(JSON.stringify(articleForm)));
        await new Promise(resolve => setTimeout(resolve, 1000));
        saving.value = false;
        alert('記事を公開しました！');
    };

    return {
        articleForm,
        characters: readonly(characters),
        loading: readonly(loading),
        saving: readonly(saving),
        initialize,
        saveAsDraft,
        publish,
    };
}