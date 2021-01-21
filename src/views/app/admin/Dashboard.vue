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
          <b-form>
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

            <b-button type="submit" variant="primary" class="mt-4" :disabled="isLoading" @click="onFormDataSubmit()">
              <span v-if="isLoading">
                <b-spinner type="grow" small></b-spinner>
              </span>
              <span v-else>Save</span>
            </b-button>
          </b-form>
        </b-card>
      </b-colxx>
      <b-colxx xxs="12" lg="6">
        <b-card class="mb-4" :title="'Upload Shop Images'">
          <b-form>
            <b-row>
              <b-colxx xxs="12">
                <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" @vdropzone-file-added="fileAdded($event)"></vue-dropzone>
                <b-button type="button" variant="primary" @click="uploadTheFile()" class="mt-3">Save Images</b-button>
              </b-colxx>
            </b-row>
          </b-form>
        </b-card>
      </b-colxx>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import VueDropzone from 'vue2-dropzone'

export default {
  components: {
    VueDropzone
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
        uploadMultiple: true,
        maxFileSize: 200,
        maxFiles: 4,
        acceptedFiles: 'image/*'
      },
      form: new FormData(),
      counter: 0,
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
    },
    fileAdded (file) {
      this.form.append(file[this.counter], file)
      this.counter = this.counter + 1
    },
    uploadTheFile () {
      this.form.append('laundryShopId', this.formData.id)
      console.log(this.form)
      // axios.post('/shop_image', this.form)
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
