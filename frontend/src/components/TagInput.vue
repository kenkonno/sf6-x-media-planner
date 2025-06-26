<template>
  <div>
    <input
        type="text"
        v-model="newTag"
        @keydown.enter.prevent="addTag"
        placeholder="タグを入力してEnter"
        class="block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    >
    <div class="mt-2 flex flex-wrap gap-2">
           <span v-for="(tag, index) in tags" :key="index"
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
</template>

<script setup lang="ts">
import {ref, watch} from 'vue';

const props = defineProps<{
  modelValue: string[]
}>();

const emit = defineEmits(['update:modelValue']);

const tags = ref([...props.modelValue]);
const newTag = ref('');

watch(tags, (newValue) => {
  emit('update:modelValue', newValue);
}, {deep: true});

const addTag = () => {
  const tagValue = newTag.value.trim();
  if (tagValue && !tags.value.includes(tagValue)) {
    tags.value.push(tagValue);
  }
  newTag.value = '';
};

const removeTag = (index: number) => {
  tags.value.splice(index, 1);
};
</script>