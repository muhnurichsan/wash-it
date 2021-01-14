<template>
  <div class="product">
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
              <router-link to="/product">Detail</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Breadcrumb Section Begin -->

    <!-- Product Shop Section Begin -->
    <section class="product-shop spad page-details">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="row">
              <div class="col-lg-6">
                <div class="product-pic-zoom">
                  <img class="product-big-img" :src="img_default" alt=""/>
                </div>
                <div
                    class="product-thumbs"
                    v-if="productDetail.galleries.length > 0"
                >
                  <carousel
                      class="product-thumbs-track ps-slider"
                      :dots="false"
                      :nav="false"
                      :margin="10"
                  >
                    <div
                        v-for="ss in productDetail.galleries"
                        :key="ss.id"
                        class="pt"
                        @click="changeImage(ss.photo)"
                        :class="ss.photo === img_default ? 'active' : ''"
                    >
                      <img :src="ss.photo" alt=""/>
                    </div>
                  </carousel>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="product-details text-left">
                  <div class="pd-title">
                    <span>{{ productDetail.type }}</span>
                    <h3>{{ productDetail.name }}</h3>
                  </div>
                  <div class="pd-desc" v-html="productDetail.description">
                    <h4>${{ productDetail.price }}.00</h4>
                  </div>
                  <div class="quantity">
                    <a @click="saveCart(productDetail.id, productDetail.name, productDetail.price, productDetail.galleries[0].photo)"
                        href="#"
                        class="primary-btn pd-cart">
                      Add To Cart
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Product Shop Section End -->

    <Footer/>
  </div>
</template>

<script>
import HeaderShayna from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import carousel from 'vue-owl-carousel'
import axios from 'axios'

export default {
  name: 'product',
  components: {
    HeaderShayna,
    Footer,
    carousel
  },
  data () {
    return {
      img_default: '',
      productDetail: [],
      carts: []
    }
  },
  methods: {
    changeImage (url) {
      this.img_default = url
    },
    setDetail (data) {
      this.productDetail = data
      this.img_default = data.galleries[0].photo
    },
    saveCart (idProduct, nameProduct, priceProduct, photoProduct) {
      var productKey = {
        id: idProduct,
        name: nameProduct,
        price: priceProduct,
        photo: photoProduct
      }
      this.carts.push(productKey)
      const parsed = JSON.stringify(this.carts)
      localStorage.setItem('carts', parsed)
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
    axios
      .get('http://127.0.0.1:8000/api/products', {
        params: {
          id: this.$route.params.id
        }
      })
      .then((res) => this.setDetail(res.data.data))
      .catch((err) => console.log(err))
  }
}
</script>
