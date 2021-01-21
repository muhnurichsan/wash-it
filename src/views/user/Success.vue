<template>
  <div
    class="container d-flex align-items-center justify-content-center"
  >
    <div class="col col-lg-4 text-center">
      <img src="@/assets/landing/img/success-buy.png" alt="" width=" 294 "/>
      <h2 class="mt-4">Success making your order</h2>
      <p class="mt-2">
        View and track your recent transaction by clicking this button
      </p>
      <b-button variant="success">
        <router-link to="/history" class="text-white">
          Check Order
        </router-link>
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Success'
}
</script>

<style scoped>
.container{
  margin-top: 100px;
}
</style>
