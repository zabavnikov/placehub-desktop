<template>
  <div>
    <div v-if="isReply">
      <div class="flex">
        <nuxt-link to="/">
          <img :src="parent.user.avatar" :alt="parent.user.name" class="block w-10 h-10 rounded-full">
        </nuxt-link>
        <div class="ml-2 text-sm">
          <nuxt-link to="/" class="font-semibold inline-block">{{ parent.user.name }}</nuxt-link>
          <div class="text-gray-600">{{ parent.created_at }}</div>
        </div>
      </div>
    </div>

    <form @submit.prevent="onSubmit">
      <div class="relative">
        <FormField name="text">
          <Textarea v-model="form.text" class="post-form-textarea" placeholder="Привет, что нового?" rows="1" />
        </FormField>

        <div class="absolute bottom-0 p-2 w-full flex items-end">
          <div class="flex items-center space-x-2">
            <!-- Загрузка изображений. -->
            <button type="button" class="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-500" @click="$refs.upload.$el.click()">
              <PhotoIcon class="w-5 h-5" />
            </button>
            <v-upload ref="upload" to="posts" multiple v-model="form.images" class="hidden"></v-upload>
            <!-- / Загрузка изображений. -->

            <!-- Выбор места. -->
            <button type="button" class="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-500" @click="onSelectPlace">
              <MapPinIcon class="w-5 h-5" />
            </button>
            <!-- / Выбор места. -->

            <!-- Настройка поста. -->
            <PostFormSettings v-model:who-can-comment="form.who_can_comment" />
            <!-- / Настройка поста. -->
          </div>
          {{ form.place_id }}

          <div class="ml-auto space-x-2 flex items-center">
            <button type="submit" :loading="loading" class="w-8 h-8 flex items-center justify-center bg-indigo-500 rounded-full">
              <PaperAirplaneIcon class="w-5 h-5 -mr-0.5 -mt-0.5 text-white rotate-[-45deg]" />
            </button>
          </div>
        </div>
      </div>

      <div class="bg-white">
        <PostFormImages v-if="form.images.length > 0" v-model="form.images" class="mt-2" />

        <div v-if="form.place && Object.keys(form.place).length > 0"
             class="mt-2 flex justify-between shadow-sm p-2 border rounded">
          <div>
            <div class="font-bold">{{ form.place.name }}</div>
            <div class="help">{{ form.place.parent_names }}</div>
          </div>
          <span @click="form.place = {}" class="cursor-pointer">x</span>
        </div>

        <div v-if="errors.any()" class="text-red-500 text-sm mt-4">
          <div v-for="error in errors.all()" class="help">
            {{ error[0] }}
          </div>
        </div>
      </div>


    </form>

  </div>
</template>


<script>
import { useNuxtApp } from 'nuxt/app'
import PlaceSearchDialog from '~/components/modules/places/components/PlaceSearchDialog.vue'

import { ref } from 'vue'
import { FormField, Textarea, Button } from '@placehub/ui'
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
    isReply: {
      type: Boolean,
      default: false
    }
  },

  components: {
    Button,
    PostFormImages,
    FormField,
    Textarea,
    VUpload,
    PostFormSettings,
    PhotoIcon,
    MapPinIcon,
    PaperAirplaneIcon
  },

  async setup(props) {
    const form = ref(props.post)
    const loading = ref(false)
    const router = useRouter()

    const { $overlay } = useNuxtApp()

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

    const isEdit = props.post.id > 0

    if (isEdit) {
      const { data: { value: { post } } } = await useAsyncGql(`
          query($postId: Int!) {
            ${POST_FORM}
          }
        `, {
        postId: props.post.id
      })

      form.value = post
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
          this.$emit('updated', post)
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

.post-form-textarea {
  textarea,
  &.textarea::after {
    @apply pb-14;
  }
}
</style>
