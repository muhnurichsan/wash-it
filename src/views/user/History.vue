<template>
  <div class="home">
    <HeaderShayna/>

    <table class="table">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Laundry Shop Name</th>
        <th scope="col">Order Date</th>
        <th scope="col">Total Cost</th>
        <th scope="col">Transaction Status / Verify </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(transaction,index) in userTransactions" :key ="transaction.id">
        <th scope="row">{{index + 1}}</th>
        <td>{{ transaction ? transaction.laundry_shop ? transaction.laundry_shop.name : '-' : '' }}</td>
        <td>{{ transaction ? transaction.createdAt ? dateFormat(transaction.createdAt) : '-' : '' }}</td>
        <td v-if="transaction && transaction.laundry_shop">
          Rp <span>
          {{ (Number(transaction.transaction_total) * Number(transaction.laundry_shop.price)) + Number(transaction.laundry_shop.postal_fee) }}
        </span>
        </td>
        <td v-if="transaction.transaction_status==='SUCCESS'">
          <b-button id="button-success" size="sm" variant="outline-success" @click.prevent="changeStatusTransaction(transaction.id)">
            {{transaction.transaction_status}}
          </b-button>
        </td>
        <td v-if="transaction.transaction_status==='FAILED'">
          <b-button variant="danger" size="sm" @click.prevent="changeStatusTransaction(transaction.id)" class="w-100">{{transaction.transaction_status}}</b-button>
        </td>
        <td v-if="transaction.transaction_status==='PENDING' || transaction.transaction_status === 'ON PROGRESS'">
          <b-button size="sm" disabled :variant="transaction.transaction_status==='PENDING' ? 'warning' : 'secondary'">{{ transaction.transaction_status }}</b-button>
        </td>
        <td v-if="transaction.transaction_status==='COMPLETED'">
          <b-button size="sm" disabled :variant="'success'">{{ transaction.transaction_status }}</b-button>
        </td>
      </tr>

      </tbody>
    </table>

    <Footer/>
  </div>
</template>

<script>
import HeaderShayna from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import axios from 'axios'
import dayjs from 'dayjs'

export default {
  name: 'History',
  components: {
    HeaderShayna,
    Footer
  },
  data () {
    return {
      isLoading: true,
      userTransactions: [],
      user: {}
    }
  },
  created () {
    this.fetchLaundryShop()
  },
  methods: {
    dateFormat (date) {
      return dayjs(date).format('DD MMMM YYYY, HH:mm')
    },
    async fetchLaundryShop () {
      if (localStorage.getItem('user')) {
        try {
          this.user = JSON.parse(localStorage.getItem('user'))
        } catch (e) {
          localStorage.removeItem('carts')
        }
      }
      this.isLoading = false
      try {
        this.userTransactions = []
        const res = await axios.get('transaction')

        if (res && res.hasOwnProperty('data')) {
          this.userTransactions = res.data.filter(data => {
            return data.userId === this.user.id
          })
        }
      } catch (error) {
        this.$notify('danger', 'Something Bad Happened', error, { duration: 5000 })
      }
    },
    async changeStatusTransaction (id) {
      this.$bvModal.msgBoxConfirm('You have got your laundry?', {
        title: 'Please Confirm',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'success',
        okTitle: 'YES',
        cancelTitle: 'NOT YET',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
        .then(async (value) => {
          if (value) {
            const res = await axios.put('transaction/' + id, { transaction_status: 'COMPLETED' })
            if (res) {
              this.$notify('success', 'Success', 'Transaction has been successfully updated!', { duration: 5000 })
            } else {
              this.$notify('danger', 'Error', 'Something Bad Happened', { duration: 5000 })
            }
            await this.fetchLaundryShop()
          }
        })
        .catch(() => {
          this.$notify('danger', 'Error', 'Something Bad Happened', { duration: 5000 })
        })
    }
  }
}
</script>
