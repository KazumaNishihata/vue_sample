<template>
  <div>
    <h2>写真一覧</h2>
    <div>
      <input type="text" v-model="keyword" list="keyword"/>
      <datalist id="keyword">
        <option :value="keyword"  v-for="(keyword,i) in keyword_history" :key="i" />
      </datalist>
      <input type="button" value="Search" v-on:click="handleSearch" />
    </div>
    <ul>
      <li v-for="(page,i) in pageRange" :key="i">
        <button v-on:click="handlePage(page)">{{ page }}</button>
      </li>
    </ul>
    <ul>
      <li v-for="(item,i) in items" :key="i">
        <router-link :to="`/detail/${item.id}`">
          <img v-bind:src="item.url" v-bind:alt="item.title" />
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios"
import { API_KEY } from "../../const.js"
export default {
  name: "Index",
  data: () => ({
    keyword: "cat",
    keyword_history:[],
    page: 1,
    maxPage: 1,
    items: []
  }),
  created(){
    this.fetchData();
  },
  computed: {
    pageRange: function() {
      const range = 3;
      const page = this.page;
      const start = page - range < 1 ? 1 : page - range;
      const end =
        page + range > this.maxPage ? this.maxPage : page + range;
      return [...Array(end + 1).keys()].slice(start);
    }
  },
  methods: {
    handleSearch: function() {
      this.items = [];
      this.page = 1;
      this.maxPage = 1;
      this.fetchData();
      this.keyword_history = [this.keyword,...this.keyword_history]
    },
    handlePage: function(page) {
      this.page = page;
      this.items = [];
      this.fetchData();
    },
    fetchData: async function() {
       const response = await axios
        .get("https://api.flickr.com/services/rest", {
          params: {
            method: "flickr.photos.search",
            api_key: API_KEY,
            text: this.keyword,
            page: this.page,
            per_page: "10",
            format: "json",
            nojsoncallback: "1",
            extras: "url_s"
          }
        })
      
        this.maxPage = response.data.photos.pages;
        this.items = this.items.concat(
          response.data.photos.photo.map(photo=>({
            title: photo.title,
            url: photo.url_s,
            id: photo.id
          }))
        );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
