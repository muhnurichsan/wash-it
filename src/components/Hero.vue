<template>
  <!-- Hero Section Begin -->
  <section class="hero-section">
    <carousel class="hero-items" :items="1" :nav="false" :autoplay="true">
      <div
          class="single-hero-items set-bg bg-caption"
          :style="{ backgroundImage: 'url(' + require('@/assets/landing/img/laundry4.jpg') + ')' }"
      >
        <div class="container">
          <div class="row">
            <div class="col-lg-5 ">
              <span>Welcome to</span>
              <h1 class="text-white">WashIT</h1>
              <p class="text-white">
                we are a start-up company engaged in cleaning
              </p>
              <a href="#" class="primary-btn">Shop Now</a>
            </div>
          </div>
        </div>
      </div>
      <div
          class="single-hero-items set-bg bg-caption"
          :style="{ backgroundImage: 'url(' + require('@/assets/landing/img/laundry2.jpg') + ')' }"
      >
        <div class="container">
          <div class="row">
            <div class="col-lg-5">
              <span>WashIT</span>
              <h1 class="text-white">Black Friday</h1>
              <p class="text-white">
                We provide what you need to enjoy your holiday with clean laundry. Time to make your memorable moments with clean clothes.
              </p>
              <a href="#" class="primary-btn">Shop Now</a>
            </div>
          </div>
        </div>
      </div>
      <div
          class="single-hero-items set-bg bg-caption"
          :style="{ backgroundImage: 'url(' + require('@/assets/landing/img/laundry3.jpg') + ')' }"
      >
        <div class="container">
          <div class="row">
            <div class="col-lg-5 ">
              <span>WashIT</span>
              <h1>Black Friday</h1>
              <p class="text-white">
                Everything you need about cleaning clothes is right here, with easy and simple information
              </p>
              <a href="#" class="primary-btn">Shop Now</a>
            </div>
          </div>
        </div>
      </div>
    </carousel>
  </section>
  <!-- Hero Section End -->
</template>

<script>
import carousel from 'vue-owl-carousel'

export default {
  components: {
    carousel
  }
}
</script>

<style scoped>
.bg-caption {
  background-color: rgba(0, 0, 0, .5);
  width: 100%;
  height: 100%;
}

</style>
