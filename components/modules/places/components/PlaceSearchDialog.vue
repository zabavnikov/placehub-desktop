<template>
  <Dialog title="Поиск места">
      <FormField>
        <SearchPlace
            v-model="selectedPlace"
            :callback="callback"
            @update:modelValue="onSelect"
        />
      </FormField>
      <div class="mt-4 text-slate-500">
        Если не нашли нужное место, <span class="underline cursor-pointer text-black" @click="onCreate">нажмите</span> чтобы добавить его вручную.
      </div>
  </Dialog>
</template>


<script setup>
import Dialog from '~/components/common/Dialog.vue'
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
  $overlay.hideAll()
}

const onCreate = () => {
  $overlay.show(PlaceFormDialog, {
    on: {
      created(place) {
        onSelect(place)
      }
    }
  })
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