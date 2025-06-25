<template>
  <div class="bg-gray-800/50 border border-gray-700 rounded-lg shadow-lg my-6 not-prose">
    <div class="p-4">
      <div class="flex justify-between items-start mb-2">
        <h4 class="text-lg font-bold text-white flex items-baseline flex-wrap">
          <span>{{ recipe.title }}</span>
          <span class="ml-2 text-sm font-normal text-gray-400">
                        (<span title="ダメージ" class="text-red-400 font-semibold">{{ recipe.damage }}</span> /
                        <span title="ドライブゲージ" class="font-semibold">D:<span
                            class="text-red-500">{{ recipe.driveGauge }}</span></span> /
                        <span title="SAゲージ" class="font-semibold">SA:<span class="text-red-500"
                                                                              v-if="recipe.saGaugeCost < 0">{{
                            recipe.saGaugeCost
                          }}</span><span v-if="recipe.saGaugeCost < 0 && recipe.saGaugeGain > 0">,</span><span
                            class="text-green-500" v-if="recipe.saGaugeGain > 0">+{{ recipe.saGaugeGain }}</span></span>)
                     </span>
        </h4>
        <div class="flex items-center text-sm" title="いいね">
          <svg class="w-5 h-5 mr-1.5 text-pink-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               stroke-width="2" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
          </svg>
          <span class="font-semibold text-gray-300">{{ recipe.likes }}</span>
        </div>
      </div>

      <div class="mb-3">
        <div class="commands p-3 bg-gray-900 rounded-md text-gray-200" v-html="recipe.commands"></div>
      </div>

      <div class="flex justify-between items-center">
        <p class="text-sm text-gray-300 pr-4">{{ recipe.description }}</p>
        <button @click="isVideoVisible = !isVideoVisible" v-if="recipe.videoUrl"
                class="flex-shrink-0 text-sm text-blue-400 hover:text-blue-300 flex items-center">
          <svg class="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
               stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"/>
          </svg>
          <span>動画</span>
        </button>
      </div>
      <div v-show="isVideoVisible"
           class="video-container aspect-w-16 aspect-h-9 rounded-md overflow-hidden bg-gray-900 mt-2">
        <img src="https://placehold.co/1280x720/1a1a1a/cccccc?text=YouTube/Twitch+Clip" alt="video placeholder"
             class="w-full h-full object-cover">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import type {Recipe} from '../types'; // 型定義をインポート

// definePropsで型安全なpropsを定義
defineProps<{
  recipe: Recipe
}>();

// 動画の表示/非表示を管理する状態
const isVideoVisible = ref(false);
</script>