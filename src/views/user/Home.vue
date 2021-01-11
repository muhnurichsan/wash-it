<template>
  <div class="home">
    <Header />
    <Hero />
    <Banner />
    <Insta />
    <Partner />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Banner from '@/components/Banner'
import Insta from '@/components/Insta'
import Partner from '@/components/Partner'
import Footer from '@/components/Footer'

export default {
  name: 'Home',
  components: {
    Header,
    Hero,
    Banner,
    Insta,
    Partner,
    Footer
  }
}
</script>
