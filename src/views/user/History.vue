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
        <td>Rp{{ (transaction.transaction_total * (transaction ? transaction.laundry_shop ? transaction.laundry_shop.name : 0 : 0)) + transaction.postal_fee }}</td>
        <td v-if="transaction.transaction_status==='SUCCESS'">
          <b-button variant="success" @click.prevent="changeStatusTransaction(transaction.id)" class="w-100">{{transaction.transaction_status}}</b-button>
        </td>
        <td v-if="transaction.transaction_status==='FAILED'">
          <b-button variant="danger" @click.prevent="changeStatusTransaction(transaction.id)" class="w-100">{{transaction.transaction_status}}</b-button>
        </td>
        <td v-if="transaction.transaction_status==='PENDING'">
<!--          <b-button variant="warning" @click.prevent="changeStatusTransaction(transaction.id)" class="w-100">{{transaction.transaction_status}}</b-button>-->
          <b-badge pill variant="primary">{{ transaction.transaction_status }}</b-badge>
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
        const res = await axios.get('transaction')

        if (res && res.hasOwnProperty('data')) {
          this.userTransactions = res.data.filter(data => {
            return data.userId === this.user.id
          })
          console.log(this.userTransactions)
        }
      } catch (error) {
        this.$notify('danger', 'Something Bad Happened', error, { duration: 5000 })
      }
    },
    async changeStatusTransaction (id) {
      const con = confirm('you"ve got your laundry ?')
      if (con === true) {
        const res = await axios.put('transaction/' + id, { transaction_status: 'SUCCESS' })
        if (res) {
          console.log(res)
          setTimeout(() => {
            window.location.reload()
          }, 2000)
        } else {
          console.log('error')
        }
      }
    }
  }
}
</script>
