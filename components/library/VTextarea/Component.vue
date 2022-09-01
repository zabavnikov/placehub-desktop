<template>
  <textarea
      :id="id"
      :value="modelValue"
      :rows="rows"
      :autofocus="autofocus"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxlength"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="$emit('focus')"
      ref="textarea"
      class="overflow-hidden resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
</template>

<script>
import { ref, nextTick, onMounted } from 'vue'

export default {
  emits: ['update:modelValue', 'focus'],
  props: {
    id: String,
    modelValue: String,
    placeholder: String,
    maxlength: String,

    rows: {
      type: [String, Number],
      default: 1
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    autofocus: {
      type: Boolean,
      default: false,
    },
  },

  setup() {
    const textarea = ref()

    const updateHeight = () => {
      nextTick().then(() => {
        if (textarea.value) {
          textarea.value.style.height = 'auto'
          textarea.value.style.height = textarea.value.scrollHeight + 'px'
        }
      })
    }

    onMounted(() => updateHeight())

    return {
      textarea,
      updateHeight,
    }
  },

  watch: {
    modelValue: {
      handler() {
        this.updateHeight()
      },

      immediate: true,
    },

    autofocus(newValue) {
      if (newValue) {
        this.$refs.textarea.focus();
      } else {
        this.$refs.textarea.blur();
      }
    }
  }
}
</script>
