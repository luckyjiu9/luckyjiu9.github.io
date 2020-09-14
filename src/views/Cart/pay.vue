<template>
  <div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <div class="div_img">
      <img width="100%" src="../../assets/style/u=2380158689,1392955929&fm=26&gp=0.jpg" alt />
    </div>
    <div class="payok_text">
      <span style="color: #00C901;">支付成功</span>
    </div>

    <p class="price_text">￥{{this.$route.query.total}}</p>
    <van-button
      style="margin-top:20%"
      color="#00C901"
      type="primary"
      icon="passed"
      @click="clickply"
      block
    >确定</van-button>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    clickply () {
      this.$router.push('./cart')
    }
  }
}
</script>

<style scoped>
.price_text {
  text-align: center;
  font-size: 40px;
}
.div_img {
  width: 25%;
  height: 25%;
  margin-top: 20%;
  margin: 0 auto;
}
.payok_text {
  font-size: 17px;
  text-align: center;
  color: #000000;
}
</style>