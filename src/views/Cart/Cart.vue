<template>
  <div>
    <!-- //头部 -->

    <div class="Cart_top">
      <van-nav-bar
        title="Code购物车"
        @click-left="onClickLeft"
        right-text="管理"
        @click-right="onClickRight"
        style="color:black"
        left-arrow
      />
    </div>
    <br />
    <!-- //占位图 -->
    <van-empty
      v-show="imgshow"
      class="custom-image"
      image="https://img.yzcdn.cn/vant/custom-empty-image.png"
      description="还没有商品呢"
    />
    <!-- //购物车商品 -->

    <van-checkbox-group v-model="result" @change="checked_change" ref="checkboxGroup">
      <div class="div_box_flex">
        <div v-for="(item, index) in cart_item" :key="index">
          <div class="box_flex_bottom" v-show="!imgshow">
            <div class="checkbox_cart">
              <van-checkbox :name="item"></van-checkbox>
            </div>
            <van-swipe-cell>
              <van-card
                :num="item.product_amount"
                :price="item.price"
                :title="item.title"
                :thumb="item.image"
              >
                <template #num v-if="numshow">
                  <van-stepper
                    v-model="item.product_amount"
                    theme="round"
                    button-size="22"
                    @plus="numplus"
                    disable-input
                  />
                </template>
              </van-card>
              <template #right>
                <van-button
                  square
                  text="删除"
                  @click="clickdelete(item,index,item.cart_id)"
                  type="danger"
                  class="delete-button"
                />
              </template>
            </van-swipe-cell>
          </div>
        </div>
      </div>
    </van-checkbox-group>
    <!-- //结账底部栏 -->
    <van-submit-bar :price="this.num" button-text="提交订单" @submit="onSubmit">
      <!-- <van-checkbox type="primary" >全选</van-checkbox> -->
      <van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import { postcartadd_user, postcart_delete } from '../../api/user'
export default {
  data () {
    return {
      imgshow: false,//占位图
      result: [],
      cart_item: [],//购物车数据
      carid: '',//删除购物车商品
      checked: false,
      num: 0,
      numshow: false,
      shopitem: [],
      shopid: []

    }
  },

  mounted () {
    //购物车数据请求
    this.postcartadd_user()

  },
  methods: {
    // shopclick (id) {
    //   if (this.checked === true) {
    //     this.shopitem.push(id)
    //     console.log(this.shopitem)
    //   } else {

    //   }
    // },
    numplus () {
      this.cart_total()
    },
    cart_total () {
      this.num = 0
      this.result.map((ele) => {
        // console.log(ele.price * ele.product_amount)
        this.num += ele.price * 100 * ele.product_amount
      })
    },

    onClickRight () {
      this.numshow = !this.numshow
    },

    checked_change () {

      if (this.result.length == this.cart_item.length) {
        this.checked = true
      } else {
        this.checked = false

      }
      if (this.result.length === 0) {
        this.checked = false
      }
      this.cart_total()

    },
    // =====================
    async postcartadd_user () {
      let res = await postcartadd_user({})
      console.log(res.data)
      this.cart_item = res.data
      // console.log(this.cart_item)
      if (this.cart_item === null) {
        this.imgshow = true
      } else {
        this.imgshow = false
      }
    },
    // ============================
    checkAll () {
      if (
        this.checked
      ) {
        this.$refs.checkboxGroup.toggleAll(true);
      } else {
        this.$refs.checkboxGroup.toggleAll();
      }

    },
    //返回上一步
    onClickLeft () {
      window.history.back()
    },

    // 删除数据
    clickdelete (item, index, cart_id) {

      this.carid += cart_id + ','
      //删除购物车
      postcart_delete({
        carid: this.carid
      }).then(res => {
        console.log(res)
        this.result.splice(index, 1)
        this.cart_item.splice(index, 1)
        this.checked_change()
        this.$toast('删除成功');
        if (this.cart_item.length === 0) {
          this.imgshow = true
        } else {
          this.imgshow = false
        }
      })
    },
    //跳转支付订单页
    onSubmit () {
      this.result.map((ele) => {
        this.shopitem.push(ele.product_id)
        // console.log(this.shopitem)
        this.shopid = this.shopitem.join(' ')

      })
      if (this.result.length === 0) {
        this.$toast('请勾选商品');
        return
      } else {
        this.$router.push({
          path: './order',
          query: {
            id: this.shopid
          }
        })
      }
    },
    //跳转详情
    click_detali (id) {
      this.$router.push({
        path: '/detali',
        query: {
          id
        }
      })
    }
  },
}
</script>

<style scoped >
.van-stepper--round .van-stepper__minus {
  color: #000000;
  background-color: #fff;
  border: 1px solid #000000;
}
.van-stepper--round .van-stepper__plus {
  color: #fff;
  background-color: #000000;
}
.van-checkbox__icon--checked .van-icon {
  color: #fff;
  background-color: #000000;
  border-color: #000000;
}
.van-checkbox {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;

  -webkit-user-select: none;
  user-select: none;
}

.van-card {
  position: relative;
  box-sizing: border-box;
  padding: 8px 16px;
  margin-left: 1%;
  color: #323233;
  font-size: 12px;
  background-color: #ffffff;
  border-bottom: 1px solid rgb(221, 220, 220);
}
.van-submit-bar__price {
  color: #000000;
  font-weight: 500;
  font-size: 12px;
}
.van-submit-bar__button--danger {
  background: black;
}
.van-submit-bar {
  position: fixed;
  bottom: 52px !important;
  left: 0;
  z-index: 99;
  width: 100%;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  background-color: rgb(255, 255, 255);
  -webkit-user-select: none;
  user-select: none;
}
</style>
<style  scoped>
.div_box_flex div:nth-child(1) {
  display: flex;
  flex: 2;
}
.div_box_flex {
  margin-left: 4%;
}
.box_flex_bottom {
  border-bottom: 1px solid rgb(226, 223, 223);
}

.delete-button {
  height: 100%;
}
.goods-card {
  margin: 0;

  background-color: white;
}
</style>