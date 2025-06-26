/*
 * =================================================================
 * ファイル: src/composables/useRecipeForm.ts (新規作成)
 * =================================================================
 * レシピ追加フォームの状態管理とロジックを担当するComposableです。
 */
import {ref, reactive, readonly} from 'vue';
import type {RecipeForm, Character} from '../types';

// --- モックデータ ---
const mockCharacters: Character[] = [
    {id: 1, name: 'リュウ', slug: 'ryu'},
    {id: 2, name: 'ルーク', slug: 'luke'},
    {id: 6, name: 'JP', slug: 'jp'},
];

// --- モックデータ終 ---

export function useRecipeForm() {
    // フォームのデータ
    const form = reactive<RecipeForm>({
        characterId: null,
        title: '',
        commands: '',
        damage: null,
        videoUrl: '',
        driveGaugeCost: null,
        driveGaugeGain: null,
        saGaugeCost: null,
        saGaugeGain: null,
        description: '',
        tags: [],
    });

    const characters = ref<Character[]>([]);
    const submitting = ref(false);

    // フォームの初期化（キャラクターリストの取得など）
    const initialize = async () => {
        // APIからキャラクターリストを取得する想定
        await new Promise(resolve => setTimeout(resolve, 100));
        characters.value = mockCharacters;
    };

    // フォームの送信処理
    const submit = async () => {
        submitting.value = true;
        console.log('Submitting recipe form:', JSON.parse(JSON.stringify(form)));
        // ここでAPIにデータをPOSTする
        await new Promise(resolve => setTimeout(resolve, 1000));
        submitting.value = false;
        alert('レシピを登録しました！');
        // ここでフォームをリセットしたり、モーダルを閉じるイベントを発行したりする
        return true;
    };

    return {
        form,
        characters: readonly(characters),
        submitting: readonly(submitting),
        initialize,
        submit,
    };
}