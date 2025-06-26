<template>
  <div id="app" class="bg-gray-900 text-gray-100 antialiased">
    <!-- ヘッダーコンポーネントなどをここに配置 -->
    <header class="bg-gray-800/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-700">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <h1 class="text-2xl font-black sf-gradient-text">SF6XMP</h1>
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <a href="#" class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">TOP</a>
                <a href="#"
                   class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">記事</a>
                <a href="#"
                   class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">攻略ページ</a>
                <a href="#"
                   class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">レシピ検索</a>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <div class="relative">
                <input type="text"
                       class="bg-gray-700 text-white placeholder-gray-400 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-600 w-64"
                       placeholder="検索...">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                       fill="currentColor">
                    <path fill-rule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clip-rule="evenodd"/>
                  </svg>
                </div>
              </div>
              <div class="ml-3 relative">
                <div>
                  <button type="button"
                          class="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span class="sr-only">Open user menu</span>
                    <img class="h-8 w-8 rounded-full" src="https://placehold.co/32x32/3b82f6/FFFFFF?text=U" alt="">
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import HomePage from '@/views/HomePage.vue';
</script>

<style>
@import "tailwindcss";

/* グローバルスタイル */
body {
  font-family: 'Inter', sans-serif;
  background-color: #111827;
}

.sf-gradient-text {
  background: linear-gradient(to right, #3b82f6, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>