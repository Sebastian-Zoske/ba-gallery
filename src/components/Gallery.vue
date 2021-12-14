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
        <option :value="30">30</option>
      </select>
    </li>
  </ul>

  <div class="gallery">
    <div class="gallery-panel" v-for="photo in photos" :key="photo.id">
      <router-link :to="`/photo/${photo.id}`">
        <v-lazy-image :src="photo.urls[photoSize]" />
      </router-link>
    </div>
  </div>
</template>

<script>
import apiClient from "../http-common";
import VLazyImage from "v-lazy-image";

export default {
  name: "Gallery",
  components: { VLazyImage },
  data() {
    return {
      photos: {},
      page: 1,
      perPage: 30,
      photoSize: "small",
    };
  },
  created() {
    this.getPhotos(this.page, this.perPage);
  },
  methods: {
    async getPhotos(page, perPage) {
      await apiClient
        .get(`photos?page=${page}&per_page=${perPage}`)
        .then((res) => {
          this.photos = res.data;
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
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-gap: 1rem;
  max-width: 80rem;
  margin: 5rem auto;
  padding: 0 5rem;
}

.gallery-panel img {
  width: 100%;
  height: 22vw;
  object-fit: cover;
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
  margin-left: -35px;
  font-size: 14px;
  font-weight: bold;
}

.showItems li {
  list-style-type: none;
  display: inline-block;
  margin-left: 10px;
}
</style>
