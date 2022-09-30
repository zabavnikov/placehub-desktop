<template>
  <Dialog title="Поиск места">
    <div class="w-[528px]">
      <SearchPlace
        v-model="selectedPlace"
        :callback="callback"
        @update:modelValue="onSelect"
      />
      <div @click="onCreate">Создать</div>
    </div>
  </Dialog>
</template>


<script setup>
import Dialog from '~/components/common/Dialog.vue'
import { SearchPlace } from '@placehub/ui'
import { useGql } from '~/uses'
import { ref } from 'vue'
import { useNuxtApp } from 'nuxt/app'
import PlaceFormDialog from './PlaceFormDialog'

const emit = defineEmits(['selected'])
const props = defineProps({
  modelValue: {
    type: Object
  }
})
const { $overlay } = useNuxtApp()
const selectedPlace = ref(props.modelValue)

const onSelect = (place) => {
  emit('selected', place)
}

const onCreate = () => {
  $overlay.show(PlaceFormDialog)
}

const callback = async (query) => {
  const { data: { searchPlaces }} = await useGql(`
    query($query: String!) {
      searchPlaces(query: $query) {
        id
        name
        full_name
      }
    }
    `, {
    query
  })

  return searchPlaces
}
</script>