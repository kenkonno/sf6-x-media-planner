<template>
  <div v-if="loading" class="text-center py-20">読み込み中...</div>
  <div v-else-if="error" class="text-center py-20 text-red-500">エラーが発生しました。</div>
  <div v-else-if="character" class="space-y-8">
    <!-- キャラクターヘッダー -->
    <section class="relative rounded-lg overflow-hidden bg-gray-800 p-8 pt-12 md:pt-16 text-center">
      <img :src="character.imageUrl" class="absolute top-0 left-0 w-full h-full object-cover opacity-10" alt="">
      <div class="relative">
        <img :src="character.iconUrl"
             class="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto border-4 border-gray-700 bg-gray-800"
             :alt="character.name">
        <h2 class="mt-4 text-4xl md:text-5xl font-extrabold text-white">{{ character.name }}</h2>
        <div class="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <button
              class="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
            <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"/>
              <path fill-rule="evenodd"
                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                    clip-rule="evenodd"/>
            </svg>
            記事を作成
          </button>
          <button
              class="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
            <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path
                  d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
            </svg>
            攻略を作成
          </button>
          <button
              class="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center">
            <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clip-rule="evenodd"/>
            </svg>
            レシピを追加
          </button>
        </div>
      </div>
    </section>

    <!-- コンテンツエリア -->
    <section>
      <!-- タブ -->
      <div>
        <div class="border-b border-gray-700">
          <nav class="-mb-px flex space-x-8" aria-label="Tabs">
            <button @click="activeTab = 'articles'"
                    class="whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200"
                    :class="[activeTab === 'articles' ? 'border-blue-500 text-white' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500']">
              記事 ({{ articles.length }})
            </button>
            <button @click="activeTab = 'recipes'"
                    class="whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200"
                    :class="[activeTab === 'recipes' ? 'border-blue-500 text-white' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500']">
              レシピ ({{ recipes.length }})
            </button>
            <button @click="activeTab = 'strategy_pages'"
                    class="whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200"
                    :class="[activeTab === 'strategy_pages' ? 'border-blue-500 text-white' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500']">
              攻略ページ ({{ strategyPages.length }})
            </button>
          </nav>
        </div>
      </div>

      <!-- タブコンテンツ -->
      <div class="mt-6">
        <div v-show="activeTab === 'articles'" class="space-y-4">
          <ContentCard v-for="item in articles" :key="item.id" :item="item"/>
        </div>
        <div v-show="activeTab === 'recipes'" class="space-y-4">
          <ContentCard v-for="item in recipes" :key="item.id" :item="item"/>
        </div>
        <div v-show="activeTab === 'strategy_pages'" class="space-y-4">
          <ContentCard v-for="item in strategyPages" :key="item.id" :item="item"/>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useCharacterPage} from '../composables/useCharacterPage';
import ContentCard from '../components/ContentCard.vue';

type Tab = 'articles' | 'recipes' | 'strategy_pages';

const activeTab = ref<Tab>('articles');
const {character, articles, recipes, strategyPages, loading, error, fetchData} = useCharacterPage('ryu');

onMounted(() => {
  fetchData();
});
</script>