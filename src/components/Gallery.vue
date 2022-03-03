<template>
  <div class="navigation">
    <ul class="pagination">
      <li>
        <a :v-if="page > 1" href="#" @click.prevent="onClickPreviousPage">
          previous
        </a>
      </li>
      <!-- <li v-for="i in photos.length" :key="i">{{ i }}</li> -->
      {{
        " | "
      }}
      <li><a href="#" @click.prevent="onClickNextPage">next</a></li>
    </ul>

    <ul class="showItems">
      <li>
        Show Items:
        <select @change="onChangeRecordsPerPage" v-model="perPage">
          <option :value="10">10</option>
          <option :value="20">20</option>
          <option :value="50">50</option>
          <option :value="100">100</option>
          <option :value="200">200</option>
        </select>
      </li>
    </ul>
  </div>
  <div class="gallery">
    <div class="gallery-panel" v-for="photo in photos" :key="photo.id">
      <picture> </picture>
      <img
        alt="image"
        :loading="loading"
        :src="photo[photoSize]"
        :width="photo[width] ? photo[width] : width"
        :height="photo[height] ? photo[height] : height"
      />

      <!-- <v-lazy-image
        v-if="useModule"
        id="img-module"
        :src="photo.urls[photoSize]"
        :width="photo[width] ? photo[width] : width"
        :height="photo[height] ? photo[height] : height"
      /> -->
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
      perPage: this.$route.query.perPage ? this.$route.query.perPage : 10,
      photoSize: this.$route.query.photoSize
        ? this.$route.query.photoSize
        : "largeImageURL",
      loading: this.$route.query.loading ? this.$route.query.loading : "eager",
      useModule: this.$route.query.useModule
        ? this.$route.query.useModule
        : false,
      width: "1280",
      height: "853",
    };
  },
  created() {
    this.getPhotos(this.page, this.perPage);
  },
  methods: {
    async getPhotos(page, perPage) {
      await apiClient
        .get(
          `?key=25700624-812fa9db0aa07fd100f1c7c0e&per_page=${perPage}&page=${page}`
        )
        .then((res) => {
          this.photos = res.data.hits;
          this.pagesTotal = res.data.totalHits / this.perPage;
          let size = this.$route.query.photoSize;

          switch (size) {
            case "original":
              this.photoSize = "imageURL";
              this.width = "4935";
              this.height = "3290";
              break;
            case "full":
              this.photoSize = "fullHDURL";
              this.width = "1920";
              this.height = "1024";
              break;
            case "large":
              this.photoSize = "largeImageURL";
              this.width = "1280";
              this.height = "853";
              break;
            case "medium":
              this.photoSize = "webformatURL";
              // this.width = "webformatWidth";
              // this.height = "webformatHeight";
              this.width = "previewWidth";
              this.height = "previewHeight";
              break;
            case "small":
              this.photoSize = "previewURL";
              this.width = "previewWidth";
              this.height = "previewHeight";
              break;
            default:
              this.photSize = "largeImageURL";
          }

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
  grid-template-columns: 1fr 1fr 1fr;
  /* grid-template-columns: minmax(120px, 1fr) minmax(120px, 1fr); */
  grid-gap: 1rem;
  max-width: 100%;
  text-align: center;
}

@media only screen and (max-width: 640px) {
  .gallery {
    grid-template-columns: 1fr 1fr;
  }
}

.gallery-panel {
  text-align: center;
}

.gallery-panel img {
  margin: auto;
  display: inline-block;
  /* object-fit: cover; */
  border-radius: 0.2rem;
  width: 100%;
  height: 22vw;
}

.gallery-panel #img-module {
  margin: auto;
  display: inline-block;
  /* object-fit: cover; */
  border-radius: 0.2rem;
  width: 100%;
  height: 22vw;
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
  margin-left: 10px;
  font-size: 14px;
  font-weight: bold;
  padding-inline-start: 5px;
}

.showItems li {
  list-style-type: none;
  display: inline-block;
}
</style>
