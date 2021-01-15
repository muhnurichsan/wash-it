<template>
  <div class="home">
    <HeaderShayna/>
    <!-- Breadcrumb Section Begin -->
    <div class="breacrumb-section text-left">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="breadcrumb-text product-more">
              <router-link to="/">
                <i class="iconsminds-home"></i> Home
              </router-link>
              <router-link to="/order">Booking Order</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Breadcrumb Section Begin -->
    <!-- Shopping Cart Section Begin -->
    <section class="shopping-cart spad">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="row">
              <div class="col-lg-12"></div>
              <div class="col-lg-8">
                <h4 class="mb-4">Costumer Information:</h4>
                <div class="user-checkout text-left">
                  <form @submit.prevent>
                    <div class="form-group">
                      <label for="namaLengkap">Customer Name</label>
                      <input
                          type="text"
                          class="form-control"
                          id="namaLengkap"
                          aria-describedby="namaHelp"
                          placeholder="Masukan Nama"
                          v-model="order.name"
                      />
                    </div>
                    <div class="form-group">
                      <label for="alamatLengkap">Full Address</label>
                      <textarea
                          class="form-control"
                          id="alamatLengkap"
                          rows="3"
                          v-model="order.address"
                      ></textarea>
                    </div>

                    <div class="form-group">
                      <label for="namaLengkap">Phone Number</label>
                      <input
                          type="text"
                          class="form-control"
                          id="noHP"
                          aria-describedby="noHPHelp"
                          placeholder="Masukan No. HP"
                          v-model="order.number"
                      />
                    </div>
                    <div class="form-group">
                      <label for="namaLengkap">Additional Info</label>
                      <input
                          type="email"
                          class="form-control"
                          id="emailAddress"
                          aria-describedby="emailHelp"
                          placeholder="Masukan Email"
                          v-model="order.email"
                      />
                    </div>
                    <button class="btn btn-primary" @click="checkout">
                      kirim
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="row">
              <div class="col-lg-12">
                <div class="proceed-checkout text-left">
                  <ul>
                    <li class="subtotal mt-3">
                      Subtotal <span>${{ totalHarga }}.00</span>
                    </li>
                    <li class="subtotal mt-3">
                      Postal Fee / kilometer<span>8000</span>
                    </li>
                    <li class="subtotal mt-3">
                      Total Biaya
                      <span>Rp.{{ totalBiaya }}0</span>
                    </li>
                    <li class="subtotal mt-3">Payment <span>COD</span></li>
                    <li class="subtotal mt-3">
                      Courier Name <span>Shayna</span>
                    </li>
                  </ul>
                  <a @click="checkout" href="/history" class="proceed-btn"
                  >Check Order</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Shopping Cart Section End -->

    <Footer/>
  </div>
</template>

<script>
import HeaderShayna from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    HeaderShayna,
    Footer
  },
  data () {
    return {
      carts: [],
      order: {}
    }
  },
  methods: {
    removeCart (x) {
      this.carts.splice(x, 1)
      const parsed = JSON.stringify(this.carts)
      localStorage.setItem('carts', parsed)
    },
    checkout: function () {
      let productIds = this.carts.map(function (product) {
        return product.id
      })
      let checkoutData = {
        name: this.order.name,
        email: this.order.email,
        address: this.order.address,
        number: this.order.number,
        transaction_total: this.totalBiaya,
        transaction_status: 'PENDING',
        transaction_details: productIds
      }
      axios
        .post('http://localhost:3000/pesanan', checkoutData)
        .then(() => {
          this.$router.push({ path: '/success' })
        })
        .catch((err) => console.log(err, checkoutData))
    }
  },
  computed: {
    totalHarga () {
      return this.carts.reduce(function (items, data) {
        return items + data.price
      }, 0)
    },
    pajak () {
      return (this.totalHarga * 10) / 100
    },
    totalBiaya () {
      return this.totalHarga + this.pajak
    }
  },
  mounted () {
    if (localStorage.getItem('carts')) {
      try {
        this.carts = JSON.parse(localStorage.getItem('carts'))
      } catch (e) {
        localStorage.removeItem('carts')
      }
    }
  }
}
</script>
