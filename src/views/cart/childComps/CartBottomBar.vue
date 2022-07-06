<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button"
                    :is-checked = "isSelectAll" @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计:{{totalPrice}}
    </div>

    <div class="calculate" @click="calcClick">
      去计算:({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
import { debounce } from "@/common/utils";
import { mapGetters } from "vuex";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {//全部选中
        this.cartList.forEach(item => item.checked = false)
      } else {//部分选中或者全部没选中
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.show('请选择购买的商品', 2000)
      }
    }
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥' + this.cartList
        .filter((item) => item.checked)
        .reduce((preValue, item) => {
          return preValue + item.price * item.count;
        }, 0)
        .toFixed(2);
    },
    checkLength() {
      //filter
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      if (this.cartList.length === 0) return false
      //第一种方案
      // return !(this.cartList.filter(item => !item.checked).length)
      //第二种方案
      return !this.cartList.find(item => !item.checked)
    }


  }
}
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;

  background-color: #f6f6f6;

  height: 40px;
  line-height: 40px;
  /*justify-content: space-between;*/
  /*align-items: center;*/
  /*padding: 0 8px;*/
  /*text-align: center;*/
  /*background: #f6f6f6;*/
}
.check-content{
  margin-left: 10px;
  align-items: center;
  width: 60px;
  display: flex;
}
.check-button {
  width: 22px;
  height: 22px;
  line-height: 22px;
  margin-right: 5px;
}

.price {
  flex: 1;
  margin-left: 20px;
}

.calculate {
  width: 90px;
  background-color: red;
  color: white;
  text-align: center;

}
</style>
