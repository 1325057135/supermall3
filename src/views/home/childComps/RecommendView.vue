<template>
  <div class="recommend">
    <div class="recommend-item" v-for="item in recommends">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default(){
        return []
      }
    }
  }
  }
</script>

<style scoped>
  .recommend{
    display: flex;
    width: 100%;
    text-align: center;
    padding: 10px 0 30px;
    border-bottom: 10px solid #eee;
    font-size: 12px;
  }

  .recommend-item{
    flex: 1;
  }

  .recommend-item img{
    width: 75px;
    height: 65px;
    border-radius: 100%;
    margin-bottom: 10px;

  }
</style>
