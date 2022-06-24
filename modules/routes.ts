import { existsSync, readdirSync } from 'fs'
import { defineNuxtModule, extendPages } from '@nuxt/kit'
import { resolve } from 'pathe'

const routes = [];

readdirSync('./components/modules')
  .forEach(folder => {
    if (existsSync(`./components/modules/${folder}/routes.ts`)) {
      routes.push(...require(`../components/modules/${folder}/routes.ts`).default);
    }
  });

export default defineNuxtModule({
  setup () {
    extendPages((pages) => {
      routes.forEach(route => {
        pages.push({
          name: route.name,
          path: route.path,
          file: resolve(__dirname, `../components/modules/${route.name.split('.')[0]}/pages/${route.file}.vue`)
        })
      })
    })
  }
})