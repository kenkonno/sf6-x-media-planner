// =================================================================
// ファイル: src/components/TimelinePostCard.vue (新規作成)
// =================================================================
/*
<template>
  <div class="bg-gray-800/50 rounded-lg p-4 transition-all hover:bg-gray-800/80">
    <div class="flex items-center mb-2">
      <img class="h-8 w-8 rounded-full" :src="item.author.avatarUrl" :alt="item.author.name">
      <p class="ml-3 text-sm font-medium text-white">
        {{ item.author.name }}
        <span class="text-gray-400">{{ item.actionText }}</span>
      </p>
      <p class="ml-auto text-xs text-gray-500">{{ item.createdAt }}</p>
    </div>
    <h3 class="text-lg font-bold hover:underline cursor-pointer truncate">{{ item.title }}</h3>
    <p v-if="item.description" class="text-sm text-gray-400 mt-1 truncate">{{ item.description }}</p>
  </div>
</template>

<script setup lang="ts">
import type {PropType} from 'vue';
import type {TimelineItem} from '../types';

defineProps({
  item: {
    type: Object as PropType<TimelineItem>,
    required: true,
  }
});
</script>