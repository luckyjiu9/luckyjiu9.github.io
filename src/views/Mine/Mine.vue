<template>
  <div class="box_big">
    <div style="width:100%;height:160px">
      <div class="box_top">
        <div class="box_top_div1">
          <div>
            <img
              @click="login"
              style="width:60px;height:60px;border-radius:50% 50%;"
              src="../../assets/01 gettyimages-981459238_resized.jpg"
              alt
            />
          </div>
          <div style="margin-left:10px;font-size:16px;width:44.5%">林9九</div>
          <div class="sign_box">签到有礼</div>
        </div>
        <div class="box_nian">
          <div style="width:60%;margin-left:10%">开通黑钻卡,购物享八折,抵用券多多</div>
          <div class="cart_color">
            立即购买
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
    </div>
    <!-- ===================== -->
    <div class="div_content1">
      <div
        class="div_flex"
        style="width:100%;height:70px;line-height:70px;background:white;border-radius:5px 5px;"
      >
        <div style="width:50%;font-size:13px;text-align:center">
          账户余额
          <span style="font-weight:bold">4444</span>元
        </div>
        <div style="width:50%;font-size:13px;text-align:center">
          积分
          <span style="font-weight:bold">157</span>分
        </div>
      </div>
      <br />
      <div style="width:100%;height:140px;background:white;border-radius:5px 5px">
        <br />
        <div style="margin-left:5%;font-size:14px;display:flex">
          <div style="width:70%">我的订单</div>
          <div>
            查看更多订单
            <van-icon name="arrow" />
          </div>
        </div>
        <br />
        <van-grid>
          <van-grid-item icon="send-gift-o" text="全部" />
          <van-grid-item icon="pending-payment" text="待支付" />
          <van-grid-item icon="point-gift-o" text="待收货" />
          <van-grid-item icon="comment-o" text="待评价" />
        </van-grid>
      </div>
      <br />
      <div style="width:100%;height:30px;background:white;border-radius:5px 5px"></div>
      <br />
      <div style="width:100%;height:140px;background:white;border-radius:5px 5px">
        <br />

        <div style="margin-left:5%;font-size:14px;display:flex">
          <div style="width:70%">常用功能</div>
        </div>
        <br />
        <van-grid>
          <van-grid-item icon="orders-o" text="收货地址" />
          <van-grid-item icon="star-o" text="收藏" />
          <van-grid-item icon="eye-o" text="浏览记录" />
          <van-grid-item icon="setting-o" text="设置" />
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    login () {
      this.$router.push('./login')
    }
  },
}
</script>
// 
<style scoped>
.div_flex {
  display: flex;
  justify-items: center;
  align-items: center;
}
.div_content1 {
  overflow: hidden;
  height: 60vh;
  margin-left: 4%;
  margin-top: 10%;
  width: 92%;
}
.box_big {
  overflow: hidden;
  height: 93vh;
  width: 100%;
  background: #f3f3f3;
}
.cart_color {
  width: 70px;
  border-radius: 20px 20px;
  color: white;
  line-height: 20px;
  text-align: center;
  height: 20px;
  background: rgb(0, 0, 0);
}
.box_nian {
  display: flex;
  align-items: center;
  color: rgb(0, 0, 0);
  width: 92%;
  margin-left: 4%;
  height: 22.6%;
  background: rgb(243, 243, 243);
  border-radius: 10px 10px 0px 0px;
}
.sign_box {
  width: 80px;
  background: rgb(243, 243, 243);
  border-radius: 20px 20px;
  height: 30px;
  line-height: 30px;
  color: black;
  text-align: center;
}
.box_top_div1 {
  display: flex;

  align-items: center;
  width: 100%;
  padding: 14px 20px;
  height: 60%;
  background-color: rgb(0, 0, 0);
}
.box_top {
  width: 100%;
  height: 160px;
  background: rgb(0, 0, 0);
  color: white;
}
.div_top_tel {
  display: flex;
}
</style>