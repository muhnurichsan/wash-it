<template>
  <div class="home">
    <Header/>
    <Hero/>
    <Banner/>
    <Shops/>
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Banner from '@/components/Banner'
import Shops from '@/components/Shops'
import Footer from '@/components/Footer'

export default {
  name: 'Home',
  components: {
    Header,
    Hero,
    Banner,
    Shops,
    Footer
  }
}
</script>
