<template>
  <section class="women-banner spad">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12 mt-5" v-if="products.length > 0">
          <carousel class="product-slider" :nav="false" :dots="false">
            <div
              class="product-item"
              v-for="product in products"
              :key="product.id"
            >
              <div class="pi-pic">
                <img :src="'@/assets/landing/'+product.galleries[0].photo" alt="" height="420" />
                <ul>
                  <li
                    class="w-icon active"
                    @click="saveCart(product.id,product.name,product.price,product.galleries[0].photo)">
                    <a href="#"><i class="simple-icon-bag"></i></a>
                  </li>
                  <li class="quick-view">
                    <router-link :to="'/product/' + product.id">
                      + Quick View
                    </router-link>
                  </li>
                </ul>
              </div>
              <div class="pi-text">
                <div class="catagory-name">{{ product.type }}</div>
                <a href="#">
                  <h5>{{ product.name }}</h5>
                </a>
                <div class="product-price">
                  ${{ product.price }}.00
                  <span>$35.00</span>
                </div>
              </div>
            </div>
          </carousel>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import carousel from 'vue-owl-carousel'

export default {
  name: 'BannerShayna',
  components: {
    carousel
  },
  data () {
    return {
      products: [],
      carts: []
    }
  },
  methods: {
    setProduct (data) {
      this.products = [
        {
          'id': 1,
          'kode': 'K-01',
          'nama': 'Soto Ayam',
          'desc': 'Soto ayam merupakan makanan kegemaran masyarakat indonesia sejak zaman penjajahan hingga sekarang',
          'harga': '10.000',
          'is_ready': true,
          'gambar': 'soto-ayam.jpg'
        },
        {
          'id': 2,
          'kode': 'K-02',
          'nama': 'Soto Sapi',
          'desc': 'Soto sapi merupakan makanan kegemaran masyarakat indonesia sejak zaman penjajahan hingga sekarang',
          'harga': '12.000',
          'is_ready': true,
          'gambar': 'soto-sapi.jpg'
        }
      ]
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
    // axios
    //   .get('http://127.0.0.1:8000/api/products')
    //   .then((res) => this.setProduct(res.data.data.data))
    //   .catch((err) => console.log(err))
  }
}
</script>

<style scope>
.product-item {
  margin-right: 25px;
}
</style>
