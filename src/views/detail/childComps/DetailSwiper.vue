<template>

    <swiper class="detail-swiper">
      <swiper-item   v-for="item in topImages">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
</template>

<script>
import SwiperItem from "@/components/common/swiper/SwiperItem";
import Swiper from "@/components/common/swiper/Swiper";
export default {
  name: "DetailSwiper",
  components: {
    SwiperItem,
    Swiper
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.swiper {
  height: 300px;
  overflow: hidden;
}
</style>
