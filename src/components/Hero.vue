<template>
  <!-- Hero Section Begin -->
  <section class="hero-section">
    <carousel class="hero-items" :items="1" :nav="false" :autoplay="true">
      <div
          class="single-hero-items set-bg"
          :style="{ backgroundImage: 'url(' + require('@/assets/landing/img/laundry4.jpg') + ')' }"
      >
        <div class="container">
          <div class="row">
            <div class="col-lg-5">
              <span>Welcome to</span>
              <h1 class="text-white">WashIT</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore
              </p>
              <a href="#" class="primary-btn">Shop Now</a>
            </div>
          </div>
        </div>
      </div>
      <div
          class="single-hero-items set-bg"
          :style="{ backgroundImage: 'url(' + require('@/assets/landing/img/laundry2.jpg') + ')' }"
      >
        <div class="container">
          <div class="row">
            <div class="col-lg-5">
              <span>WashIT</span>
              <h1 class="text-white">Black Friday</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore
              </p>
              <a href="#" class="primary-btn">Shop Now</a>
            </div>
          </div>
        </div>
      </div>
      <div
          class="single-hero-items set-bg"
          :style="{ backgroundImage: 'url(' + require('@/assets/landing/img/laundry3.jpg') + ')' }"
      >
        <div class="container">
          <div class="row">
            <div class="col-lg-5">
              <span>WashIT</span>
              <h1>Black Friday</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore
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
