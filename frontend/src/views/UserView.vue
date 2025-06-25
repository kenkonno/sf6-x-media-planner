<template>
  <Suspense>
    <async-user-table
        @open-edit-modal="openEditModal($event)"
        :list="list"
    />
    <template #fallback>
      Loading...
    </template>
  </Suspense>
  <Suspense v-if="modalIsOpen">
    <default-modal title="User" @close-edit-modal="closeModalProxy">
      <async-user-edit :id="id" @close-edit-modal="closeModalProxy"></async-user-edit>
    </default-modal>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import AsyncUserTable from "@/components/user/AsyncUserTable.vue";
import AsyncUserEdit from "@/components/user/AsyncUserEdit.vue";
import DefaultModal from "@/components/modal/DefaultModal.vue";
import {useUserTable} from "@/composables/user";

const {list, refresh} = await useUserTable()
const closeModalProxy = async () => {
  await refresh()
}

</script>