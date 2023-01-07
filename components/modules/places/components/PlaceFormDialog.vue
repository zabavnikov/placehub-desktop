<template>
  <Dialog title="Добавление места">
    <div>
      <ul v-if="form.country.name && form.region.name" class="flex flex-wrap space-x-0.5 mb-4 text-sm">
        <li v-for="(place, key) in form" :key="key">
          <div v-if="place.name" class="flex items-center space-x-0.5">
            <span v-if="key !== 'country'">&raquo;</span>
            <span>{{ place.name }}</span>
<!--            <v-icon v-if="key !== 'country'" @click="onDelete(key)" name="x" class="w-4 h-4 text-pink cursor-pointer"/>-->
          </div>
        </li>
      </ul>

      <form @submit.prevent="onSubmit" class="space-y-4">
        <FormField name="country" label="Страна" required>
          <SearchPlace
              placeholder="Выберите страну"
              :search-by="['countries']"
              @update:modelValue="onSelect('country', $event)" />
        </FormField>

        <FormField name="region" v-if="form.country.id > 0" label="Регион, область, край и т.д" required>
          <SearchPlace
              placeholder="Введите название"
              can-create
              :search-by="['regions']"
              :parent-id="form.country.id"
              @update:modelValue="onSelect('region', $event)"
          />
        </FormField>

        <FormField name="locality" v-if="form.region.name && addLocality" label="Населенный пункт">
          <SearchPlace
              placeholder="Введите название"
              can-create
              :search-by="['localities']"
              :parent-id="form.region.id"
              @update:modelValue="onSelect('locality', $event)"
          />
        </FormField>

        <FormField name="poi" v-if="(form.region.name || form.locality.name) && addPoi" label="Место">
          <SearchPlace
              placeholder="Введите название"
              can-create
              :search-by="['poi']"
              :parent-id="poiParentId"
              @update:modelValue="onSelect('poi', $event)"
          />
        </FormField>

        <div v-if="form.region.name" class="space-y-1">
          <div v-if="!addLocality" class="add-button" @click="addLocality = !addLocality">Прикрепить населенный пункт
          </div>
          <div v-if="!addPoi" class="add-button" @click="addPoi = !addPoi">Прикрепить место</div>
        </div>

        <Button type="submit" variant="primary">Создать</Button>
      </form>
    </div>
  </Dialog>
</template>

<script>
import Dialog from '~/components/common/Dialog.vue'
import { cloneDeep } from 'lodash-es'

const initialState = {
  id:   null,
  name: null,
}

const formInitialState = {
  country:  {...initialState},
  region:   {...initialState},
  locality: {...initialState},
  poi:      {...initialState},
}

export default {
  components: {
    Dialog,
  },
  data() {
    return {
      form: cloneDeep(formInitialState),
      addLocality: false,
      addPoi: false,
    }
  },
  computed: {
    hasLocality() {
      return this.form.locality.name
    },
    poiParentId() {
      return this.hasLocality ? this.form.locality.id : this.form.region.id
    },
  },
  methods: {
    onSelect(type, place) {
      this.form[type].id   = place.id
      this.form[type].name = place.name || place.full_name
    },
    onDelete(type) {
      if (type === 'region') {
        this.form = cloneDeep(formInitialState)
        this.addLocality = false
        this.addPoi = false
      }
      if (type === 'locality') {
        this.form.locality = { ...initialState }
        this.form.poi = { ...initialState }
        this.addLocality = false
        this.addPoi = false
      }
      if (type === 'poi') {
        this.form.poi = { ...initialState }
        this.addPoi = false
      }
    },
    async onSubmit() {
      if (!this.form?.locality?.name) {
        delete this.form.locality
      }

      if (!this.form?.poi?.name) {
        delete this.form.poi
      }

      try {
        const { data: { createPlace } } = await useQuery({
          query: `
            mutation (
              $country:  CountryInput!
              $region:   RegionInput!
              $locality: LocalityInput
              $poi:      PoiInput
          ) {
            createPlace(
              country:   $country,
              region:    $region,
              locality:  $locality,
              poi:       $poi,
            ) {
              id
              parent_id
              name
              full_name
              parent {
                id
                parent_id
                name
                parent {
                  id
                  parent_id
                  name
                  parent {
                    id
                    parent_id
                    name
                  }
                }
              }
            }
          }
        `,
          variables: this.form
        })

        this.$emit('created', createPlace)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>