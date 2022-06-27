<template>
  <div class="v-textarea">
    <textarea
        :id="id"
        :value="value"
        :rows="rows"
        :autofocus="autofocus"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxlength"
        @input="$emit('input', $event.target.value)"
        @focus="$emit('focus')"
        @paste="onPaste"
        ref="textarea"
        class="input"
    >
    </textarea>
  </div>
</template>

<style lang="scss">
.input {
  @apply text-base font-semibold;
  display: block;
  width: 100%;
  height: 36px;
  background-color: #fff;
  padding-right: 8px;
  padding-left: 8px;
  border: 1px solid #cfd8dc;
  border-radius: 4px;;
  line-height: normal;
  box-shadow: inset 0 2px rgba(0,0,0,0.04);

  &--sm {
    height: 32px;
  }

  &::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #bdbdbd;
    opacity: 1; /* Firefox */
  }

  &:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: #bdbdbd;
  }

  &::-ms-input-placeholder { /* Microsoft Edge */
    color: #bdbdbd;
  }

  &:focus {
    outline: none;
    border-color: #2196f3;
  }
}

textarea.input {
  display: block;
  width: 100%;
  resize: none;
  overflow: hidden;
  padding: 9px 8px;
  line-height: 20px;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0 1000px #fff inset;
}

</style>

<script>
// Utils
// import regExpUrl from '~/utils/regexp-url';

export default {
  props: {
    id: String,
    value: String,
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

    parseUrl: {
      type: Boolean,
      default: false,
    }
  },

  data() {
    return {
      parse: false
    }
  },

  watch: {
    value: {
      handler() {
        this.updateHeight();
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
  },

  methods: {
    updateHeight() {
      this.$nextTick()
          .then(() => {
            const textarea = this.$refs.textarea;

            if (textarea) {
              textarea.style.height = 'auto';
              textarea.style.height = textarea.scrollHeight + 'px';
            }
          });
    },

    /*onPaste: function (event) {
      if (this.parse) return;

      let text = event.clipboardData.getData('text');

      if (this.parseUrl === true) {
        const matches = text.match(regExpUrl);

        if (matches) {
          this.$emit('parse-url-progress', this.parse = true);

          this.$refs.textarea.innerText = this.$refs.textarea.innerText.replace(regExpUrl, '');

          this.$axios
              .$post('/api/urls', {
                url: matches[0]
              })
              .then(url => {
                this.$emit('url', url);
              })
              .finally(() => {
                this.$emit('parse-url-progress', this.parse = false);
              });

          event.preventDefault();
        }
      }
    }*/
  }
}
</script>
