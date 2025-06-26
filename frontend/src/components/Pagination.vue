<template>
  <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
    <button @click="changePage(pagination.currentPage - 1)" :disabled="pagination.currentPage === 1"
            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
      <span class="sr-only">Previous</span>
      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
           aria-hidden="true">
        <path fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"/>
      </svg>
    </button>

    <button v-for="page in pages" :key="page" @click="changePage(page)"
            :class="[
               'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
               page === pagination.currentPage ? 'z-10 bg-blue-600 border-blue-500 text-white' : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700'
           ]">
      {{ page }}
    </button>

    <button @click="changePage(pagination.currentPage + 1)" :disabled="pagination.currentPage === pagination.totalPages"
            class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-700 bg-gray-800 text-sm font-medium text-gray-400 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
      <span class="sr-only">Next</span>
      <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
           aria-hidden="true">
        <path fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"/>
      </svg>
    </button>
  </nav>
</template>

<script setup lang="ts">
import {computed, type PropType} from 'vue';
import type {PaginationInfo} from '../types';

const props = defineProps({
  pagination: {
    type: Object as PropType<PaginationInfo>,
    required: true,
  }
});

const emit = defineEmits(['page-changed']);

// ページ番号のリストを計算 (例: 1, 2, 3, 4)
const pages = computed(() => {
  const result = [];
  for (let i = 1; i <= props.pagination.totalPages; i++) {
    result.push(i);
  }
  // ここで ... を挟むなど、より複雑なロジックも追加可能
  return result;
});

const changePage = (page: number) => {
  if (page > 0 && page <= props.pagination.totalPages) {
    emit('page-changed', page);
  }
};
</script>
