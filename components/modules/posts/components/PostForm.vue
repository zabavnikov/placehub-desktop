<template>
    <form @submit.prevent="onSubmit">
      <div class="relative p-4">
        <FormField name="text">
          <TipTap v-model="form.text" />
        </FormField>

        <PostFormImages v-if="form.images.length > 0" v-model="form.images" />

        <div class="mt-4 w-full flex items-end">
          <div class="flex items-center space-x-2">
            <!-- Загрузка изображений. -->
            <button type="button" class="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-lg text-gray-500" @click="$refs.upload.$el.click()">
              <PhotoIcon class="w-5 h-5" />
            </button>
            <v-upload ref="upload" to="posts" multiple v-model="form.images" class="hidden"></v-upload>
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
      </div>
    </form>
</template>


<script>
import { useNuxtApp } from 'nuxt/app'
import PlaceSearchDialog from '~/components/modules/places/components/PlaceSearchDialog.vue'
import TipTap from '../../../../../tiptap/src/TipTap'

import { ref } from 'vue'
import { FormField, Button } from '@placehub/ui'
import { useRouter } from 'nuxt/app';
import cloneDeep from 'lodash/cloneDeep.js';
import pick from 'lodash/pick.js';
import { useAsyncGql, useGql } from '~/uses'
import Validation from "~/utils/validation"
import PostFormImages from "./PostFormImages"
import PostFormSettings from "./PostFormSettings"
import VUpload from '~/components/form/VUpload'
import { CREATE_POST, UPDATE_POST, POST_FORM } from '../graphql';
import { PhotoIcon, MapPinIcon, PaperAirplaneIcon } from '@heroicons/vue/24/outline'

const formInitialState = {
  place_id: null,
  text: '',
  place: {},
  images: [],
  who_can_comment: 'all',
};

export default {
  emits: ['created', 'updated'],

  props: {
    post: {
      type: Object,
      default() {
        return cloneDeep(formInitialState)
      }
    },
  },

  components: {
    Button,
    PostFormImages,
    FormField,
    VUpload,
    PostFormSettings,
    PhotoIcon,
    MapPinIcon,
    PaperAirplaneIcon,
    TipTap
  },

  async setup(props) {
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

    return {
      form,
      loading,
      router,
      isEdit,
      onSelectPlace
    }
  },

  data() {
    return {
      errors: new Validation
    }
  },

  methods: {
    async onSubmit() {
      if (this.loading) return

      this.loading = true

      const input = pick(this.form, ['place_id', 'who_can_comment', 'text', 'images'])

      input.images = input.images.map(image => image.id)

      const variables = {
        input
      }

      if (this.isEdit) {
        variables.id = this.post.id
      }

      try {
        const { data: { post } } = await useGql(
          this.isEdit
            ? UPDATE_POST
            : CREATE_POST,
          variables)

        if (! this.isEdit) {
          this.$emit('created', post)
        } else {
          this.$router.push({name: 'posts.show', params: {postId: this.post.id}})
        }

        this.form = cloneDeep(formInitialState)
      } catch (errors) {
        this.errors.record(errors)
      } finally {
        this.loading = false
      }
    },
  }
}
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
