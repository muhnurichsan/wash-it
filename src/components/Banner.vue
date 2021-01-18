<template>
  <section class="banner">
    <b-container class="bv-example-row">
      <div>
        <h2 class="text-center">
          <strong>Why Us?</strong>
        </h2>
      </div>
      <div class="mt-20 mt-md-0 row pb-100">
        <div class="mt-30 col-md-4 no-gutters">
          <div class="pb-10 color-heading f-14 bold text-uppercase sp-20">
            01
          </div>
          <div class="pb-15 color-main f-32 bold">Simplicity</div>
          <div class="col-xl-9 color-heading f-18 medium op-7 text-adaptive">
            <div class="text-justify">
              We provide access using our system that is easily understood for all people,
              with just a few clicks you can order
            </div>
          </div>
        </div>
        <div class="mt-30 col-md-4 no-gutters">
          <div class="pb-10 color-heading f-14 bold text-uppercase sp-20">
            02
          </div>
          <div class="pb-15 color-main f-32 bold">Thrift</div>
          <div class="col-xl-9 color-heading f-18 medium op-7 text-adaptive">
            <div class="text-justify">
              save your money and your energy, because we provide a way for
              those of you who want to live frugally and simply
            </div>
          </div>
        </div>
        <div class="mt-30 col-md-4 no-gutters">
          <div class="pb-10 color-heading f-14 bold text-uppercase sp-20">
            03
          </div>
          <div class="pb-15 color-main f-32 bold">Eazy and Fast</div>
          <div class="col-xl-9 color-heading f-18 medium op-7 text-adaptive">
            <div class="text-justify">
              The order that you give will be processed quickly and
              the laundry process is delivered by a trusted courier
            </div>
          </div>
        </div>
      </div>
    </b-container>
    <section
        class="ecommerce_25 pt-100 pb-100 text-center bg-laundry"
        :style="{ backgroundImage: 'url(' + require('@/assets/landing/img/laundry1.jpg') + ')' }"
    >
      <div class="container px-xl-0">
        <div class="col-12 pt-70 pb-75 bg-light radius10 inner">
          <div
              class="mb-2 f-14 color-heading semibold text-uppercase sp-20 subtitle"
              data-aos-duration="600"
              data-aos="fade-down"
              data-aos-delay="0"
          >
            Enjoy Our Serivces
          </div>
          <h2
              class="mb-40 small"
              data-aos-duration="600"
              data-aos="fade-down"
              data-aos-delay="150"
          >
            Free Shipping on First Purchase
          </h2>
          <div
              data-aos-duration="600"
              data-aos="fade-down"
              data-aos-delay="300"
              class="py-3"
          >
            <router-link to="/">
              <b-button pill variant="outline-secondary">
                Get Started
              </b-button>
            </router-link>
          </div>
          <div
              class="mx-auto mw-470 color-heading text-adaptive"
              data-aos-duration="600"
              data-aos="fade-down"
              data-aos-delay="450"
          >
            Free shipping is valid for qualifying orders of 12000 or more <br/>
            no taxes needed and after applicable discounts.
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  data () {
    return {
      products: [],
      carts: []
    }
  },
  methods: {
    setProduct (data) {
    }
  }
}
</script>

<style scope>
.product-item {
  margin-right: 25px;
}

.banner {
  margin-top: 50px;
  height: 950px;
}

.bg-laundry {
  background-size: cover;
}
</style>
