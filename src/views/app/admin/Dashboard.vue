<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb :heading="$t('menu.dashboard')"/>
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <b-row>
      <b-colxx xxs="12" lg="6">
        <b-card class="mb-4" :title="'Detail Shop'">
          <b-form @submit.prevent="onFormDataSubmit">
            <b-row>

              <b-colxx sm="6">
                <b-form-group :label="'Name'">
                  <b-form-input type="name" v-model="formData.name" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="6">
                <b-form-group :label="'Contact'">
                  <b-form-input type="number" v-model="formData.contact"/>
                </b-form-group>
              </b-colxx>

              <b-colxx sm="12">
                <b-form-group :label="'Address'">
                  <b-form-textarea v-model="formData.location"/>
                </b-form-group>
              </b-colxx>

              <b-colxx sm="12">
                <b-form-group :label="'Advantages'">
                  <b-form-textarea v-model="formData.advantages"/>
                </b-form-group>
              </b-colxx>

              <b-colxx sm="6">
                <b-form-group :label="'Price /kg'">
                  <b-form-input type="number" v-model="formData.price" />
                </b-form-group>
              </b-colxx>
              <b-colxx sm="6">
                <b-form-group :label="'Estimate (day)'">
                  <b-form-input type="number" v-model="formData.estimate" />
                </b-form-group>
              </b-colxx>
            </b-row>

            <b-button type="submit" variant="primary" class="mt-4" :disabled="isLoading">
              <span v-if="isLoading">
                <b-spinner type="grow" small></b-spinner>
              </span>
              <span v-else>Save</span>
            </b-button>
          </b-form>
        </b-card>
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      formData: {
        name: '',
        contact: '',
        advantages: '',
        location: '',
        price: '',
        estimate: ''
      },
      isLoading: false
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  created () {
    axios.get('laundry_shop')
      .then((res) => {
        if (res && res.hasOwnProperty('data') && res.data.length) {
          const { data } = res

          this.formData = data.find((laundry) => laundry.user.id === this.currentUser.id)
        }
      })
  },
  methods: {
    async onFormDataSubmit () {
      this.isLoading = true
      try {
        const res = await axios.put(`laundry_shop/${this.formData.id}`, this.formData)
        if (res && res.hasOwnProperty('data') && res.data.hasOwnProperty('message')) {
          this.$notify('success', 'Success', res.data.message, { duration: 5000 })
        }
      } catch (error) {
        this.$notify('danger', 'Something Bad Happened', error, { duration: 5000 })
      }

      setTimeout(() => {
        this.isLoading = false
      }, 2000)
    }
  }
}
</script>
