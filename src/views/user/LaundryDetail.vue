<template>
  <div class="home">
    <Header/>
    <Photo/>
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Photo from '@/components/Photo'
import Footer from '@/components/Footer'

export default {
  name: 'LaundryDetail',
  components: {
    Header,
    Photo,
    Footer
  }
}
</script>
<style scoped>
.photo-sec {
  height: 500px;
}
</style>
