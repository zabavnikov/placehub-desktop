<template>
  <Dialog title="Добавление места">
    <div class="w-[528px]">
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
        <div>
          <label class="form-label asterisk" for="country">Страна</label>
          <div class="form-control">
            <SearchPlace
              placeholder="Выберите страну"
              :search-by="['countries']"
              @update:modelValue="onSelect($event, 'country')" />
          </div>
        </div>

        <div v-if="form.country.id > 0">
          <label class="form-label asterisk" for="region">Регион, область, край и т.д</label>
          <div class="form-control">
            <SearchPlace
              placeholder="Введите название"
              :search-by="['regions']"
              :parent-id="form.country.id"
              @update:modelValue="onSelect($event, 'region')"
            />
          </div>
        </div>

        <div v-if="form.region.name && addLocality">
          <label class="form-label asterisk" for="locality">Населенный пункт</label>
          <div class="form-control">
            <SearchPlace
              placeholder="Введите название"
              :search-by="['localities']"
              :parent-id="form.region.id"
              @update:modelValue="onSelect($event, 'locality')"
            />
          </div>
        </div>

        <div v-if="(form.region.name || form.locality.name) && addPoi">
          <label class="form-label asterisk" for="poi">Место</label>
          <div class="form-control">
            <SearchPlace
                placeholder="Введите название"
                :search-by="poiSearchBy"
                :parent-id="poiParentId"
                @update:modelValue="onSelect($event, 'poi')"
            />
          </div>
        </div>

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
import { useGql } from '~/uses'

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
    poiSearchBy() {
      return [this.hasLocality ? 'localities' : 'regions']
    },
    poiParentId() {
      return this.hasLocality ? this.form.locality.id : this.form.region.id
    },
  },
  methods: {
    onSelect(place, type) {
      this.form[type].id   = place.id
      this.form[type].name = place.name
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
        const { createPlace } = await useGql(`
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
      `, this.form)

        this.$emit('created', createPlace)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>