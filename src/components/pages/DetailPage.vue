<template>
  <div v-if="!loading">
    <h2>写真詳細</h2>
    <img :src="getUrl" alt="">
    <p v-if="item.title">{{item.title._content}}</p>
    <button @click="$router.go(-1)">back</button>
  </div>
</template>

<script>
import axios from "axios"
import { API_KEY } from "../../const.js"
export default {
  name: "Index",
  data: () => ({
    item: {},
    loading:true
  }),
  created(){
    this.fetchData();
  },
  computed:{
    getUrl(){
      return `https://farm${this.item.farm}.staticflickr.com/${this.item.server}/${this.item.id}_${this.item.secret}.jpg`
    }
  },
  methods: {
    fetchData: async function() {
       const response = await axios
        .get("https://api.flickr.com/services/rest", {
          params: {
            method: "flickr.photos.getInfo",
            api_key: API_KEY,
            photo_id: this.$route.params.id,
            format: "json",
            nojsoncallback: "1",
            extras: "url_s"
          }
        })
      this.item = response.data.photo
      this.loading = false

    }
  }
}
</script>

<style scoped>
</style>
