<template>
  <form @submit.prevent="onSubmit" class="relative p-4">
    <!-- Отзыв. -->
<!--    <FormField v-if="form.is_review" name="pluses" label="Достоинства">
      <TipTap v-model="form.pluses" raw-text class="prose-sm" placeholder="Что вам понравилось?" />
    </FormField>
    <FormField v-if="form.is_review" name="minuses" label="Недостатки">
      <TipTap v-model="form.minuses" raw-text class="prose-sm" placeholder="Что не понравилось?" />
    </FormField>
    <FormField v-if="form.is_review" name="text" label="Комментарий">
      <TipTap v-model="form.text" class="prose-sm" placeholder="Другие впечатления" />
    </FormField>-->
    <!-- / Отзыв. -->

    <!-- Пост или статья. -->
    <FormField name="input.text">
      <TipTap v-model="form.text" class="prose-sm" />
    </FormField>
    <!-- / Пост или статья. -->

    <PostFormImages v-if="form.images.length > 0" v-model="form.images" />

    <div class="mt-4 w-full flex items-end">
      <div class="flex items-center space-x-2">
        <!-- Загрузка изображений. -->
        <button type="button" class="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-lg text-gray-500" @click="$refs.upload.$el.click()">
          <PhotoIcon class="w-5 h-5" />
        </button>
        <Upload ref="upload" model-type="posts" :fields="['id', 'url']" :presets="['default@width:640,height:480']" v-model="form.images" />
        <!-- / Загрузка изображений. -->

        <!-- Выбор места. -->
        <button type="button" class="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-lg text-gray-500" @click="onSelectPlace">
          <MapPinIcon class="w-5 h-5" />
        </button>
        <!-- / Выбор места. -->

        <!-- Настройка поста. -->
        <PostFormSettings v-model:who-can-comment="form.who_can_comment" />
        <!-- / Настройка поста. -->
      </div>

      <div class="ml-auto space-x-2 flex items-center">
        <button type="submit" :loading="loading" class="w-8 h-8 flex items-center justify-center bg-indigo-500 rounded-lg">
          <PaperAirplaneIcon class="w-5 h-5 -mr-0.5 -mt-0.5 text-white rotate-[-45deg]" />
        </button>
      </div>
    </div>
  </form>
</template>

<script setup>
import PlaceSearchDialog from '~/components/modules/places/components/PlaceSearchDialog.vue'
import PostFormImages from "./PostFormImages"
import PostFormSettings from "./PostFormSettings"
import TipTap from '../../../../../ui/src/components/TipTap/TipTap.vue'
import Upload from '../../../../../ui/src/components/Upload/Upload.vue'
import cloneDeep from 'lodash/cloneDeep.js';
import pick from 'lodash/pick.js';
import { CREATE_POST, UPDATE_POST } from '../graphql';
import { FormField, Button } from '@placehub/ui'
import { PhotoIcon, MapPinIcon, PaperAirplaneIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import { useRouter, useNuxtApp } from 'nuxt/app'
import { useForm } from 'vee-validate'

const formInitialState = {
  place_id: null,
  pluses: '',
  minuses: '',
  text: '',
  type: null,
  rating: 0,
  place: {},
  images: [],
  who_can_comment: 'all',
}

const props = defineProps({
  post: {
    type: Object,
    default() {
      return {
        place_id: null,
        pluses: '',
        minuses: '',
        text: '',
        type: null,
        rating: 0,
        place: {},
        images: [],
        who_can_comment: 'all',
      }
    }
  }
})

const emit = defineEmits(['created', 'updated'])

const form = ref(props.post)
const loading = ref(false)
const router = useRouter()

const { $overlay } = useNuxtApp()

const isEdit = props.post.id > 0

const onSelectPlace = () => {
  $overlay.show(PlaceSearchDialog, {
    props: {
      modelValue: form.value.place,
    },
    on: {
      selected(place) {
        Object.assign(form.value.place, place)
        form.value.place_id = place.id
      }
    }
  })
}

const { handleSubmit, setErrors } = useForm()

const onSubmit = handleSubmit(async () => {
  if (loading.value) return

  loading.value = true

  const input = pick(form.value, ['place_id', 'who_can_comment', 'text', 'images'])
  input.images = input.images.map(image => image.id)

  const variables = {
    input
  }

  if (isEdit) {
    variables.id = props.post.id
  }

  try {
    const { data: { post } } = await useFetch({
      query: isEdit
          ? UPDATE_POST
          : CREATE_POST,
      variables
    })

    if (! isEdit) {
      emit('created', post)
    } else {
      router.push({name: 'posts.show', params: {postId: post.id}})
    }

    form.value = cloneDeep(formInitialState)
  } catch (error) {
    if (error.message === 'validation') {
      setErrors(error.extensions.validation)
    }
  } finally {
    loading.value = false
  }
})
</script>

<style lang="scss">
.post-form-tool {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  cursor: pointer;
  border-radius: 99px;

  &:hover {
    background-color: #f1f1f1;
    svg {
      stroke: #111;
    }
  }
}

.ProseMirror {
  @apply p-0;
}
</style>
