<template>
  <div id="app-container" :class="getMenuType">
    <top-nav/>
    <sidebar/>
    <main>
      <div class="container-fluid">
        <router-view></router-view>
      </div>
    </main>
    <b-button
        :variant="!isDarkActive ? 'dark' : 'light'"
        class="mb-2 color-switches"
        size="sm"
        @click="!isDarkActive ? isDarkActive = true : isDarkActive = false">
      <i :class="!isDarkActive ? 'iconsminds-half-moon' : 'iconsminds-sun'"></i>
      {{ !isDarkActive ? 'Dark Mode' : 'Light mode' }}
    </b-button>
  </div>
</template>
<script>
import Sidebar from '@/containers/Sidebar'
import TopNav from '@/containers/TopNav'
import { defaultColor } from '@/constants/config'
import { mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      show: false,
      isDarkActive: false
    }
  },
  components: {
    TopNav,
    Sidebar
  },
  watch: {
    isDarkActive (val) {
      let color = this.getThemeColor()
      let isChange = false
      if (val && color.indexOf('light') > -1) {
        isChange = true
        color = color.replace('light', 'dark')
      } else if (!val && color.indexOf('dark') > -1) {
        isChange = true
        color = color.replace('dark', 'light')
      }
      if (isChange) {
        localStorage.setItem('themeColor', color)
        setTimeout(() => {
          window.location.reload()
        }, 500)
      }
    }
  },
  computed: {
    ...mapGetters(['getMenuType'])
  },
  created () {
    const color = this.getThemeColor()
    this.isDarkActive = color.indexOf('dark') > -1
  },
  methods: {
    ...mapMutations(['setUser']),
    getThemeColor () {
      return localStorage.getItem('themeColor')
        ? localStorage.getItem('themeColor')
        : defaultColor
    }
  }
}
</script>

<style scoped>
.color-switches {
  position: fixed;
  z-index: 100000;
  right: 20px;
  bottom: 15px;
}
</style>
