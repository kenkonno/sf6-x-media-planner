<template>
  <div class="bg-gray-800/50 rounded-lg p-4 transition-all hover:bg-gray-800/80 cursor-pointer">
    <h3 class="text-base sm:text-lg font-bold text-white truncate">{{ item.title }}</h3>
    <p v-if="item.description" class="text-xs sm:text-sm text-gray-400 mt-1 truncate">{{ item.description }}</p>
    <div class="flex items-center justify-between mt-3 text-xs text-gray-500">
      <div class="flex items-center">
        <img class="h-5 w-5 rounded-full mr-2" :src="item.author.avatarUrl" :alt="item.author.name">
        <span>{{ item.author.name }}</span>
      </div>
      <div class="flex items-center space-x-3">
                <span v-if="item.stats.views" class="flex items-center">
                    <svg class="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                     d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round"
                                                                                                 stroke-linejoin="round"
                                                                                                 stroke-width="2"
                                                                                                 d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                    {{ item.stats.views.toLocaleString() }}
                </span>
        <span class="flex items-center">
                    <svg class="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                     d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                    {{ item.stats.likes.toLocaleString() }}
                </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {PropType} from 'vue';
import type {ContentSummary} from '../types';

defineProps({
  item: {
    type: Object as PropType<ContentSummary>,
    required: true,
  }
});
</script>