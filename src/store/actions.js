import {ADD_COUNTER, ADD_TO_CART} from "@/store/mutation-types";

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      //1.查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(function (item) {
        return item.iid === payload.iid
      })
      //2.判断oldProduct
      if (oldProduct) {//数量加一
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量+1')
      } else {//添加新商品
        payload.count = 1
        context.commit(ADD_TO_CART, payload)
        resolve('添加了新商品')
      }
    })
  }
}
