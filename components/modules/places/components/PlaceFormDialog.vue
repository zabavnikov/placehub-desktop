<template>
  <Dialog title="Добавление места">
    <div class="w-[528px]">
    <ul v-if="form.country.name && form.region.name" class="flex flex-wrap space-x-0.5 mb-4 text-sm">
      <li v-for="(place, key) in form" :key="key">
        <div v-if="place.name" class="flex items-center space-x-0.5">
          <span v-if="key !== 'country'">&raquo;</span>
          <span>{{ place.name }}</span>
          <v-icon v-if="key !== 'country'" @click="onDelete(key)" name="x" class="w-4 h-4 text-pink cursor-pointer" />
        </div>
      </li>
    </ul>

    <form @submit.prevent="onSubmit" class="space-y-4">
      <div>
        <label class="form-label asterisk" for="country">Страна</label>
        <div class="form-control">
<!--          <PlaceSearch placeholder="Выберите страну" :search-by="['countries']" @select="onSelect($event, 'country')" />-->
        </div>
      </div>

      <div v-if="form.country.id > 0">
        <label class="form-label asterisk" for="region">Регион, область, край и т.д</label>
        <div class="form-control">
<!--          <PlaceSearch
              placeholder="Введите название"
              :search-by="['regions']"
              :parent-id="form.country.id"
              @input="form.region.name = $event"
              @select="onSelect($event, 'region')"
          />-->
        </div>
      </div>

      <div v-if="form.region.name && addLocality">
        <label class="form-label asterisk" for="locality">Населенный пункт</label>
        <div class="form-control">
<!--          <PlaceSearch
              placeholder="Введите название"
              :search-by="['localities']"
              :parent-id="form.region.id"
              @input="form.locality.name = $event"
              @select="onSelect($event, 'locality')"
          />-->
        </div>
      </div>

      <div v-if="(form.region.name || form.locality.name) && addPoi">
        <label class="form-label asterisk" for="poi">Место</label>
        <div class="form-control">
<!--          <PlaceSearch
              placeholder="Введите название"
              :search-by="poiSearchBy"
              :parent-id="poiParentId"
              @input="form.poi.name = $event"
              @select="onSelect($event, 'poi')"
          />-->
        </div>
      </div>

      <div v-if="form.region.name" class="space-y-1">
        <div v-if="!addLocality" class="add-button" @click="addLocality = !addLocality">Прикрепить населенный пункт</div>
        <div v-if="!addPoi" class="add-button" @click="addPoi = !addPoi">Прикрепить место</div>
      </div>

      <v-button type="submit" theme="primary">Создать</v-button>
    </form>
    </div>
  </Dialog>
</template>

<script>
// import PlaceSearch from '~/modules/places/components/PlaceSearch'
import Dialog from '~/components/common/Dialog.vue'
import cloneDeep from 'lodash/cloneDeep'
import { useGql } from '~/uses'

const initialFields = {
  id:   null,
  name: null,
}

const formInitialState = {
  country:  {...initialFields},
  region:   {...initialFields},
  locality: {...initialFields},
  poi:      {...initialFields},
}

export default {
  components: {
    Dialog
  },
  data() {
    return {
      form:        cloneDeep(formInitialState),
      addLocality: false,
      addPoi:      false,
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
    }
  },
  methods: {
    onSelect(place, type) {
      this.form[type].id    = place.id
      this.form[type].name  = place.name
    },
    onDelete(type) {
      if (type === 'region') {
        this.form          = cloneDeep(formInitialState)
        this.addLocality   = false
        this.addPoi        = false
      }
      if (type === 'locality') {
        this.form.locality = {...initialFields}
        this.form.poi      = {...initialFields}
        this.addLocality   = false
        this.addPoi        = false
      }
      if (type === 'poi') {
        this.form.poi = {...initialFields}
        this.addPoi   = false
      }
    },
    async onSubmit() {
      if (! this.form?.locality?.name) {
        delete this.form.locality
      }

      if (! this.form?.poi?.name) {
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
    }
  }
}
</script>