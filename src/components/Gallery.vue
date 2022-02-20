<template>
  <ul class="pagination">
    <li><a href="#" @click.prevent="onClickNextPage"> prev </a></li>
    <!-- <li v-for="i in photos.length" :key="i">{{ i }}</li> -->-----
    <li><a href="#" @click.prevent="onClickNextPage"> next</a></li>
  </ul>

  <ul class="showItems">
    <li>
      Show Items:
      <select @change="onChangeRecordsPerPage" v-model="perPage">
        <option :value="5">5</option>
        <option :value="10">10</option>
        <option :value="20">20</option>
        <option :value="50">50</option>
        <option :value="100">100</option>
        <option :value="200">200</option>
      </select>
    </li>
  </ul>

  <div class="gallery">
    <div class="gallery-panel" v-for="photo in photos" :key="photo.id">
      <router-link :to="`/photo/${photo.id}`">
        <img
          alt="image"
          :loading="loading"
          :src="photo[photoSize]"
          width="1280"
        />
        <!-- <v-lazy-image :src="photo.urls[photoSize]" /> -->
      </router-link>
    </div>
  </div>
</template>

<script>
import apiClient from "../http-common";
// import VLazyImage from "v-lazy-image";

export default {
  name: "Gallery",
  // components: { VLazyImage },
  data() {
    return {
      photos: {},
      page: 1,
      pagesTotal: 1,
      perPage: this.$route.query.perPage ? this.$route.query.perPage : 5,
      photoSize: this.$route.query.photoSize
        ? this.$route.query.photoSize
        : "largeImageURL",
      loading: this.$route.query.loading ? this.$route.query.loading : "eager",
    };
  },
  created() {
    this.getPhotos(this.page, this.perPage);
  },
  methods: {
    async getPhotos(page, perPage) {
      await apiClient
        .get(`?key=25700624-812fa9db0aa07fd100f1c7c0e&per_page=${perPage}`)
        // .get(`photos?page=${page}&per_page=${perPage}`)
        .then((res) => {
          this.photos = res.data.hits;
          this.pagesTotal = res.data.totalHits / this.perPage;
          console.log("res.data.hits", res.data.hits);
        });
    },
    onChangeRecordsPerPage() {
      this.getPhotos(this.page, this.perPage);
    },
    onClickNextPage() {
      this.page++;
      this.getPhotos(this.page, this.perPage);
    },
    onClickPreviousPage() {
      this.page--;
      this.getPhotos(this.page, this.perPage);
    },
  },
};
</script>

<style>
.gallery {
  display: grid;
  /* grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr)); */
  grid-gap: 1rem;
  /* max-width: 80rem; */
}

.gallery-panel img {
  display: block;
  /* width: 100%; */
  /* height: 22vw; */
  /* object-fit: cover; */
  border-radius: 0.75rem;
}

ul {
  display: inline-block;
}

ul li {
  list-style-type: none;
  display: inline-block;
}

.pagination li a {
  cursor: pointer;
}

.showItems {
  font-size: 14px;
  font-weight: bold;
}

.showItems li {
  list-style-type: none;
  display: inline-block;
  margin-left: 10px;
}
</style>
