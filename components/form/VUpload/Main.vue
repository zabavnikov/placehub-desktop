<template>
  <input
      type="file"
      :accept="accept"
      :multiple="multiple"
      :disabled="progress > 0"
      @change="onChange"
  />
</template>

<script>
import {useNuxtApp} from '#app/nuxt';
import axios from 'axios'

export default {
  emits: ['update:modelValue', 'progress'],

  props: {
    modelValue: {
      type: Array,
      default() {
        return [];
      }
    },

    to: {
      type: String,
      required: true
    },

    multiple: {
      type: Boolean,
      default: false,
    },

    max: {
      type: Number,
      default: 0,
    },

    accept: {
      type: String,
      default: 'image/*'
    },
  },

  data() {
    return {
      progress: 0
    }
  },

  methods: {
    async onChange(event) {
      const files = event.target.files, formData = new FormData();

      if (
          files.length === 0 ||
          this.to.length === 0 ||
          this.progress > 0 ||
          this.max > 0 && this.modelValue.length >= this.max
      ) {
        event.target.value = '';
        return;
      }

      for (let file of files) {
        formData.append('images[]', file);
      }

      await axios.post(`http://localhost:8080/api/images/${this.to}`, formData, {
        headers: {
          Accept: 'application/json',
          Authorization: useNuxtApp().$auth.strategy.token.get()
        },
      })
          /*.$post(`/api/images/${this.to}`, formData, {
            onUploadProgress: progressEvent => {
              this.progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              this.$emit('progress', this.progress);
            }
          })*/
          .then(({ data }) => {
            if (data.length > 0) {
              this.$emit('update:modelValue', [...this.modelValue, ...data]);
            }
          })
          .finally(() => {
            event.target.value = '';
            this.$emit('progress', this.progress = 0);
          });
    }
  }
}
</script>
