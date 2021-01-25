<template>
  <b-card :class="{'d-flex flex-row':true}" no-body>
    <div class="pl-2 d-flex flex-grow-1 min-width-zero">
      <div
          class="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
        <router-link :to="`?p=${data.id}`" class="w-15 w-sm-100">
          <p class="list-item-heading mb-1 truncate text-capitalize">
            <i class="iconsminds-male mr-5"/>
            {{ data.title }}
          </p>
        </router-link>
        <a :href="'tel:'+data.phone" class="mb-1 text-muted text-small w-15 w-sm-100 d-flex align-items-center">
          <i class="simple-icon-phone mr-5"/>
          {{ data.phone }}
        </a>
        <p class="mb-1 text-muted text-small w-20 w-sm-100 text-capitalize">
          <i class="iconsminds-location-2"/>
          {{ data.address }}
        </p>
        <p class="mb-1 text-muted text-small w-15 w-sm-100">
          <i class="simple-icon-calendar"/>
          {{ data.date }}
        </p>
        <div class="w-10 w-sm-100">
          <b-badge pill :variant="data.statusColor">{{ data.status }}</b-badge>
        </div>
        <div class="w-10 w-sm-100">
          <b-form-group :label="'laundry weight /kg'">
            <p >{{ data.total }}</p>
            </b-form-group>
        </div>
        <div class="w-10 w-sm-100">
          <b-form-group :label="'laundry weight /kg'">
            <b-form-input type="number" v-model="formData.transaction_total"/>
            <b-button variant="primary" class="mt-3" @click="changeTransactionTotal(data.id)">Submit</b-button>
          </b-form-group>
        </div>
      </div>
      <!--            <div class="custom-control custom-checkbox pl-1 align-self-center pr-4">-->
      <!--                <b-form-checkbox :checked="selectedItems.includes(data.id)" class="itemCheck mb-0"/>-->
      <!--            </div>-->
    </div>
  </b-card>
</template>
<script>
import axios from 'axios'

export default {
  props: ['data'],
  data () {
    return {
      formData: {
        transaction_total: ''
      }
    }
  },
  methods: {
    toggleItem (event, itemId) {
      this.$emit('toggle-item', event, itemId)
    },
    async changeTransactionTotal (id) {
      const res = await axios.put('transaction/' + id, { transaction_total: this.formData.transaction_total })
      if (res) {
        console.log(res)
        window.location.reload()
      } else {
        console.log('error')
      }
    }
  }
}
</script>
