<template>
  <div class="bg-gray-800/50 rounded-lg p-4 space-y-6 sticky top-24">
    <div>
      <label for="keyword" class="block text-sm font-medium text-gray-300">キーワード</label>
      <input type="text" id="keyword" v-model="filters.keyword"
             class="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
             placeholder="インパクト, 確定反撃...">
    </div>

    <div>
      <h4 class="text-sm font-medium text-gray-300">コンテンツ種別</h4>
      <div class="mt-2 space-y-2">
        <div v-for="type in contentTypes" :key="type.value" class="flex items-center">
          <input :id="`type-${type.value}`" type="checkbox" :value="type.value" v-model="filters.types"
                 class="h-4 w-4 bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500 rounded">
          <label :for="`type-${type.value}`" class="ml-3 text-sm text-gray-200">{{ type.label }}</label>
        </div>
      </div>
    </div>

    <div>
      <label for="character" class="block text-sm font-medium text-gray-300">キャラクター</label>
      <select id="character" v-model="filters.characterId"
              class="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
        <option value="all">全キャラクター</option>
        <option v-for="char in characters" :key="char.id" :value="char.id">{{ char.name }}</option>
      </select>
    </div>

    <div>
      <label for="tags" class="block text-sm font-medium text-gray-300">タグ (AND検索)</label>
      <input type="text" id="tags" v-model="tagsInput" @keydown.enter.prevent="addTag" placeholder="タグを入力してEnter"
             class="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
      <div class="mt-2 flex flex-wrap gap-2">
                <span v-for="(tag, index) in filters.tags" :key="tag"
                      class="inline-flex items-center py-1 pl-3 pr-2 bg-gray-600 rounded-full text-sm font-medium text-gray-200">
                    {{ tag }}
                    <button @click="removeTag(index)"
                            class="ml-1.5 flex-shrink-0 h-4 w-4 rounded-full inline-flex items-center justify-center text-gray-400 hover:bg-gray-500 hover:text-white">
                        <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8"><path
                            stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7"/></svg>
                    </button>
                </span>
      </div>
    </div>

    <button @click="$emit('search')"
            class="w-full bg-blue-600 text-white font-bold py-2.5 rounded-lg hover:bg-blue-700 transition-colors">検索する
    </button>

  </div>
</template>

<script setup lang="ts">
import {ref, watch, type PropType} from 'vue';
import type {SearchFilters, Character} from '../types';

const props = defineProps({
  modelValue: {
    type: Object as PropType<SearchFilters>,
    required: true
  },
  characters: {
    type: Array as PropType<Character[]>,
    required: true,
  }
});

const emit = defineEmits(['update:modelValue', 'search']);

const filters = ref(props.modelValue);

watch(filters, (newValue) => {
  emit('update:modelValue', newValue);
}, {deep: true});

const contentTypes = [
  {value: 'article', label: '記事'},
  {value: 'recipe', label: 'レシピ'},
  {value: 'strategy_page', label: '攻略ページ'},
];

const tagsInput = ref('');

const addTag = () => {
  const newTag = tagsInput.value.trim();
  if (newTag && !filters.value.tags.includes(newTag)) {
    filters.value.tags.push(newTag);
  }
  tagsInput.value = '';
};

const removeTag = (index: number) => {
  filters.value.tags.splice(index, 1);
};
</script>
