<template>
  <div class="home">
    <HeaderShayna/>

    <table class="table">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Laundry Shop</th>
        <th scope="col">Order Date</th>
        <th scope="col">Verify Action</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
      </tr>
      <tr>
        <th scope="row">3</th>
        <td>Larry</td>
        <td>the Bird</td>
        <td>@twitter</td>
      </tr>
      </tbody>
    </table>

    <Footer/>
  </div>
</template>

<script>
import HeaderShayna from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'History',
  components: {
    HeaderShayna,
    Footer
  },
  data () {
    return {
      carts: [],
      order: {}
    }
  }
}
</script>
