<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div>
      <label for="character" class="block text-sm font-medium text-gray-300">対象キャラクター<span
          class="text-red-500 ml-1">*</span></label>
      <select id="character" v-model="form.characterId" required
              class="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
        <option :value="null" disabled>キャラクターを選択</option>
        <option v-for="char in characters" :key="char.id" :value="char.id">{{ char.name }}</option>
      </select>
    </div>

    <div>
      <label for="recipe-title" class="block text-sm font-medium text-gray-300">レシピのタイトル<span
          class="text-red-500 ml-1">*</span></label>
      <input type="text" id="recipe-title" v-model="form.title" required
             class="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
             placeholder="例：画面端 DI > 強P > OD波動 > 真・昇龍拳">
    </div>

    <div>
      <label for="commands" class="block text-sm font-medium text-gray-300">コマンド<span
          class="text-red-500 ml-1">*</span></label>
      <input type="text" id="commands" v-model="form.commands" required
             class="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
             placeholder="例：強P+強K > 強P > OD 波動拳 > SA3">
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div>
        <label for="damage" class="block text-sm font-medium text-gray-300">ダメージ</label>
        <input type="number" id="damage" v-model.number="form.damage"
               class="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
               placeholder="例：5280">
      </div>
      <div>
        <label for="video-url" class="block text-sm font-medium text-gray-300">参考動画URL</label>
        <input type="url" id="video-url" v-model="form.videoUrl"
               class="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
               placeholder="https://youtube.com/...">
      </div>
    </div>

    <fieldset>
      <legend class="text-sm font-medium text-gray-300">ドライブゲージ</legend>
      <div class="mt-2 grid grid-cols-2 gap-4">
        <div>
          <label for="drive-cost" class="block text-xs font-medium text-gray-400">消費</label>
          <input type="number" step="0.5" id="drive-cost" v-model.number="form.driveGaugeCost"
                 class="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                 placeholder="例：3.0">
        </div>
        <div>
          <label for="drive-gain" class="block text-xs font-medium text-gray-400">増加</label>
          <input type="number" step="0.1" id="drive-gain" v-model.number="form.driveGaugeGain"
                 class="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                 placeholder="例：0.5">
        </div>
      </div>
    </fieldset>

    <fieldset>
      <legend class="text-sm font-medium text-gray-300">SAゲージ</legend>
      <div class="mt-2 grid grid-cols-2 gap-4">
        <div>
          <label for="sa-cost" class="block text-xs font-medium text-gray-400">消費</label>
          <input type="number" id="sa-cost" v-model.number="form.saGaugeCost"
                 class="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                 placeholder="例：3">
        </div>
        <div>
          <label for="sa-gain" class="block text-xs font-medium text-gray-400">増加</label>
          <input type="number" step="0.1" id="sa-gain" v-model.number="form.saGaugeGain"
                 class="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                 placeholder="例：0.5">
        </div>
      </div>
    </fieldset>

    <div>
      <label for="description" class="block text-sm font-medium text-gray-300">解説</label>
      <textarea id="description" rows="3" v-model="form.description"
                class="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="コンボのコツや使い所など"></textarea>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-300">タグ</label>
      <!-- TagInputコンポーネントをここに配置 -->
      <p class="text-xs text-gray-500 mt-1">(TagInputコンポーネントを別途作成して利用します)</p>
    </div>
  </form>
</template>

<script setup lang="ts">
import {onMounted} from 'vue';
import {useRecipeForm} from '../composables/useRecipeForm';

const {form, characters, submitting, initialize, submit} = useRecipeForm();

const emit = defineEmits(['form-submitted']);

const handleSubmit = async () => {
  const success = await submit();
  if (success) {
    emit('form-submitted');
  }
}

onMounted(() => {
  initialize();
});

// 親コンポーネントからフォームを送信するための関数を公開
defineExpose({handleSubmit});
</script>
