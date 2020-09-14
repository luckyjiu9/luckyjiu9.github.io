<template>
  <div>
    <van-nav-bar fixed placeholder title="支付" @click-left="onClickLeft" left-arrow />
    <br />
    <br />

    <div class="div_img">
      <img width="100%" src="../../assets/style/u=3897495653,965866136&fm=26&gp=0.jpg" alt />
    </div>
    <p class="price_text">待支付：{{ this.$route.query.price/100}}元</p>
    <br />
    <br />
    <van-radio-group v-model="radio">
      <van-cell-group>
        <van-cell title="余额支付" clickable @click="radio = '1'">
          <template #right-icon>
            <van-radio name="1" />
          </template>
        </van-cell>
        <van-cell title="支付宝支付" clickable @click="radio = '2'">
          <template #right-icon>
            <van-radio name="2" />
          </template>
        </van-cell>
        <van-cell title="微信支付" clickable @click="radio = '3'">
          <template #right-icon>
            <van-radio name="3" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <br />
    <br />
    <br />
    <van-button type="primary" color="#017956" icon="passed" @click="clickply" block>确认支付</van-button>

    <van-popup v-model="show" round position="bottom" style="width:100%;height:340px">
      <van-password-input
        :value="value"
        info="密码为 6 位数字"
        :focused="showKeyboard"
        @focus="showKeyboard = true"
      />
      <van-number-keyboard
        :show="show"
        @input="onInput"
        @delete="onDelete"
        @blur="showKeyboard = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { postcart_cart_create, postcart_cart_Alipay, postcart_cart_pwd, postcart_cart_pay } from '../../api/user'
import md5 from 'js-md5'; qs
import qs from 'qs';
export default {
  data () {
    return {
      value: '',
      showKeyboard: true,
      radio: '1',
      orderNumber: [],
      show: false,
      html: ''
    }
  },
  watch: {
    'value': function (newVal, oldVal) {
      if (newVal.length == 6) {
        this.show = false;

        this.value = md5(this.value)

        postcart_cart_pwd({
          paypwd: this.value
        }).then(res => {
          console.log(res)

          this.value = ''
          if (res.code === 202) {

            this.value = ''
            this.show = true;
            setTimeout(() => {
              this.$toast('密码错误');
          
            }, 500)
            return
          }
          var orderId = this.orderNumber.join(' ')
          postcart_cart_pay({
            orderNum: orderId
          }).then(res => {
            console.log(res)
            if (res.code === 201) {
              setTimeout(() => {
                this.$toast('支付成功');
                this.$router.push({
                  path: './pay',
                  query: {
                    total: this.$route.query.price / 100
                  }
                })
              }, 500)
            } else {
              setTimeout(() => {
                this.$toast('支付失败');
              }, 500)
            }

          })
        })
      }
    }
  },
  created () {

    postcart_cart_create({
      price: this.$route.query.price / 100,
      consignee_addr: this.$route.query.consignee_addr,
      goodsId: this.$route.query.goodsId,
      isFcart: this.$route.query.isFcart,
      num: this.$route.query.num
    }).then(res => {
      console.log(res.data)
      res.data.map((ele) => {
        ele.orderNumber
        this.orderNumber.push(ele.orderNumber)
      })
      console.log(this.orderNumber)

    })
  },
  methods: {
    onInput (key) {
      this.value = (this.value + key).slice(0, 6);
    },
    onDelete () {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    clickply () {
      if (this.radio === '1') {
        this.show = true;
      } else if (this.radio === '2') {
        var orderId = this.orderNumber.join(' ')
        postcart_cart_Alipay({
          OutTradeNo: orderId,
          Subject: '手机网站支付测试',
          ProductCode: ' QUICK_WAP_WAY',
          TotalAmount: this.$route.query.price / 100,
        }).then(res => {
          console.log(res)
          if (res.code === 201) {
            var form = res.data
            const div = document.createElement('div')
            div.innerHTML = form
            document.body.appendChild(div);
            document.forms[0].submit();
          }
        })
      } else {
        this.$toast('微信支付');
      }

    },
    onClickLeft () {
      history.back()
    }
  },
}
</script>

<style scoped>
.price_text {
  text-align: center;
  font-size: 18px;
}
.div_img {
  width: 40%;
  height: 40%;
  margin: 0 auto;
}
</style>
<style >
.van-radio__icon--checked .van-icon {
  color: #fff;
  background-color: #017956;
  border-color: #017956;
}
</style>