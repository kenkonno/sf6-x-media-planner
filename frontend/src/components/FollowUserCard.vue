<template>
  <div class="bg-gray-800/50 p-4 rounded-lg flex items-start gap-4">
    <img :src="user.avatarUrl" class="w-12 h-12 rounded-full flex-shrink-0" :alt="`${user.name} Avatar`">
    <div class="flex-grow overflow-hidden">
      <div class="flex justify-between items-center">
        <p class="font-bold text-white hover:underline cursor-pointer truncate">{{ user.name }}</p>
        <button v-if="user.isFollowing"
                class="flex-shrink-0 bg-gray-700 text-white text-xs font-bold py-1.5 px-3 rounded-md hover:bg-gray-600">
          フォロー中
        </button>
        <button v-else
                class="flex-shrink-0 bg-blue-600 text-white text-xs font-bold py-1.5 px-3 rounded-md hover:bg-blue-700">
          フォローする
        </button>
      </div>
      <p class="text-xs text-gray-400 mt-1 truncate">{{ user.bio }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {PropType} from 'vue';
import type {FollowUser} from '../types';

defineProps({
  user: {
    type: Object as PropType<FollowUser>,
    required: true,
  }
});
</script>