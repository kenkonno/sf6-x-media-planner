<template>
  <div v-if="loading" class="text-center py-20">読み込み中...</div>
  <div v-else-if="userProfile">
    <!-- プロフィールセクション -->
    <section
        class="bg-gray-800/50 rounded-lg p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6">
      <img class="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-gray-700 flex-shrink-0"
           :src="userProfile.avatarUrl" alt="User Avatar">
      <div class="flex-grow">
        <div class="flex flex-col sm:flex-row items-center sm:justify-between gap-2">
          <h2 class="text-3xl font-bold text-white">{{ userProfile.name }}</h2>
          <button
              class="w-full sm:w-auto border border-gray-600 text-sm font-medium py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">
            プロフィールを編集
          </button>
        </div>
        <div class="mt-2 flex justify-center sm:justify-start items-center space-x-6 text-gray-400">
          <div><span class="font-bold text-white">{{ userProfile.followingCount }}</span> フォロー中</div>
          <div><span class="font-bold text-white">{{ userProfile.followerCount }}</span> フォロワー</div>
        </div>
        <p class="mt-4 text-gray-300 text-sm leading-relaxed">
          {{ userProfile.profile }}
        </p>
      </div>
    </section>

    <!-- コンテンツエリア -->
    <section class="mt-8">
      <!-- タブ -->
      <div>
        <div class="border-b border-gray-700">
          <nav class="flex flex-wrap -mb-px -ml-4" aria-label="Tabs">
            <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
                    class="ml-4 whitespace-nowrap py-2 px-4 border-b-2 font-medium text-sm rounded-t-lg transition-colors duration-200"
                    :class="[activeTab === tab.id ? 'border-blue-500 bg-gray-800 text-white' : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-700/50']">
              {{ tab.name }}
            </button>
          </nav>
        </div>
      </div>

      <!-- タブコンテンツ -->
      <div class="mt-6">
        <div v-show="activeTab === 'articles'" class="space-y-4">
          <div v-for="article in postedArticles" :key="article.id"
               class="bg-gray-800/50 rounded-lg p-4 flex items-center justify-between">
            <div>
              <p class="font-semibold text-white hover:underline cursor-pointer">{{ article.title }}</p>
              <div class="text-xs text-gray-400 mt-1 flex items-center space-x-4">
                <span>公開日: {{ article.publishedAt }}</span>
                <span class="flex items-center"><svg class="h-3 w-3 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                     viewBox="0 0 24 24" stroke="currentColor"><path
                    stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round"
                                                                      stroke-width="2"
                                                                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>{{
                    article.stats.views
                  }}</span>
                <span class="flex items-center"><svg class="h-3 w-3 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none"
                                                     viewBox="0 0 24 24" stroke="currentColor"><path
                    stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>{{
                    article.stats.likes
                  }}</span>
              </div>
            </div>
            <div class="flex-shrink-0 flex items-center gap-2">
              <button class="bg-gray-700 text-white text-xs font-bold py-1.5 px-3 rounded-md hover:bg-gray-600">編集
              </button>
              <button class="bg-red-800 text-white text-xs font-bold py-1.5 px-3 rounded-md hover:bg-red-700">削除
              </button>
            </div>
          </div>
        </div>
        <div v-show="activeTab === 'strategies'" class="text-gray-400"><p>
          ここには作成した攻略ページの一覧が表示されます。</p></div>
        <div v-show="activeTab === 'recipes'" class="text-gray-400"><p>ここには投稿したレシピの一覧が表示されます。</p>
        </div>
        <div v-show="activeTab === 'likes'" class="text-gray-400"><p>
          ここにはいいねしたコンテンツの一覧が表示されます。</p></div>
        <div v-show="activeTab === 'follows'" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 class="text-xl font-bold mb-4">フォロー中 ({{ userProfile.followingCount }})</h3>
              <div class="space-y-4">
                <FollowUserCard v-for="user in followingList" :key="user.id" :user="user"/>
              </div>
            </div>
            <div>
              <h3 class="text-xl font-bold mb-4">フォロワー ({{ userProfile.followerCount }})</h3>
              <div class="space-y-4">
                <FollowUserCard v-for="user in followerList" :key="user.id" :user="user"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useMyPage} from '../composables/useMyPage';
import FollowUserCard from '../components/FollowUserCard.vue';

type TabId = 'articles' | 'strategies' | 'recipes' | 'likes' | 'follows';

const tabs: { id: TabId, name: string }[] = [
  {id: 'articles', name: '投稿した記事'},
  {id: 'strategies', name: '作成した攻略'},
  {id: 'recipes', name: '投稿したレシピ'},
  {id: 'likes', name: 'いいねしたコンテンツ'},
  {id: 'follows', name: 'フォロー/フォロワー'},
];
const activeTab = ref<TabId>('articles');

const {
  userProfile,
  postedArticles,
  followingList,
  followerList,
  loading,
  fetchData
} = useMyPage();

onMounted(() => {
  fetchData();
});
</script>