<template>
  <Suspense>
    <async-
    @Lower@-table
    @open-edit-modal="openEditModal($event)"
    :list="list"
    />
    <template #fallback>
      Loading...
    </template>
  </Suspense>
  <Suspense v-if="modalIsOpen">
    <default-modal title="@Upper@" @close-edit-modal="closeModalProxy">
      <async-
      @Lower@-edit :id="id" @close-edit-modal="closeModalProxy"></async-@Lower@-edit>
    </default-modal>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import Async

@Upper @Table
from
"@/components/@Lower@/Async@Upper@Table.vue";
import Async

@Upper @Edit
from
"@/components/@Lower@/Async@Upper@Edit.vue";
import DefaultModal from "@/components/modal/DefaultModal.vue";
import {useModalWithId} from "@/composable/modalWIthId";
import {use@Upper@Table} from "@/composable/@Lower@";

const {list, refresh} = await use
@Upper @Table()
const {modalIsOpen, id, openEditModal, closeEditModal} = useModalWithId()
const closeModalProxy = async () => {
  await refresh()
  closeEditModal()
}

</script>