<template>
  <div class="home">
    <Header/>
    <Gallery/>
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Gallery from '@/components/Gallery'
import Footer from '@/components/Footer'

export default {
  name: 'LaundryDetail',
  components: {
    Header,
    Gallery,
    Footer
  }
}
</script>
<style scoped>
.photo-sec {
  height: 500px;
}
</style>
