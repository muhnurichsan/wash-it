<template>
  <div class="home">
    <HeaderShayna/>
    <!-- Breadcrumb Section Begin -->
    <div class="breacrumb-section text-left">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="breadcrumb-text product-more">
              <router-link to="/"><i class="iconsminds-home"></i> Home</router-link>
              <router-link to="/cart">Shopping Cart</router-link>
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
              <div class="col-lg-12">
                <div class="cart-table">
                  <table>
                    <thead>
                    <tr>
                      <th>Image</th>
                      <th class="p-name text-center">Product Name</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="cart in carts" :key="cart.id">
                      <td class="cart-pic first-row">
                        <img :src="cart.photo"/>
                      </td>
                      <td class="cart-title first-row text-center">
                        <h5>{{ cart.name }}</h5>
                      </td>
                      <td class="p-price first-row">${{ cart.price }}.00</td>
                      <td class="delete-item" @click="removeCart(index)">
                        <a href="#">
                          <i class="simple-icon-clock"></i>
                        </a>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="col-lg-8">
                <h4 class="mb-4">Informasi Pembeli:</h4>
                <div class="user-checkout text-left">
                  <form @submit.prevent>
                    <div class="form-group">
                      <label for="namaLengkap">Nama lengkap</label>
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
                      <label for="namaLengkap">Email Address</label>
                      <input
                        type="email"
                        class="form-control"
                        id="emailAddress"
                        aria-describedby="emailHelp"
                        placeholder="Masukan Email"
                        v-model="order.email"
                      />
                    </div>
                    <div class="form-group">
                      <label for="namaLengkap">No. HP</label>
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
                      <label for="alamatLengkap">Alamat Lengkap</label>
                      <textarea
                        class="form-control"
                        id="alamatLengkap"
                        rows="3"
                        v-model="order.address"
                      ></textarea>
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
                    <li class="subtotal">
                      ID Transaction <span>#SH12000</span>
                    </li>
                    <li class="subtotal mt-3">
                      Subtotal <span>${{ totalHarga }}.00</span>
                    </li>
                    <li class="subtotal mt-3">Pajak <span>10%</span></li>
                    <li class="subtotal mt-3">
                      Total Biaya
                      <span>${{ totalBiaya }}0</span>
                    </li>
                    <li class="subtotal mt-3">
                      Bank Transfer <span>Mandiri</span>
                    </li>
                    <li class="subtotal mt-3">
                      No. Rekening <span>2208 1996 1403</span>
                    </li>
                    <li class="subtotal mt-3">
                      Nama Penerima <span>Shayna</span>
                    </li>
                  </ul>
                  <a @click="checkout" href="#" class="proceed-btn"
                  >I ALREADY PAID</a
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
