<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav_bar"></detail-nav-bar>
    <scroll class="content" :probe-type="3" :pull-up-load="true" ref="scroll" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop-info="shop"></detail-shop-info>
      <detail-goods-info :data-info="detailInfo" @imgLoad="imgLoad" ></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
  import {getDetail, Goods, Shop, GetItemParams, getRecommend} from "@/network/detail";
  import DetailSwiper from "@/views/detail/childComps/DetailSwiper"
  import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
  import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
  import Scroll from "@/components/common/scroll/Scroll";
  import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
  import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
  import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
  import GoodsList from "@/components/content/goods/GoodsList";
  import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";
  import BackTop from "@/components/content/backTop/BackTop";

  import {mapActions} from "vuex/dist/vuex.mjs";



  export default {
    name: "Detail",
    components: {
      DetailGoodsInfo,
      Scroll,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      Shop,
      DetailShopInfo,
      GetItemParams,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      BackTop
    },
    data() {
      return {
        iid: null,
        topImages:[],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        currentIndex: 0,
        isShowBackTop: false,
      }
    },
    methods: {
      ...mapActions(['addCart']),
      backClick() {
        this.$refs.scroll.scrollTo(0,0)
      },
      imgLoad() {
        this.$refs.scroll.refresh()
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
      },
      contentScroll(position){
        let positionY = -position.y
        for(let i = 0;i < this.themeTopYs.length-1;i++){
          if(this.currentIndex !== i && (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
            this.currentIndex = i
          }
        }
        this.$refs.nav_bar.currentIndex = this.currentIndex

        //判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000
      },
       addToCart() {
        //1.获取购物车需要展示的信息
         const product = {}
         product.image = this.topImages[0];
         product.title = this.goods.title;
         product.desc = this.goods.desc;
         product.price = this.goods.realPrice;
         product.iid = this.iid

         //2.将商品添加到购物车
         this.addCart(product).then(res => {
           this.$toast.show()
         })
         // this.$store.dispatch('addCart', product).then(res => {
         //   console.log(this.$toast);
         // })
      }
    },
    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.iid
      //2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        const data = res.result
        //获取顶部的图片
        this.topImages = data.itemInfo.topImages

        //获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        //保存商品的详细数据
        this.detailInfo = data.detailInfo

        //获取参数信息
        this.paramInfo = new GetItemParams(data.itemParams.info, data.itemParams.rule)

        //取出评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }

      })
      //请求推荐数据
      getRecommend().then(res => {
         this.recommends = res.data.list
      })
    }
  }

</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px - 49px)
}
</style>
