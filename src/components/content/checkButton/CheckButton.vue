<template>
  <div class="check-btn" :class="{ 'check': isChecked }">
    <img
      src="@/assets/img/cart/tick.svg"
      alt=""
      srcset=""
    />
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      isChecked: {
        type: Boolean,
        default: true,
      },
    },
  }
</script>

<style scoped>
.check-btn {
  border: 2px solid #aaa;
  border-radius: 50%;


}
.check {
  background-color: pink;
  border-color: pink;
}
/*.check-btn img {*/
/*  border-radius: 50%;*/
/*  !* background: red; *!*/
/*  background: pink;*/
/*}*/
</style>
