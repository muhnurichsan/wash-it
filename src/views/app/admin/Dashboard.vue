<template>
  <div>
    <loading
        :active.sync="isLoading"
        :can-cancel="true"
        :is-full-page="true"
        :loader="'spinner'"
        :color="'#145388'"
    />
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb :heading="$t('menu.dashboard')"/>
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <b-row>
      <b-colxx xxs="12" lg="4">
        <b-card class="mb-4" :title="'Detail Shop'">
          <b-form>
            <b-row>

              <b-colxx sm="6">
                <b-form-group :label="'Name'">
                  <b-form-input type="text" v-model="formData.name"/>
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
                  <b-form-input type="number" v-model="formData.price"/>
                </b-form-group>
              </b-colxx>
              <b-colxx sm="6">
                <b-form-group :label="'Estimate (day)'">
                  <b-form-input type="number" v-model="formData.estimate"/>
                </b-form-group>
              </b-colxx>
            </b-row>

            <b-button type="submit" variant="primary" class="mt-4" @click="onFormDataSubmit()">
              Save
            </b-button>
          </b-form>
        </b-card>
      </b-colxx>
      <b-colxx xxs="12" lg="8">
        <b-card class="mb-4" :title="'Upload Shop Images'" :footer="'You must have 4 images if you want to display them on Homepage'">
            <b-row v-if="images.length !== 4">
              <b-colxx xxs="12">
                <b-form enctype="multipart/form-data">
                  <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"
                                @vdropzone-file-added="fileAdded($event)"
                                @vdropzone-removed-file="fileRemoved($event)"></vue-dropzone>
                  <b-button type="button" variant="primary" @click="uploadTheFile()" class="mt-3">Upload Image</b-button>
                </b-form>
              </b-colxx>
            </b-row>
            <b-row v-if="images.length" class="mt-4">
              <b-colxx xxs="12">
                <div class="row">
                  <div class="col-md-3 bg-image mb-3"
                       v-for="image in images"
                       :key="image.photo"
                       :style="{'background-image': 'url('+image.photo+')'}">
                    <b-button class="button-delete" size="sm" variant="danger default" block @click="deleteImage(image.id)">
                      Delete
                    </b-button>
                  </div>
                </div>
              </b-colxx>
            </b-row>
        </b-card>
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import VueDropzone from 'vue2-dropzone'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  components: {
    VueDropzone,
    Loading
  },
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
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailHeight: 160,
        previewTemplate: this.dropzoneTemplate(),
        headers: { 'My-Awesome-Header': 'header value' },
        manuallyAddFile: true,
        autoProcessQueue: false,
        uploadMultiple: false,
        maxFileSize: 2500,
        maxFiles: 4,
        acceptedFiles: 'image/*'
      },
      images: [],
      form: new FormData(),
      counter: 0,
      isLoading: true
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  async created () {
    await this.fetchData()
  },
  methods: {
    async fetchData () {
      this.isLoading = true
      try {
        // Reset
        this.formData = {}
        this.images = []

        const laundry = await axios.get('laundry_shop')
        if (laundry && laundry.hasOwnProperty('data') && laundry.data.length) {
          const { data } = laundry

          this.formData = data.find((laundry) => laundry.user.id === this.currentUser.id)
        }

        const images = await axios.get('shop_image')
        if (images && images.hasOwnProperty('data') && images.data.length) {
          const { data } = images

          data.forEach((item) => {
            if (item.laundryShopId === this.formData.id) {
              this.images.push({ photo: item.photo, id: item.id })
            }
          })
        }
      } catch (error) {
        this.$notify('danger', 'Something Bad Happened', error, { duration: 5000 })
      }
      this.isLoading = false
    },
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
    },
    fileAdded (file) {
      this.form.append('photo', file)
    },
    fileRemoved () {
      this.form.delete('photo')
    },
    async uploadTheFile () {
      this.isLoading = true
      try {
        this.form.append('laundryShopId', this.formData.id)
        const res = await axios.post('/shop_image', this.form, { headers: { 'Content-Type': 'multipart/form-data' } })
        if (res && res.hasOwnProperty('data') && res.data.hasOwnProperty('photo')) {
          this.$notify('success', 'Success', 'Image has been successfully uploaded!', { duration: 5000 })

          this.$refs.myVueDropzone.removeAllFiles()
          this.images.push({ photo: res.data.photo, id: res.data.id })

          // Clear Form Data
          for (let key of this.form.keys()) {
            this.form.delete(key)
          }
        }
      } catch (error) {
        this.$notify('danger', 'Something Bad Happened', error, { duration: 5000 })
      }

      setTimeout(() => {
        this.isLoading = false
      }, 2000)
    },
    deleteImage (imageId) {
      this.$bvModal.msgBoxConfirm('Are you sure to delete this image', {
        title: 'Please Confirm',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'YES',
        cancelTitle: 'NO',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
        .then(async (value) => {
          if (value) {
            await axios.delete(`/shop_image/${imageId}`)
            this.$notify('success', 'Success', 'Image has been successfully deleted!', { duration: 5000 })
            await this.fetchData()
          }
        })
        .catch((error) => {
          this.$notify('danger', 'Error', error, { duration: 5000 })
        })
    },
    dropzoneTemplate () {
      return `<div class="dz-preview dz-file-preview mb-3">
                  <div class="d-flex flex-row "> <div class="p-0 w-30 position-relative">
                      <div class="dz-error-mark"><span><i></i>  </span></div>
                      <div class="dz-success-mark"><span><i></i></span></div>
                      <div class="preview-container">
                        <img data-dz-thumbnail class="img-thumbnail border-0" />
                        <i class="simple-icon-doc preview-icon"></i>
                      </div>
                  </div>
                  <div class="pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative">
                    <div> <span data-dz-name /> </div>
                    <div class="text-primary text-extra-small" data-dz-size /> </div>
                    <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
                    <div class="dz-error-message"><span data-dz-errormessage></span></div>
                  </div>
                  <a href="#" class="remove" data-dz-remove> <i class="glyph-icon simple-icon-trash"></i> </a>
                </div>
        `
    }
  }
}
</script>

<style scoped>
.bg-image {
  position: relative;
  width: 200px;
  height: 200px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border: 1px solid #040505;
}

.bg-image .button-delete {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
}
</style>
