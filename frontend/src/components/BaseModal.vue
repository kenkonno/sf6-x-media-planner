<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
          v-if="modelValue"
          @click.self="$emit('update:modelValue', false)"
          class="fixed inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center z-50 p-4"
      >
        <div class="bg-gray-800 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
          <!-- モーダルヘッダー -->
          <div class="flex justify-between items-center p-4 border-b border-gray-700 flex-shrink-0">
            <h2 class="text-xl font-bold text-white">
              <slot name="header">モーダルタイトル</slot>
            </h2>
            <button @click="$emit('update:modelValue', false)"
                    class="p-1 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white">
              <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- モーダルボディ -->
          <div class="p-6 overflow-y-auto">
            <slot>モーダルのコンテンツがここに表示されます。</slot>
          </div>

          <!-- モーダルフッター -->
          <div v-if="$slots.footer" class="flex justify-end gap-4 p-4 border-t border-gray-700 flex-shrink-0">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean; // v-modelで表示状態を制御
}>();

defineEmits(['update:modelValue']);
</script>

<style>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
