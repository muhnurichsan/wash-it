<template>
  <div class="home">
    <HeaderShayna/>
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
                          v-model="order.customer_name"
                          required
                      />
                    </div>
                    <div class="form-group">
                      <label for="alamatLengkap">Full Address</label>
                      <textarea
                          class="form-control"
                          id="alamatLengkap"
                          rows="3"
                          v-model="order.address"
                          required
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
                          v-model="order.contact_person"
                      />
                    </div>
                    <div class="form-group">
                      <label for="namaLengkap">Additional Info</label>
                      <input
                          type="text"
                          class="form-control"
                          aria-describedby="emailHelp"
                          placeholder="Masukan keterangan tambahan"
                          v-model="order.additional_info"

                      />
                    </div>
                    <a href="#" class="btn btn-primary" @click="checkoutOrder">
                      Booking
                    </a>
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
                      Laundry Shop Name<span>{{laundrySelect.name}}</span>
                    </li>
                    <li class="subtotal mt-3">
                      Postal Fee / kilometer<span>4000</span>
                    </li>
                    <li class="subtotal mt-3">Payment <span>COD</span></li>
                    <li class="subtotal mt-3">
                      Courier Name <span>Shayna</span>
                    </li>
                  </ul>
                  <router-link to="/history" class="proceed-btn"
                  >Check Order</router-link
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
      order: {},
      laundrySelect: {},
      user: {}
    }
  },
  methods: {
    checkoutOrder: function () {
      let orderData = {
        customer_name: this.order.customer_name,
        contact_person: this.order.contact_person,
        address: this.order.address,
        additional_info: this.order.additional_info,
        postal_fee: 4000,
        transaction_status: 'PENDING',
        laundryShopId: this.laundrySelect.id,
        userId: this.user.id
      }
      axios
        .post('transaction', orderData)
        .then(() => {
          this.$router.push({ path: '/success' })
        })
        .catch((err) => console.log(err))
    }
  },
  mounted () {
    if (localStorage.getItem('laundrySelect') && localStorage.getItem('user')) {
      try {
        this.laundrySelect = JSON.parse(localStorage.getItem('laundrySelect'))
        this.user = JSON.parse(localStorage.getItem('user'))
      } catch (e) {
        localStorage.removeItem('carts')
      }
    }
  }
}
</script>
