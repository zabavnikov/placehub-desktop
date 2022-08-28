<template>
  <div @click="onClick" :class="classes" :title="like.isLiked ? 'Вам понравилось' : 'Мне нравится'">
    <heart-icon class="h-5 w-5" :class="{'text-red-500': like.isLiked}"></heart-icon>
    <!--      <div class="v-like__count help">{{ like.count }}</div>-->
  </div>
</template>

<script>
import { HeartIcon } from '@heroicons/vue/24/outline'
import { useGql } from '~/uses';
import { CREATE_LIKE, DELETE_LIKE } from './graphql'

export default {
  name: 'VLike',
  components: {
    HeartIcon
  },
  props: {
    modelType: {
      type: String,
      required: true,
    },
    modelId: {
      type: Number,
      required: true,
    },

    isLiked: {
      type: Boolean,
    },

    count: {
      type: Number,
      default: 0,
    },

    width: {
      type: String,
      default: '24',
    },
    height: {
      type: String,
      default: '24'
    },
    color: {
      type: String,
      default: '#ccc'
    }
  },

  data() {
    return {
      like: {
        isLiked: this.isLiked,
        count: this.count,
      },
      loading: false,
    }
  },

  computed: {
    classes() {
      return {
        'v-like': true,
        'v-like--loading': this.loading,
      }
    }
  },

  methods: {
    async onClick() {
      if (this.loading) {
        return;
      }

      this.loading = true;

      try {
        const { data } = await useGql(this.like.isLiked
            ? DELETE_LIKE
            : CREATE_LIKE, {
          modelType:  this.modelType,
          modelId:    this.modelId,
        })

        this.like.isLiked = (data.like === 'like');

        if (this.like.isLiked) {
          this.like.count++;
        } else if (this.like.count > 0) {
          this.like.count--;
        }
      } catch (error) {}
      finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss">
.v-like {
  cursor: pointer;
  display: flex;
  align-items: center;

  .v-like__count {
    margin-left: 8px;
  }
}
</style>
