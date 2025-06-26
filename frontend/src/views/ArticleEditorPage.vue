<template>
  <div v-if="loading" class="text-center py-20">エディタを準備中...</div>
  <div v-else class="space-y-8">
    <header>
      <h1 class="text-3xl font-bold text-white">記事を作成・編集する</h1>
    </header>

    <div class="bg-gray-800/50 rounded-lg p-6 space-y-6">
      <!-- メタ情報入力エリア -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="article-title" class="block text-sm font-medium text-gray-300">記事タイトル</label>
          <input type="text" id="article-title" v-model="articleForm.title"
                 class="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                 placeholder="例：リュウの基本コンボまとめ">
        </div>
        <div>
          <label for="character" class="block text-sm font-medium text-gray-300">対象キャラクター</label>
          <select id="character" v-model="articleForm.characterId"
                  class="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
            <option :value="null">キャラクターを選択</option>
            <option value="general">全般</option>
            <option v-for="char in characters" :key="char.id" :value="char.id">{{ char.name }}</option>
          </select>
        </div>
      </div>
      <div>
        <label for="tags-input" class="block text-sm font-medium text-gray-300">タグ</label>
        <TagInput v-model="articleForm.tags" class="mt-1"/>
      </div>

      <!-- エディタエリア -->
      <div>
        <label for="editor" class="block text-sm font-medium text-gray-300">記事本文</label>
        <div class="mt-1 bg-gray-900 border border-gray-600 rounded-lg">
          <!-- ツールバー -->
          <div class="p-2 border-b border-gray-700 flex items-center space-x-2">
            <button class="p-1.5 rounded text-gray-400 hover:bg-gray-700 hover:text-white" title="Bold">
              <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                      d="M10 3a.75.75 0 01.75.75v.5a2 2 0 004 0 .75.75 0 011.5 0 3.5 3.5 0 01-7 0A.75.75 0 0110 3zM3.05 6.4a.75.75 0 010 1.06l4.25 4.25a.75.75 0 01-1.06 1.06L2 8.53V14.5a.75.75 0 01-1.5 0v-7a.75.75 0 01.75-.75h7a.75.75 0 010 1.5H3.53l4.22 4.22a.75.75 0 11-1.06 1.06l-4-4.001a.75.75 0 010-1.06z"
                      clip-rule="evenodd"/>
              </svg>
            </button>
            <button class="p-1.5 rounded text-gray-400 hover:bg-gray-700 hover:text-white" title="Italic">
              <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                      d="M10 5a.75.75 0 01.634 1.162l-3.5 7a.75.75 0 11-1.268-.624l3.5-7A.75.75 0 0110 5zm3.5 7a.75.75 0 00-1.268-.624l-3.5 7a.75.75 0 001.268.624l3.5-7z"
                      clip-rule="evenodd"/>
              </svg>
            </button>
            <button class="p-1.5 rounded text-gray-400 hover:bg-gray-700 hover:text-white" title="Link">
              <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path
                    d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.665l3-3z"/>
                <path
                    d="M8.603 16.603a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 005.656 5.656l3-3a4 4 0 00-.225-5.865.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.665l-3 3z"/>
              </svg>
            </button>
            <div class="border-l border-gray-700 h-5 mx-2"></div>
            <button class="p-1.5 rounded text-blue-400 hover:bg-gray-700 hover:text-white flex items-center text-sm">
              <svg class="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path
                    d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"/>
              </svg>
              レシピを引用・追加
            </button>
          </div>
          <!-- テキストエリア -->
          <textarea id="editor" rows="15" v-model="articleForm.body"
                    class="block w-full bg-gray-900 border-0 p-4 text-gray-200 focus:ring-0 resize-y"
                    placeholder="ここに記事の内容をMarkdown形式で記述します..."></textarea>
        </div>
      </div>
    </div>

    <!-- アクションボタン -->
    <div class="flex justify-end gap-4 mt-8">
      <button @click="saveAsDraft" :disabled="saving"
              class="border border-gray-600 text-sm font-medium py-2 px-5 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50">
        {{ saving ? '保存中...' : '下書き保存' }}
      </button>
      <button @click="publish" :disabled="saving"
              class="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
        {{ saving ? '公開中...' : '公開する' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted} from 'vue';
import {useArticleEditor} from '../composables/useArticleEditor';
import TagInput from '../components/TagInput.vue';

// ページのpropsとしてarticleIdを受け取る想定 (例: /articles/edit/some-id)
const props = defineProps<{
  articleId?: string;
}>();

const {
  articleForm,
  characters,
  loading,
  saving,
  initialize,
  saveAsDraft,
  publish
} = useArticleEditor(props.articleId);

onMounted(() => {
  initialize();
});
</script>