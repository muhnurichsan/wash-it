<template>
  <div class="home">
    <HeaderShayna />
    <HeroShayna />
    <BannerShayna />
    <InstaShayna />
    <PartnerShayna />
    <Footer />
  </div>
</template>

<script>
import HeaderShayna from '@/components/Header.vue'
import HeroShayna from '@/components/Hero.vue'
import BannerShayna from '@/components/Banner.vue'
import InstaShayna from '@/components/Insta.vue'
import PartnerShayna from '@/components/Partner.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'Home',
  components: {
    HeaderShayna,
    HeroShayna,
    BannerShayna,
    InstaShayna,
    PartnerShayna,
    Footer
  }
}
</script>
