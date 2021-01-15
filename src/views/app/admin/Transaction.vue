<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb :heading="$t('menu.transaction')"/>
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <div v-if="isLoading" class="text-center">
      <b-spinner type="grow" label="Spinning"></b-spinner>
    </div>
    <div v-if="!isLoading && items.length === 0" class="text-center">
      You have no transactions
    </div>
    <b-row v-if="!isLoading && items.length">
      <b-colxx xxs="12" class="mb-3" v-for="(item,index) in items" :key="index" :id="item.id">
        <data-list-item
            :key="item.id"
            :data="item"
            v-contextmenu:contextmenu
        />
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
import DataListItem from '@/components/Listing/DataListItem'
import axios from 'axios'
import dayjs from 'dayjs'

export default {
  components: {
    DataListItem
  },
  data () {
    return {
      isLoading: true,
      items: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      this.isLoading = true
      try {
        const res = await axios.get('transaction')
        if (res && res.hasOwnProperty('data') && res.data.length) {
          res.data.map((val) => {
            this.items.push({
              id: val.id,
              title: val.customer_name,
              phone: val.contact_person,
              address: `${val.address}, ${val.additional_info}`,
              date: dayjs(val.createdAt).format('DD MMMM YYYY'),
              status: val.transaction_status,
              statusColor: 'warning'
            })
          })
        }
      } catch (error) {
        this.$notify('danger', 'Something Bad Happened', error, { duration: 5000 })
      }

      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    }
  }
}
</script>
