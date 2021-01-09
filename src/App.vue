<template>
  <div class="h-100">
    <router-view/>
    <b-button
      :variant="!isDarkActive ? 'dark' : 'light'"
      class="mb-2 color-switches"
      @click="!isDarkActive ? isDarkActive = true : isDarkActive = false">
      <i :class="!isDarkActive ? 'iconsminds-half-moon' : 'iconsminds-sun'"></i>
      {{ !isDarkActive ? 'Dark Mode' : 'Light mode' }}
    </b-button>
  </div>
</template>
<script>
import { getDirection } from '@/utils'
import { defaultColor } from '@/constants/config'

export default {
  data () {
    return {
      checkedCheckboxes: [],
      isDarkActive: false
    }
  },
  created () {
    const color = this.getThemeColor()
    this.isDarkActive = color.indexOf('dark') > -1
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
  beforeMount () {
    const direction = getDirection()
    if (direction.isRtl) {
      document.body.classList.add('rtl')
      document.dir = 'rtl'
      document.body.classList.remove('ltr')
    } else {
      document.body.classList.add('ltr')
      document.dir = 'ltr'
      document.body.classList.remove('rtl')
    }
  },
  methods: {
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
  position: absolute;
  z-index: 100000;
  right: 20px;
  bottom: 15px;
}
</style>
