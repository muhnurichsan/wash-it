<template>
  <div class="home">
    <HeaderShayna/>
    <!-- Breadcrumb Section Begin -->
    <!-- Shopping Cart Section Begin -->
    <section class="shopping-cart spad">
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
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
          <div class="col-lg-6">
            <div class="row">
              <div class="col-lg-12">
                <div class="proceed-checkout text-left">
                  <ul>
                    <li class="subtotal mt-3">
                      Laundry Shop Name<span>{{laundrySelect.name}}</span>
                    </li>
                    <li class="subtotal mt-3">
                      Postal Fee/km<span>Rp{{laundrySelect.postal_fee}}</span>
                    </li>
                    <li class="subtotal mt-3">Location <span>{{laundrySelect.location}}</span></li>
                    <li class="subtotal mt-3">Contact <span>{{laundrySelect.contact}}</span></li>
                    <li class="subtotal mt-3">Payment <span>COD</span></li>
                    <li class="subtotal mt-3">Price/kg <span>Rp{{laundrySelect.price}}</span></li>
                    <li class="subtotal mt-3">Estimate Day <span>{{laundrySelect.estimate}} day(s)</span></li>
                    <li class="subtotal mt-3">
                      Courier Name <span>{{laundrySelect.courier_name}}</span>
                    </li>
                  </ul>
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
import { mapGetters } from 'vuex'
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
      laundrySelect: {}
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  async created () {
    Object.assign(this.order, { customer_name: this.currentUser.name })
    let laundry = localStorage.getItem('laundrySelect')
    if (laundry !== null && laundry.length) {
      laundry = JSON.parse(laundry)
      const { data } = await axios.get(`/laundry_shop/${laundry.id}`)
      this.laundrySelect = data
    }
  },
  methods: {
    checkoutOrder: function () {
      // eslint-disable-next-line camelcase
      const { customer_name, contact_person, address, additional_info } = this.order
      let orderData = {
        customer_name,
        contact_person,
        address,
        additional_info,
        postal_fee: 4000,
        transaction_status: 'PENDING',
        laundryShopId: this.laundrySelect.id,
        userId: this.currentUser.id
      }
      axios
        .post('transaction', orderData)
        .then(() => {
          this.$router.push({ path: '/success' })
          localStorage.removeItem('laundrySelect')
        })
        .catch((error) => {
          this.$notify('danger', 'Something Bad Happened', error, { duration: 5000 })

          setTimeout(() => {
            window.location.reload()
          }, 2000)
        })
    }
  }
}
</script>
