<template>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
    <!-- 左カラム: フィルター -->
    <aside class="md:col-span-1">
      <SearchFilters v-model="filters" :characters="characters" @search="handleSearch"/>
    </aside>

    <!-- 右カラム: 検索結果 -->
    <div class="md:col-span-3">
      <div class="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-4">
        <h2 class="text-2xl font-bold text-white">検索結果 <span v-if="!loading" class="text-base font-normal">({{
            pagination.totalResults
          }}件)</span></h2>
        <div>
          <select
              class="w-full sm:w-auto bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
            <option>新着順</option>
            <option>人気順</option>
          </select>
        </div>
      </div>

      <div v-if="loading" class="text-center py-20">検索中...</div>
      <div v-else-if="results.length > 0">
        <div class="space-y-4">
          <ContentCard v-for="item in results" :key="item.id" :item="item"/>
        </div>
        <!-- ページング -->
        <div class="mt-8 flex justify-center items-center">
          <Pagination :pagination="pagination" @page-changed="handlePageChange"/>
        </div>
      </div>
      <div v-else class="text-center py-20 text-gray-400">
        検索条件に一致するコンテンツは見つかりませんでした。
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted} from 'vue';
import {useSearch} from '../composables/useSearch';
import SearchFilters from '../components/SearchFilters.vue';
import Pagination from '../components/Pagination.vue';
import ContentCard from '../components/ContentCard.vue'; // 既存のコンポーネントを再利用

const {
  filters,
  results,
  pagination,
  characters,
  loading,
  search,
  fetchInitialData
} = useSearch();

const handleSearch = () => {
  search(1); // 検索ボタンが押されたら1ページ目から再検索
};

const handlePageChange = (page: number) => {
  search(page);
};

onMounted(() => {
  fetchInitialData();
});
</script>
