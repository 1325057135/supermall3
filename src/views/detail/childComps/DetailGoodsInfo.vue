<template>
  <div class="data-info"  v-if="Object.keys(dataInfo).length !== 0">
    <div class="info-desc clear-fix">
      <div class="start">
      </div>
      <div class="desc">{{dataInfo.desc}}</div>
    </div>
    <div class="info-key">{{dataInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img
        v-for="(item, index) in dataInfo.detailImage[0].list"
        :key="index"
        :src="item"
        @load="imgLoad"
        alt="data-img">
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: 'DetailGoodsInfo',
  data() {
    return {
      imgLength: 0,
    }
  },
  methods:{
    imgLoad(){
      const end =  this.dataInfo.detailImage[0].list.length
      if(++this.imgLength === end){
        this.$emit('imgLoad')
      }
    }
  },
  props: {
    dataInfo:{
      type: Object,
      default(){
        return {};
      }
    }
  },
  // methods: {
  //   imgLoad(){
  //     this.imgLength ++ ;
  //     if(this.imgLength === this.dataInfo.detailImage[0].list.length ){
  //       this.$emit("dataInfoImgLoad");
  //     }
  //   }
  // },
}
</script>
<style scoped>
.data-info {
  padding: 30px 8px 0;
  border-bottom: solid 4px rgba(100, 100, 100, .1);
}
.info-desc {
  padding: 0 8px 0;
  font-size: 14px;
}
.info-desc .desc {
  text-indent: 2em;
}
.info-key {
  padding: 8px;
}
.info-list img{
  width: 100%;
}
</style>
