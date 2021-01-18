<template>
  <header class="header-section">
    <div class="header-top">
      <div class="container">
        <div class="ht-left">
          <div class="mail-service">
            <i class="iconsminds-envelope"></i> washIT@gmail.com
          </div>
          <div class="phone-service">
            <i class="iconsminds-old-telephone"></i> +62 822 3431 6663
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
                <img
                    src="@/assets/landing/img/logo1.png"
                    alt=""
                />
              </router-link>
            </div>
          </div>
          <div class="col-lg-5 col-md-5"></div>
          <div class="col-lg-5 text-right col-md-5">
            <ul class="nav-right">
              <li class="cart-icon ml-3">
                <router-link
                    v-if="(!isAuthenticated || isAuthenticated) && currentUser === null"
                    tag="a"
                    to="/auth/login"
                >
                  <b-button pill variant="outline-dark">
                    Masuk/Daftar
                  </b-button>
                </router-link>
                <router-link
                    to="/app"
                    v-if="isAuthenticated && currentUser !== null && currentUser.isAdmin"
                >
                  <b-button pill variant="outline-dark"> Go To App</b-button>
                </router-link>
                <router-link
                    to="/"
                    v-if="isAuthenticated && currentUser !== null && !currentUser.isAdmin"
                >
                  <b-button pill variant="outline-dark">
                    {{ currentUser.username }}
                  </b-button>
                  <div class="cart-hover">
                    <div class="select-button">
                      <a href="/user" class="primary-btn checkout-btn mb-2"
                      >Profil</a
                      >
                      <a
                          href="#"
                          @click="signOut"
                          class="primary-btn view-card"
                      >
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
.inner-header img {
  width: 150px;
  height: 150px;
  margin-top:-50px;
}
</style>
