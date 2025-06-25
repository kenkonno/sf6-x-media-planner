<template>
  <div v-if="loading" class="text-center py-10">
    <p>読み込み中...</p>
  </div>
  <div v-else-if="error" class="text-center py-10 text-red-500">
    <p>記事の読み込みに失敗しました。</p>
  </div>
  <div v-else-if="article" class="space-y-8">
    <!-- 記事ヘッダー -->
    <section>
      <div class="flex items-center space-x-2 mb-3">
        <img class="h-10 w-10 rounded-full" :src="article.character.iconUrl" :alt="article.character.name">
        <span class="text-xl font-bold text-gray-300">{{ article.character.name }}</span>
      </div>
      <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
        {{ article.title }}
      </h2>
      <div class="mt-4 flex items-center justify-between">
        <!-- 作者情報 -->
        <div class="flex items-center">
          <img class="h-10 w-10 rounded-full" :src="article.author.avatarUrl" alt="User Avatar">
          <div class="ml-3">
            <p class="text-base font-semibold text-white">{{ article.author.name }}</p>
            <p class="text-sm text-gray-400">{{ article.publishedAt }} 公開</p>
          </div>
        </div>
        <!-- PV & いいね -->
        <div class="flex items-center space-x-3 text-sm">
          <div class="flex items-center text-gray-400">
            <svg class="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
            <span>{{ article.stats.pv }}</span>
          </div>
          <div class="flex items-center text-gray-400">
            <svg class="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
            <span>{{ article.stats.likes }}</span>
          </div>
        </div>
      </div>
      <!-- タグ -->
      <div class="mt-4 flex flex-wrap gap-2">
        <span v-for="tag in article.tags" :key="tag"
              class="bg-gray-700 text-blue-400 text-xs font-semibold px-2.5 py-1 rounded-full">{{ tag }}</span>
      </div>
    </section>

    <!-- 記事本文 -->
    <article class="prose prose-invert prose-lg max-w-none text-gray-300">
      <div v-html="article.body"></div>

      <!-- レシピのループ表示 -->
      <div v-for="recipe in article.recipes" :key="recipe.id">
        <RecipeCard :recipe="recipe"/>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import {onMounted} from 'vue';
import {useArticle} from '../composables/useArticle';
import RecipeCard from './RecipeCard.vue';

// Composableを呼び出し
const {article, loading, error, fetchArticle} = useArticle('article-01');

// コンポーネントがマウントされた時にデータを取得
onMounted(() => {
  fetchArticle();
});
</script>