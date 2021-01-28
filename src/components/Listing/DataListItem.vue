<template>
  <b-card :class="{'d-flex flex-row':true}" no-body>
    <div class="position-relative">
      <span :class="'badge position-absolute badge-top-left badge-'+ data.statusColor +' badge-pill'">{{ data.status }}</span>
    </div>
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
        <div v-if="data.total" class="w-10 w-sm-100">
          <p class="">Weight: {{ data.total }}/kg</p>
          <p class="">Price: Rp{{ data.price * data.total }}</p>
          <p class="">Delivery: Rp{{ data.postal_fee }}</p>
          <p class="font-weight-bold mb-0">Total: Rp{{ (Number(data.price * data.total) + Number(data.postal_fee)) }}</p>
          <b-button v-if="data.status === 'ON PROGRESS'" variant="primary" size="sm" class="mt-3"
                    @click="changeTransactionTotal(data)">Complete
          </b-button>
        </div>
        <div v-if="!data.total" class="w-10 w-sm-100">
          <b-form-group :label="'Laundry Weight /kg'">
            <b-form-input type="number" v-model="formData.transaction_total"/>
            <b-button variant="primary" class="mt-3" @click="changeTransactionTotal(data)" size="sm">Submit</b-button>
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
    changeTransactionTotal (data) {
      let payload = {}

      if (data.status === 'PENDING') {
        Object.assign(payload, { transaction_status: 'ON PROGRESS', transaction_total: this.formData.transaction_total })
      } else if (data.status === 'ON PROGRESS') {
        Object.assign(payload, { transaction_status: 'SUCCESS' })
      }

      axios.put('transaction/' + data.id, payload)
        .then((res) => {
          if (res) {
            this.$notify('success', 'Success', 'Transactions has been updated', { duration: 5000 })
            this.$emit('success')
          }
        })
        .catch(() => {
          this.$notify('danger', 'Error', 'Something Bad Happened', { duration: 5000 })
        })
    }
  }
}
</script>
