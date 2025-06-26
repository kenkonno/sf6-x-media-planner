<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <!-- 左カラム: メインコンテンツ -->
    <div class="lg:col-span-2 space-y-6">
      <!-- タブ -->
      <div>
        <div class="border-b border-gray-700">
          <nav class="-mb-px flex space-x-8" aria-label="Tabs">
            <button @click="activeTab = 'timeline'"
                    :class="activeTab === 'timeline' ? tabClasses.active : tabClasses.inactive">タイムライン
            </button>
            <button @click="activeTab = 'featured'"
                    :class="activeTab === 'featured' ? tabClasses.active : tabClasses.inactive">注目コンテンツ
            </button>
          </nav>
        </div>
      </div>

      <!-- タブコンテンツ -->
      <div v-if="loading" class="text-center py-10">読み込み中...</div>
      <div v-else>
        <div v-show="activeTab === 'timeline'" class="space-y-4">
          <TimelinePostCard v-for="item in timelineItems" :key="item.id" :item="item"/>
        </div>

        <div v-show="activeTab === 'featured'" class="space-y-6">
          <div>
            <h3 class="text-xl font-bold mb-3">人気の記事</h3>
            <div class="space-y-3">
              <div v-for="item in popularArticles" :key="item.id"
                   class="bg-gray-800/50 rounded-lg p-3 hover:bg-gray-800/80 cursor-pointer">
                <p class="text-base font-semibold truncate"><span class="text-gray-400 w-6 inline-block">{{
                    item.rank
                  }}.</span>{{ item.title }}</p>
                <p class="text-xs text-gray-400 pl-6">by {{ item.authorName }}</p>
              </div>
            </div>
          </div>
          <div>
            <h3 class="text-xl font-bold mb-3">人気のレシピ</h3>
            <div class="space-y-3">
              <div v-for="item in popularRecipes" :key="item.id"
                   class="bg-gray-800/50 rounded-lg p-3 hover:bg-gray-800/80 cursor-pointer">
                <p class="text-base font-semibold truncate"><span class="text-gray-400 w-6 inline-block">{{
                    item.rank
                  }}.</span>{{ item.title }} ({{ item.characterName }})</p>
                <p class="text-xs text-gray-400 pl-6">by {{ item.authorName }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 右カラム: サイドバー -->
    <aside class="space-y-6">
      <!-- アクションボタン -->
      <div class="grid grid-cols-2 gap-4">
        <button class="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors">
          記事を作成する
        </button>
        <button class="w-full bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition-colors">
          レシピを追加
        </button>
        <button @click="isModalOpen = true"
                class="mt-4 bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700">レシピ追加モーダルを開く
        </button>

      </div>

      <!-- キャラクター一覧 -->
      <div class="bg-gray-800/50 rounded-lg p-4">
        <h3 class="text-lg font-bold mb-4">キャラクター</h3>
        <div class="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-4 gap-3">
          <img v-for="char in characters" :key="char.id" :src="char.iconUrl" :alt="char.name"
               class="rounded-md cursor-pointer hover:opacity-80 transition-opacity"/>
        </div>
      </div>

      <!-- ニュース -->
      <div class="bg-gray-800/50 rounded-lg p-4">
        <h3 class="text-lg font-bold mb-4">ニュース / お知らせ</h3>
        <ul class="space-y-3 text-sm">
          <li v-for="item in news" :key="item.id" class="hover:underline cursor-pointer">
            <span class="text-gray-400 mr-2">{{ item.date }}</span>{{ item.title }}
          </li>
        </ul>
      </div>
    </aside>
  </div>
  <BaseModal v-model="isModalOpen">
    <template #header>
      レシピを追加する
    </template>

    <template #default>
      <RecipeForm ref="recipeFormRef" @form-submitted="isModalOpen = false"/>
    </template>

    <template #footer>
      <button @click="isModalOpen = false"
              class="border border-gray-600 text-sm font-medium py-2 px-5 rounded-lg hover:bg-gray-700 transition-colors">
        キャンセル
      </button>
      <button @click="submitForm" :disabled="isSubmitting"
              class="bg-purple-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50">
        {{ isSubmitting ? '登録中...' : '登録する' }}
      </button>
    </template>
  </BaseModal>

</template>


<script setup lang="ts">
import {ref, onMounted, computed} from 'vue';
import {useHomepage} from '@/composables/useHomepage';
import TimelinePostCard from '@/components/TimelinePostCard.vue';
import RecipeForm from "@/components/RecipeForm.vue";
import BaseModal from "@/components/BaseModal.vue";

type Tab = 'timeline' | 'featured';
const activeTab = ref<Tab>('timeline');


const isModalOpen = ref(false);
const recipeFormRef = ref<InstanceType<typeof RecipeForm> | null>(null);

// RecipeFormのsubmitting状態をここで参照はできないため、
// 実際のアプリケーションでは状態管理ライブラリ(Pinia/Vuex)や
// Composableの工夫でこれを共有します。
// ここでは簡易的にボタンのローディング状態を管理します。
const isSubmitting = ref(false);

const submitForm = async () => {
  if (recipeFormRef.value) {
    isSubmitting.value = true;
    await recipeFormRef.value.handleSubmit();
    isSubmitting.value = false;
  }
};

const tabClasses = computed(() => ({
  active: 'border-blue-500 text-white whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200',
  inactive: 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200'
}));

const {
  timelineItems,
  popularArticles,
  popularRecipes,
  characters,
  news,
  loading,
  fetchData
} = useHomepage();

onMounted(() => {
  fetchData();
});
</script>

