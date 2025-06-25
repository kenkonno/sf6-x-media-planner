<template>
  <h1>MAIN PAGE</h1>
  <!-- Header, Footerなどをここに配置できます -->
  <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
    <ArticleDetail/>
  </main>
</template>

<script setup lang="ts">
import ArticleDetail from './components/ArticleDetail.vue';
</script>

<style>
@import "tailwindcss";

/* 必要に応じてグローバルなスタイルをここに記述 */
body {
  font-family: 'Inter', sans-serif;
  background-color: #111827; /* bg-gray-900 */
  color: #f3f4f6; /* text-gray-100 */
}

.commands span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin: 0 2px;
  padding: 2px 6px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.1);
  font-size: 0.9em;
}

</style>