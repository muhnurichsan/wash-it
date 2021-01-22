<template>
  <header class="header-section h-1170">
    <div class="container">
      <div class="inner-header p-0">
        <div class="col-md-12 col-sm-6 col-sm-3">
          <div class="card h-1000 rounded">
            <div class="card-body">
              <h3 class="text-center">{{ laundryShop.name }}</h3>
              <p class="text-center">{{ laundryShop.location }}</p>
              <div class="container">
                <div class="row mb-md-5" v-if="laundryShop.shop_images.length !== 4">
                  <div class="col-md-8">
                    <img
                        src="@/assets/landing/img/laundry2.jpg"
                        alt=""
                        class="mw-md-100 img-round"
                    />
                  </div>
                  <div class="col-md-4">
                    <div class="d-flex flex-column">
                      <div class="h-200">
                        <img
                            src="@/assets/landing/img/laundry1.jpg"
                            alt=""
                            class="img-round"
                        />
                      </div>
                      <div class="h-md-100 mt-35">
                        <img
                            src="@/assets/landing/img/laundry1.jpg"
                            alt=""
                            class="img-round"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row mb-md-5" v-if="laundryShop.shop_images.length === 4">
                  <div class="col-md-8">
                    <div class="bg-image lg" :style="{'background-image': 'url('+ laundryShop.shop_images[0].photo +')'}"></div>
                  </div>
                  <div class="col-md-4">
                    <div class="d-flex flex-column">
                      <div class="h-200">
                        <div class="bg-image md" :style="{'background-image': 'url('+ laundryShop.shop_images[1].photo +')'}"></div>
                      </div>
                      <div class="h-md-100 mt-35">
                        <div class="bg-image md" :style="{'background-image': 'url('+ laundryShop.shop_images[2].photo +')'}"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-8">
                    <div class="d-flex flex-column text-left">
                      <h3 class="py-md-3">About This Laundry</h3>
                      <div class="pb-md-4 text-justify">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Libero reprehenderit est explicabo, expedita
                        exercitationem ipsam vitae perspiciatis laborum, alias
                        dignissimos omnis accusantium qui maxime magni aliquid
                        excepturi ducimus nostrum! Corporis! Lorem ipsum dolor
                        sit amet consectetur adipisicing elit. Voluptatem in
                        quibusdam, aliquam deleniti est tenetur incidunt, ad
                        facere qui inventore officiis veniam ipsam laudantium
                        adipisci sint amet, dolorem accusamus cumque.
                      </div>
                      <div class="d-flex justify-content-between">
                        <div class="media media-box">
                          <img
                              class="mr-3 icons"
                              src="@/assets/icons/clock.svg"
                              alt="Generic placeholder image"
                          />
                          <div class="media-body">
                            <h5 class="mt-0">Estimate</h5>
                            <p class="mt-0">{{ laundryShop.estimate }} days</p>
                          </div>
                        </div>
                        <div class="media media-box">
                          <img
                              class="mr-3 icons"
                              src="@/assets/icons/clock.svg"
                              alt="Generic placeholder image"
                          />
                          <div class="media-body">
                            <h5 class="mt-0">Working Hours</h5>
                            <p class="mt-0">{{ laundryShop.working_hours }} hours</p>
                          </div>
                        </div>
                        <div class="media media-box">
                          <img
                              class="mr-3 icons"
                              src="@/assets/icons/clock.svg"
                              alt="Generic placeholder image"
                          />
                          <div class="media-body">
                            <h5 class="mt-0">Advantages</h5>
                            <p class="mt-0">{{ laundryShop.advantages }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="card h-300">
                      <div class="card-body">
                        <div class="d-flex flex-column text-left">
                          <h4>Booking Information</h4>
                          <table
                              class="table table-borderless table-responsive mb-10 table-over"
                          >
                            <thead>
                            <tr>
                              <th scope="col"></th>
                              <th scope="col"></th>
                              <th scope="col"></th>
                              <th scope="col"></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                              <th scope="row">Contact</th>

                              <td colspan="3"></td>
                              <td>{{ laundryShop.contact }}</td>
                            </tr>
                            <tr>
                              <th scope="row">Payment</th>
                              <td colspan="3"></td>
                              <td>COD</td>
                            </tr>
                            <tr>
                              <th scope="row">Price</th>
                              <td colspan="3"></td>
                              <td>{{ laundryShop.price }} / kg</td>
                            </tr>
                            </tbody>
                          </table>
                          <router-link to="/order">
                            <b-button variant="primary" block>
                              Booking Now
                            </b-button>
                          </router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Gallery',
  data () {
    return {
      isLoading: true,
      laundryShop: {}
    }
  },
  created () {
    this.fetchLaundryShop()
  },
  methods: {
    async fetchLaundryShop () {
      this.isLoading = false
      try {
        const res = await axios.get('laundry_shop/' + this.$route.params.id)

        if (res && res.hasOwnProperty('data')) {
          this.laundryShop = res.data
        }
      } catch (error) {
        this.$notify('danger', 'Something Bad Happened', error, { duration: 5000 })
      }
    },
    booking () {
      const parsed = JSON.stringify(this.laundryShop)
      localStorage.setItem('laundrySelect', parsed)
      this.$router.push({ path: '/order' })
    }
  }
}
</script>

<style scoped>
.si-pic img {
  width: 100px;
  height: 100px;
}

.img-round {
  border-radius: 15px;
}

.media-box {
  width: 200px;
}

.icons {
  width: 40px;
}
.table-over{
  overflow: hidden;
}
.bg-image {
  position: relative;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 15px;
}

.bg-image.lg {
  width: 672px;
  height: 448px;
}

.bg-image.md {
  width: 321px;
  height: 213px;
}
</style>
