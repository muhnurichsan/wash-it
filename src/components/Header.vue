<template>
  <header class="header-section">
    <div class="header-top">
      <div class="container">
        <div class="ht-left">
          <div class="mail-service">
            <i class="iconsminds-envelope"></i> hello.shayna@gmail.com
          </div>
          <div class="phone-service">
            <i class="iconsminds-old-telephone"></i> +628 22081996
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="inner-header">
        <div class="row">
          <div class="col-lg-2 col-md-2">
            <div class="logo">
              <router-link to="/">
                <img src="@/assets/landing/img/logo_website_shayna.png" alt=""/>
              </router-link>
            </div>
          </div>
          <div class="col-lg-5 col-md-5"></div>
          <div class="col-lg-5 text-right col-md-5">
            <ul class="nav-right">
              <li class="cart-icon">
                Keranjang Belanja
                <a href="#">
                  <i class="simple-icon-bag"></i>
                  <span>{{ carts.length }}</span>
                </a>
                <div class="cart-hover">
                  <div class="select-items">
                    <table>
                      <tbody v-if="carts.length > 0">
                      <tr v-for="cart in carts" :key="cart.id">
                        <td class="si-pic">
                          <img :src="cart.photo" alt=""/>
                        </td>
                        <td class="si-text">
                          <div class="product-selected">
                            <p>${{ cart.price }}.00 x 1</p>
                            <h6>{{ cart.name }}</h6>
                          </div>
                        </td>
                        <td class="si-close">
                          <i
                            class="ti-close"
                            @click="removeCart(carts.index)"
                          ></i>
                        </td>
                      </tr>
                      </tbody>
                      <tbody v-else>
                      <tr class="text-center">
                        <td>Keranjang Anda Kosong</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="select-total">
                    <span>total:</span>
                    <h5>${{ totalHarga }}.00</h5>
                  </div>
                  <div class="select-button">
                    <router-link to="/cart" class="primary-btn view-card">
                      VIEW CARD
                    </router-link>
                    <a href="#" class="primary-btn checkout-btn">CHECK OUT</a>
                  </div>
                </div>
              </li>
              <li class="cart-icon ml-3">
                <router-link v-if="(!isAuthenticated || isAuthenticated) && currentUser === null" tag="a" to="/auth/login">
                  <b-button pill variant="outline-dark">
                    Masuk/Daftar
                  </b-button>
                </router-link>
                <router-link to="/app" v-if="isAuthenticated && (currentUser !== null && currentUser.isAdmin)">
                  <b-button pill variant="outline-dark">
                    Go To App
                  </b-button>
                </router-link>
                <router-link to="/" v-if="isAuthenticated && (currentUser !== null && !currentUser.isAdmin)">
                  <b-button pill variant="outline-dark">
                    {{ currentUser.username }}
                  </b-button>
                  <div class="cart-hover">
                    <div class="select-button">
                      <a href="/user" class="primary-btn checkout-btn mb-2">Profil</a>
                      <a href="#" @click="signOut" class="primary-btn view-card">
                        Keluar
                      </a>
                    </div>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Header',
  data () {
    return {
      carts: []
    }
  },
  computed: {
    totalHarga () {
      return this.carts.reduce(function (items, data) {
        return items + data.price
      }, 0)
    },
    ...mapGetters(['currentUser', 'isAuthenticated'])
  },
  mounted () {
    if (localStorage.getItem('carts')) {
      try {
        this.carts = JSON.parse(localStorage.getItem('carts'))
      } catch (e) {
        localStorage.removeItem('carts')
      }
    }
  },
  methods: {
    ...mapActions(['signOut']),
    removeCart (idProduct) {
      let cartStorage = JSON.parse(localStorage.getItem('carts'))
      let itemCart = cartStorage.map((itemCart) => itemCart.id)
      let index = itemCart.findIndex((id) => id === idProduct)
      this.carts.splice(index, 1)
      const parsed = JSON.stringify(this.carts)
      localStorage.setItem('carts', parsed)
    },
    saveCart (idProduct, nameProduct, priceProduct, photoProduct) {
      const productKey = {
        id: idProduct,
        name: nameProduct,
        price: priceProduct,
        photo: photoProduct
      }
      this.carts.push(productKey)
      const parsed = JSON.stringify(this.carts)
      localStorage.setItem('carts', parsed)
      window.location.reload()
    }
  }
}
</script>

<style scoped>
.si-pic img {
  width: 100px;
  height: 100px;
}
</style>
