<template>
  <section class="ecommerce_18 bg-light pt-100 pb-70">
    <div class="container px-xl-0">
      <h2 class="mb-40 small">
        Most Picked This Month
      </h2>
      <div class="row align-items-start align-items-lg-stretch products" v-if="!isLoading">
        <div class="mt-30 mb-30 col-xl-6 col-lg-10 col-md-5 col-sm-6 d-lg-flex align-items-stretch product"
             v-for="(laundry, index) in mostPickedThisMonth" :key="index" :id="laundry.id"
        >
          <router-link :to="'/laundry_detail/' + laundry.id" class="align-self-start flex-shrink-0 img_link">
            <img v-if="!laundry.shop_images.length"
                srcset="i/ecommerce_18_product_1@2x.jpg 2x"
                 src="i/ecommerce_18_product_1.jpg"
                 alt=""
                 class="img-fluid radius10"
            />
            <div v-if="laundry.shop_images.length" class="bg-image" :style="{'background-image': 'url('+laundry.shop_images[0].photo+')'}"></div>
          </router-link>
          <div class="mt-30 mt-lg-0 ml-30 pb-60 relative inner">
            <router-link :to="'/laundry_detail/' + laundry.id">
              <span class="d-block f-22 semibold title text-dark">{{ laundry.name }}</span>
            </router-link>
            <div v-if="laundry.price" class="mb-15 f-14 semibold sp-20 color-heading price">
              Rp{{ laundry.price || '0' }}/kg
            </div>
            <div v-if="laundry.location" class="color-heading text-adaptive">
              {{ laundry.location || '' }}
            </div>
            <div v-if="laundry.adventages" class="color-heading text-adaptive">
              {{ laundry.adventages || '' }}
            </div>
            <div class="mt-30 mt-lg-0 absolute d-flex flex-wrap align-items-baseline buttons">
              <router-link :to="'/laundry_detail/' + laundry.id">
                <b-button pill variant="success" class="mr-10" size="sm">
                  Booking Now
                </b-button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section class="call_to_action_28 bg-light pt-105 pb-100">
      <div class="container px-xl-0">
        <div class="row justify-content-center">
          <div
              class="col-xl-10 d-lg-flex flex-wrap align-items-center justify-content-between"
          >
            <div class="d-md-flex flex-wrap align-items-center">
              <img
                  srcset="i/call_to_action_28_img@2x.png 2x"
                  src="i/call_to_action_28_img.png"
                  class="mb-20 mb-md-0 img radius20"
                  alt=""
              />
              <div class="pl-25 inner">
                <h2 class="small">
                  Start Cleaning Your Laundry Right Now
                </h2>
                <div class="f-22 color-heading text-adaptive">
                  it's free shipping for first purchase
                </div>
              </div>
            </div>
            <div>
              <router-link to="/">
                <b-button pill variant="outline-secondary">
                  Get Started
                </b-button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Shops',
  data () {
    return {
      isLoading: true,
      mostPickedThisMonth: []
    }
  },
  created () {
    this.fetchMostPicked()
  },
  methods: {
    async fetchMostPicked () {
      this.isLoading = true
      try {
        const res = await axios.get('laundry_shop')

        if (res && res.hasOwnProperty('data') && res.data.length) {
          this.mostPickedThisMonth = res.data.slice(0, 5) // Limit only 4 Laundry Shops
          this.isLoading = false
        }
      } catch (error) {
        this.$notify('danger', 'Something Bad Happened', error, { duration: 5000 })
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
.bg-image {
  position: relative;
  width: 270px;
  height: 207px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  transition: all 0.25s;
  border-radius: 10px;
  border: 1px solid #404040;
}
</style>
