<template>
  <Gallery />
</template>

<script>
import Gallery from "@/components/Gallery.vue";

export default {
  name: "home",
  components: {
    Gallery,
  },
  data() {
    return {
      photos: {},
    };
  },
};
</script>
