<template>
  <input type="file" @change="onChange" multiple>
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

const mutationName = props.type === 'avatar'
    ? 'uploadUserAvatar'
    : 'uploadUserCover';

const onChange = async (event) => {
  const image = event.target.files[0]

  if (! image) {
    return
  }

  const formData = new FormData()

  formData.append('image', image)

  formData.set('operations', JSON.stringify({
    query: `mutation ($image: Upload!) { upload: ${mutationName}(image: $image) }`,
    variables: {
      image: [null],
    }
  }))

  formData.set('operationName', null)

  formData.set('map', JSON.stringify({
    image: ['variables.image'],
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