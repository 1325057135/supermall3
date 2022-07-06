<template>
  <div class="toast" v-show="isShow">
    <div class="message">{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    props: {
      // message: {
      //   type: String,
      //   default: ''
      // },
      // show: {
      //   type: Boolean,
      //   default: false
      // }
    },
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message='添加购物车成功', duration=2000) {
        this.isShow = true;
        this.message = message

        setTimeout(() => {
          this.isShow = false
          this.message = ''
        }, duration)
      }
    }
  }
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 8px 10px;
  transform: translate(-50%,-50%);
  background-color: rgba(0,0,0,.75);
  z-index: 999;
}
.message {
  color: white;
}
</style>
