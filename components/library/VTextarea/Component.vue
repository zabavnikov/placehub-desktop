
<template>
  <div class="c-Textarea" :class="textareaClassObject">
    <textarea
        ref="textarea"
        class="c-Textarea__input rounded-lg py-2.5 px-4 text-sm font-medium text-gray-900 bg-white border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        :value="text"
        :name="name"
        :rows="rows"
        :required="required"
        :disabled="disabled"
        :aria-label="label"
        :placeholder="placeholder"
        @input="text = $event.target.value"
    />
    <span
        class="c-Textarea__label"
        :title="label"
        @mousedown.prevent="onLabelClick($event)"
    >
      {{ label }}
    </span>
  </div>
</template>
<script>
export default {
  name: 'VTextarea',
  props: {
    modelValue: {
      type: String,
      required: false,
      default: undefined,
    },
    rows: {
      type: [Number, String],
      default: 2
    },
    autofocus: Boolean,
    label: {
      type: String,
      required: false,
      default: undefined,
    },
    placeholder: {
      type: String,
      required: false,
      default: undefined,
    },
    name: {
      type: String,
      required: false,
      default: undefined,
    },
    autogrow: {
      type: Boolean,
      required: false,
      default: true,
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    resize: {
      type: String,
      required: false,
      default: 'default',
      validator(resize) {
        return ['default', 'vertical', 'horizontal', 'none'].includes(resize)
      },
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      text: this.modelValue,
    }
  },
  mounted() {
    if (this.autofocus) {
      this.$refs.textarea.focus();
    }
  },
  computed: {
    textareaClassObject() {
      const hasText = this.text !== '' && this.text !== undefined
      const hasPlaceholder =
          this.placeholder !== '' && this.placeholder !== undefined

      return {
        'has-value': hasText || hasPlaceholder,
        'has-label': this.label !== '' && this.label !== undefined,
        'has-vertical-resize': this.resize === 'vertical' && !this.autogrow,
        'has-horizontal-resize': this.resize === 'horizontal' && !this.autogrow,
        'has-no-resize': this.resize === 'none',
        'has-autogrow': this.autogrow,
      }
    },
  },
  watch: {
    modelValue(newModelValue) {
      this.text = newModelValue
    },
    text(newValue) {
      if (this.autogrow) {
        this.$el.dataset.replicatedText = newValue
      }

      this.$emit('update:modelValue', newValue)
    },
  },
  methods: {
    onLabelClick() {
      this.$refs.textarea.focus()
    },
  },
}
</script>
<style scoped>
.c-Textarea {
  position: relative;
  width: 100%;
  height: 100%;
}

.c-Textarea__input {
  overflow: auto;
  width: 100%;
  height: 100%;
  cursor: pointer;
  z-index: 1;
  position: relative;
}


.c-Textarea__input:invalid {
  border-color: #e53935;
  color: #e53935;
}

.c-Textarea__input:invalid:focus {
  box-shadow: inset 0 0 0 1px #e53935;
}

.c-Textarea__input:disabled {
  cursor: not-allowed;
  border-color: #757575;
  color: #757575;
  background-color: #e0e0e0;
}

.c-Textarea__input:disabled + .c-Textarea__label {
  cursor: not-allowed;
  color: #757575;
}

.c-Textarea.has-vertical-resize .c-Textarea__input {
  resize: vertical;
}

.c-Textarea.has-horizontal-resize .c-Textarea__input {
  resize: horizontal;
}

.c-Textarea.has-no-resize .c-Textarea__input {
  resize: none;
}

/**
 * Autogrow - https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas/
 *
 * We create an invisible pseudo element exactly in the same place as the textarea.
 * The pseudo element has a mirror of the content and will grow according to it.
 */

.c-Textarea.has-autogrow {
  display: grid;
}

.c-Textarea.has-autogrow::after {
  content: attr(data-replicated-text) ' ';
  white-space: pre-wrap;
  visibility: hidden;
  grid-area: 1 / 1 / 2 / 2;
  /* Properties that affect height need to match the textarea element */
  @apply py-2.5 px-4 text-sm font-medium;
}

.c-Textarea.has-autogrow .c-Textarea__input {
  resize: none;
  /* Hide jumpy scrollbars in Firefox */
  overflow: hidden;
  grid-area: 1 / 1 / 2 / 2;
}
</style>