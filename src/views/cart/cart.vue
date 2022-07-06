<template>
  <div class="cart">
<!--    导航栏-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>

<!--    商品列表-->
    <cart-list></cart-list>

<!--    底部汇总-->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import CartList from "@/views/cart/childComps/CartList";
  import CartBottomBar from "@/views/cart/childComps/CartBottomBar";
  import { mapGetters } from 'vuex'
  export default {
    name: "cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      //两种写法
      ...mapGetters(['cartLength'])
      // ...mapGetters({
      //   length: 'cartLength'
      // })
    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: white;
    /*font-weight: 700;*/
  }
  .cart {
    position: relative;
    height: 100vh;
  }
</style>
