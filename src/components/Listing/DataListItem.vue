<template>
  <b-card :class="{'d-flex flex-row':true}" no-body>
    <div class="pl-2 d-flex flex-grow-1 min-width-zero">
      <div
          class="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
        <router-link :to="`?p=${data.id}`" class="w-15 w-sm-100">
          <p class="list-item-heading mb-1 truncate text-capitalize">
            <i class="iconsminds-male mr-5"/>
            {{ data.title }}
          </p>
        </router-link>
        <a :href="'tel:'+data.phone" class="mb-1 text-muted text-small w-15 w-sm-100 d-flex align-items-center">
          <i class="simple-icon-phone mr-5"/>
          {{ data.phone }}
        </a>
        <p class="mb-1 text-muted text-small w-20 w-sm-100 text-capitalize">
          <i class="iconsminds-location-2"/>
          {{ data.address }}
        </p>
        <p class="mb-1 text-muted text-small w-15 w-sm-100">
          <i class="simple-icon-calendar"/>
          {{ data.date }}
        </p>
        <div class="w-15 w-sm-100">
          <b-badge pill :variant="data.statusColor">{{ data.status }}</b-badge>
        </div>
      </div>
      <!--            <div class="custom-control custom-checkbox pl-1 align-self-center pr-4">-->
      <!--                <b-form-checkbox :checked="selectedItems.includes(data.id)" class="itemCheck mb-0"/>-->
      <!--            </div>-->
    </div>
  </b-card>
</template>
<script>
export default {
  props: ['data'],
  methods: {
    toggleItem (event, itemId) {
      this.$emit('toggle-item', event, itemId)
    }
  }
}
</script>
