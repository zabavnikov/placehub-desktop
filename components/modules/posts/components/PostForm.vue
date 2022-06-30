<template>
  <div class="p-6 bg-white">
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

    <div class="sticky bottom-0 z-10">

      <v-textarea
          v-model="form.text"
          placeholder="Привет, что нового?"
          @url="form.url_id = $event.id; form.url = $event"
      />

      <div class="h-6"></div>

      <div class="bg-white">
        <post-form-images v-if="form.images.length > 0" class="mt-2" v-model="form.images"></post-form-images>

        <div v-if="form.place && Object.keys(form.place).length > 0"
             class="mt-2 flex justify-between shadow-sm p-2 border rounded">
          <div>
            <div class="font-bold">{{ form.place.name }}</div>
            <div class="help">{{ form.place.parent_names }}</div>
          </div>
          <span @click="form.place = {}" class="cursor-pointer"><v-icon name="x" stroke="red"></v-icon></span>
        </div>

        <VUrl v-if="form.url" :url="form.url" @delete="form.url = null; form.url_id = null" editable class="mt-2"/>

        <div v-if="errors.any()" class="is-invalid mt-4">
          <div v-for="error in errors.all()" class="help">
            {{ error[0] }}
          </div>
        </div>
      </div>

      <div class="flex items-center ">
        <div class="flex items-center space-x-2">
          <!-- Загрузка изображений. -->
          <button
              @click="$refs.upload.$el.click()"
              type="button"
              class="post-form-tool">
            <v-icon name="camera" stroke="#b0bec5"></v-icon>
          </button>
          <v-upload ref="upload" to="posts" multiple v-model="form.images" class="hidden"></v-upload>
          <!-- / Загрузка изображений. -->

          <!-- Выбор места. -->
          <button
              @click="$overlay.show(() => import('~/modules/places/components/VChoosePlaceOverlay'), mapOverlay)"
              type="button"
              class="post-form-tool"
              :style="{backgroundColor: errors.first('place_id') ? 'red' : undefined}">
            <v-icon name="location-marker" stroke="#b0bec5"></v-icon>
          </button>
          <!-- / Выбор места. -->
        </div>

        <div class="ml-auto space-x-2 flex items-center">
          <button @click="onSubmit" :class="{loading}" class="button">Отправить</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { ref } from 'vue'
import cloneDeep from 'lodash/cloneDeep';
import pick from 'lodash/pick';
import { useGql } from '~/uses'
import Validation from "~/utils/validation"
import PostFormImages from "./PostFormImages";
import VTextarea from "~/components/form/VTextarea";
import VUpload from '~/components/form/VUpload';
import VIcon from '~/components/common/VIcon';
import VUrl from "~/components/modules/urls/components/VUrl";
import { CREATE_POST, UPDATE_POST } from '../graphql';
import { usePostsStore } from '~/stores/posts'

const formInitialState = {
  place_id: null,
  text: '',
  place: {},
  images: [],
  url: null,
};

export default {
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
    VIcon,
    PostFormImages,
    VTextarea,
    VUpload,
    VUrl
  },

  setup(props, { $pinia }) {
    const errors = ref(new Validation())
    const form = ref(props.post)
    const loading = ref(false)
    const postsStore = usePostsStore($pinia)

    return {
      errors,
      form,
      loading,
      parent: postsStore.replyParent
    }
  },

  computed: {
    isEdit() {
      return this.post.id > 0;
    },
    mapOverlay() {
      return {
        props: {
          value: this.form.place
        },
        on: {
          input: selectedPlace => this.form.place = selectedPlace,
        }
      }
    },
  },

  watch: {
    'form.place.id'(newValue) {
      // Если прилетел undefined, то axios его пропустит и на сервер place_id не улетит,
      // а значит сервер тоже пропустит это поле и не обновит его, по этому если undefined, то заменим его на null.
      this.form.place_id = newValue || null;

      if (newValue) {
        this.errors.clear('place_id');
      }
    },
    'form.images'(newValue) {
      if (newValue.length > 0) {
        this.errors.clear('images');
      }
    },
  },

  methods: {
    async onSubmit() {
      if (this.loading) return

      this.loading = true

      const input = pick(this.form, ['place_id', 'link_id', 'text', 'images'])

      input.images = input.images.map(image => image.id)

      const variables = {
        input
      }

      const { data } = await useGql(
        this.isEdit
          ? UPDATE_POST
          : CREATE_POST,
          variables)
        .catch((error) => {
          console.log(error)
        })

      /*try {




        if (! this.isEdit) {
          this.$emit('create', postForm);
        } else {
          await this.$router.push({name: 'posts.show', params: {postId: this.$route.params.postId}});
        }

        this.form = cloneDeep(formInitialState);
        this.errors.clear();
      } catch ({ response }) {
        console.log(response)
        this.errors.record(response.errors)
      } finally {
        this.loading = false;
      }*/
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
</style>
