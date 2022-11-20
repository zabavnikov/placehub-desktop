<template>
  <div>
    <input type="file" ref="file" @change="onChange" multiple v-show="false">
    <div @click="$refs.file.click()">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { useNuxtApp, useRuntimeConfig, useFetch } from 'nuxt/app'

const config = useRuntimeConfig()

const emit = defineEmits([
  'uploaded'
])

const props = defineProps({
  type: {
    type: String,
    required: true,
  }
})

const onChange = async (event) => {
  const image = event.target.files[0]

  if (! image) {
    return
  }

  const formData = new FormData()

  formData.append('image', image)

  formData.set('operations', JSON.stringify({
    query: `mutation ($image: Upload!, $type: String!) { upload: userUpload(image: $image, type: $type) }`,
    variables: {
      type: props.type,
      image: [null],
    }
  }))

  formData.set('operationName', null)

  formData.set('map', JSON.stringify({
    image: ['variables.image'],
    type: ['variables.$type'],
  }))

  try {
    const { data } = await useFetch(
      config.GRAPHQL_URL,
      {
        body: formData,
        headers: {
          Accept: 'application/json',
          Authorization: useNuxtApp().$auth.strategy.token.get()
        },
        transform: data => data.data,
        method: 'POST',
        async onResponse({ response }) {
          if (response?._data?.errors) {
            return new Promise((resolve, reject) => reject(response._data.errors))
          }
        }
      }
    )

    emit('uploaded', data.value.upload)
  } catch (error) {
    console.log(error)
  } finally {
    event.target.value = ''
  }
}
</script>