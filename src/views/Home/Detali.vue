<template>
  <!-- //大盒子 -->
  <div class="box_big">
    <!-- //头部导航栏 -->
    <div>
      <van-tabs scrollspy sticky v-model="active">
        <van-tab>
          <template #title>
            <van-icon
              size="23px"
              @click="back"
              style="margin-top:4px;color:black"
              name="arrow-left"
            />
          </template>
        </van-tab>
        <van-tab title="商品">
          <!-- //走马灯 -->
          <div class="detalis_swipe">
            <van-swipe class="my-swipe1" :autoplay="3000" indicator-color="white">
              <van-swipe-item>
                <img :src="list_swipe" alt width="100%" class="img_swipe1" />
              </van-swipe-item>
            </van-swipe>
          </div>
          <!-- //title标题 -->
          <div style="width:97%;margin-left:1.5%">
            <p style="  ;color:#222;font-size:16px">{{list_text.goodsName}}</p>
          </div>
          <!-- 价格 -->
          <div style="float:left">
            <span style="color:black;font-size:24px;margin-left:4%">{{list_text.goodsOldPrice}}</span>
            <span style=" margin-left: 9px;color:gray">
              <s>￥{{list_text.goodsPrice}}</s>
            </span>
          </div>
          <div>
            <span class="big_jian">大减价</span>
          </div>
          <br />
          <br />
          <!-- 销量 -->
          <div class="sell">
            <span>销量:{{list_text.goodsBuyNum}}</span>
            <span>收藏:{{list_text.goodsFav}}</span>
            <span>宝贝:{{list_text.hot}}</span>
          </div>
          <!-- 退换 -->
          <div class="sell1">
            <div v-for="(item, index) in list_shopInfo.slice(0,3)" :key="index">
              <div>
                <img style="width:14px;height:14px;margin-top:-5px" :src="item.icon" />
                <span>{{item.name}}</span>
              </div>
            </div>
          </div>
          <!-- //空格 -->
          <div class="kun1"></div>
          <br />
          <!-- //店铺头像 -->
          <div class="logo_box">
            <div style="width:10px"></div>
            <span>
              <img :src="list_log.shopLogo" class="logo_img" alt />
            </span>
            <div style="width:10px"></div>
            <span class="logo_text">{{list_log.shopName}}</span>
          </div>
          <!-- //店铺信息 -->
          <br />
          <br />
          <div class="shop_text_box">
            <div class="shop_text_box1">
              <div style="width:40%;margin-left:5%;text-align:center">
                <br />
                <span style="font-size:18px; ">{{list_log.sells | sellCountFilter}}</span>
                <p></p>
                <span>总销量</span>
              </div>

              <div style="width:40%;margin-left:5%;text-align: center;">
                <br />
                <span style="font-size:18px;">{{list_log.snum}}</span>
                <p></p>
                <span>全部宝贝</span>
              </div>
            </div>

            <div class="shop_text_box2">
              <table>
                <td style="font-size:13px;width:65px;height:20px">店铺评分:</td>
                <td style="color:red;width:35px;height:20px">{{this.list_log.shopPiont}}</td>
                <td>
                  <span style="background:red;color:white">高</span>
                </td>
              </table>
              <table>
                <td style="font-size:13px;width:65px;height:20px">店铺评分:</td>
                <td style="color:red;width:35px;height:20px">{{this.list_log.shopPriceOk}}</td>
                <td>
                  <span style="background:red;color:white">高</span>
                </td>
              </table>
              <table>
                <td style="font-size:13px;width:65px;height:20px">店铺评分:</td>
                <td style="color:red;width:35px;height:20px">{{this.list_log.shopPiont}}</td>
                <td>
                  <span style="background:red;color:white">高</span>
                </td>
              </table>
            </div>
          </div>
          <br />
          <!-- //进店 -->
          <div class="jdgg">进店逛逛</div>
          <br />

          <hr />
          <br />
        </van-tab>
        <nut-backtop :bottom="70">
          <div
            style="
        height: 40px;
  width: 40px;
  background: rgb(255, 255,255);
  border-radius: 50% 50%;
    display: flex;
    align-items: center;
    justify-content: center;"
          >
            <div></div>
            <nut-icon type="top" color="black"></nut-icon>
          </div>
        </nut-backtop>
        <van-tab title="参数">
          <div class="html_img" v-html="list_text.goodsIntroduce"></div>
        </van-tab>
        <van-tab title="评论">
          <br />
          <br />

          <br />
          <p
            style="color:white;height:25px;line-height:25px;margin:0 auto;width:80px;text-align:center;font-size:14px;background:black;border-radius: 8px;"
          >用户评价</p>
          <!-- //用户头像 -->
          <div class="user_box">
            <div style="margin-left: 2%;">
              <img class="user_img" src="../../assets/01 gettyimages-981459238_resized.jpg" alt />
            </div>
            <div style="margin-left: 2%;">林9九</div>
          </div>
          <!-- //评论 -->
          <div>
            <p style="font-size:14px;width:94%;margin-left:3%;color:gray">如果我们都还活着,是不是该拼搏呢</p>
            <p
              style="font-size:14px;width:94%;margin-left:3%;color:gray"
            >{{152566266225 | tiems}}&nbsp;&nbsp;&nbsp;</p>
          </div>
          <br />
          <p
            style="color:white;height:25px;line-height:25px;margin:0 auto;width:80px;text-align:center;font-size:14px;background:black;border-radius: 8px;"
          >更多评价</p>
          <br />
          <p style="border-bottom:1px solid rgb(230, 230, 230)"></p>
        </van-tab>
        <van-tab title="推荐">
          <div class="box_big_center">
            <div v-for="(item, index) in list_item" @click="detail(item.goodsId)" :key="index">
              <div style="width:100%">
                <div class="box_item">
                  <img v-lazy="item.goodsLogo" width="100%" />
                  <div class="pf_box">销量:{{item.goodsBuyNum}}</div>
                  <span
                    style="overflow: hidden;
    text-overflow: ellipsis;
    -ms-text-overflow: ellipsis;
    display: box;
    display: -webkit-box;
    line-clamp: 1;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;"
                  >{{item.goodsName}}</span>
                  <div class="box_big_center1">
                    <div style="color:black">{{item.goodsOldPrice}}</div>
                    <div style="margin-left:5%">
                      <van-icon name="star-o" />
                    </div>
                    <div>{{item.goodsFav}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
      <div style="width:100%;height:50px"></div>

      <van-goods-action>
        <van-goods-action-icon color="black" icon="comment-o" text="客服" />
        <van-goods-action-icon
          color="black"
          @click="cart_path"
          icon="shopping-cart-o"
          :badge="this.num"
          text="购物车"
        />
        <van-goods-action-icon color="black" icon="star-o" text="收藏" />
        <van-goods-action-button color="black" @click="cart_add" type="warning" text="加入购物车" />
        <van-goods-action-button color="black" type="danger" text="立即购买" />
      </van-goods-action>
    </div>
  </div>
</template>

<script>
import axios from "axios"

import { getHomedetali, getHometabList, postcartadd, postcartadd_legth } from '../../api/user'
export default {
  data () {
    return {
      active: 1,
      list_swipe: [],
      list_text: [],
      num: '',
      cart_add_num: 1,
      list_shopInfo: [],
      list_log: [],

      list_item: [],
      list_text_pj: [],
      tab_content: [],
      gotop: false


    }
  },
  filters: {

    sellCountFilter (value) {
      let result = value;
      if (value > 10000) {
        result = (result / 10000).toFixed(1) + '万'
      }
      return result
    },
    tiems (newdate) {
      var date = new Date(parseInt(newdate) * 1000);
      let create_time = `${date.getFullYear()}/${date.getMonth() +
        1}/${date.getDate() + 1}`;
      return create_time;
    }



  },
  mounted () {

    postcartadd_legth({}).then(res => {
      console.log(res)
      this.num = res.data
    })
    getHometabList(
      {
        page: this.page,
        pageSize: 20,
        sortType: this.sortType
      }
    ).then(res => {
      console.log(res.data)
      this.list_item = res.data
    })
    window.addEventListener("scroll", this.handleScroll, true);

    let goodsId = this.$route.query.id
    getHomedetali({
      goodsId: goodsId
    }).then(res => {
      console.log(res.data)
      this.list_swipe = res.data[0].goodsLogo
      this.list_text = res.data[0]
      this.list_shopInfo = res.data[2]
      this.list_log = res.data[1]



    })
  },
  methods: {
    cart_path () {
      this.$router.push('/cart')

    },
    async cart_add_item () {
      let res = await postcartadd({
        product_id: this.$route.query.id,
        product_amount: this.cart_add_num++,
        price: this.list_text.goodsPrice
      })
      console.log(res)
      this.cart_add_item_length()
    },
    async cart_add_item_length () {
      let res = await postcartadd_legth({})
      console.log(res)
      this.num = res.data
      this.$toast('添加购物车成功');
    },
    cart_add () {
      this.cart_add_item()


    },
    handleScroll () {
      let scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
      scrolltop > 30 ? (this.gotop = true) : (this.gotop = false);
    },
    detail (id) {

      getHomedetali({
        goodsId: id
      }).then(res => {
        console.log(res.data)
        console.log(res.data[3][0].comment_body)
        this.list_swipe = res.data[0].goodsLogo
        this.list_text = res.data[0]
        this.list_shopInfo = res.data[2]
        this.list_log = res.data[1]
      })

      let top = document.documentElement.scrollTop || document.body.scrollTop;
      // 实现滚动效果 
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
        if (top <= 0) {
          clearInterval(timeTop);
        }
      }, 2);

    },
    onClickIcon () {
      Toast('点击图标');
    },
    onClickButton () {
      Toast('点击按钮');
    },
    back () {
      history.back()
    },
  },
}
</script>
<style >
.van-tabs--line .van-tabs__wrap {
  height: 44px;
  background: white;
}
.van-tabs__line {
  position: absolute;
  bottom: 15px;
  left: 0;
  z-index: 1;
  width: 40px;
  height: 3px;
  background-color: #000000 !important;
  border-radius: 3px;
}
</style>
<style  scoped>
.box_big {
  width: 375px;
  height: 100vh;
}

.van-tab--active {
  color: black;
  font-weight: 500;
}

.van-tabs__line {
  position: absolute;
  bottom: 15px;
  z-index: 1;
  width: 40px;
  height: 0px;
  background-color: black !important;
  font-weight: bold;
}

.my-swipe1 {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  width: 375px;
  height: 400px !important;
  text-align: center;
}
.html_img >>> img {
  width: 100%;
}
.div_mig {
  width: 175px;
  height: 303px;
}

.xx_box {
  display: flex;
  justify-content: center;
}
.div_mig1 {
  width: 175px;
  height: 262px;
  border-radius: 5px;
}

.user_box {
  display: flex;
  align-items: center;
}
.box_big_center {
  flex-direction: row;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.box_item img {
  width: 100%;
  height: 280px;
  border-radius: 5px;
}

.box_big_center1 {
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box_item {
  width: 175px;
  height: 320px;
}

.user_img {
  border-radius: 50% 50%;
  width: 45px;
  height: 45px;
}

.div_content {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.img_swipe1 {
  width: 100%;
  height: 600px;
}

.big_jian {
  width: 46px;
  height: 17.6px;
  border-radius: 8px;
  background: rgb(0, 0, 0);
  color: rgb(255, 255, 255);
  display: inline-block;
  text-align: center;
  margin-left: 9px;
}

.sell {
  display: flex;
  justify-content: space-between;
  width: 97%;
  margin-left: 1.5%;
  color: gray;
  border-bottom: 1px solid rgb(230, 230, 230);
  padding-bottom: 2px;
}

.sell1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  margin-left: 2.5%;
  color: rgb(0, 0, 0);
  font-size: 13px;
  padding-bottom: 2px;
  height: 60px;
  color: gray;
}

.kun1 {
  width: 375px;
  height: 5px;
  background: rgb(243, 243, 243);
}

.logo_img {
  width: 45px;
  height: 45px;
  border-radius: 50% 50%;
  border: 2px solid rgb(219, 218, 218);
}
.pf_box {
  width: 175px;
  height: 30px;
  border-radius: 5px;
  color: white;
  background: rgb(0, 0, 0, 0.5);
  text-align: center;
  line-height: 30px;
  margin-top: -32px;
  font-size: 13px;
  position: relative;
}
.logo_box {
  display: flex;
  align-items: center;
}

.logo_text {
  font-size: 16px;
  color: rgb(131, 129, 129);
}

.shop_text_box {
  width: 88%;
  margin-left: 6%;
  display: flex;
}

.shop_text_box1 {
  width: 95%;
  display: flex;
  align-items: flex-end;

  height: 100%;
  border-right: 1px solid rgb(219, 218, 218);
  padding-right: 5%;
}

.shop_text_box2 {
  width: 90%;
  height: 100%;
  margin-left: 10%;
}

.jdgg {
  width: 140px;
  text-align: center;
  height: 25px;
  line-height: 25px;
  background: rgb(236, 235, 235);
  border-radius: 10px;
  margin: 0 auto;
  color: rgb(117, 117, 117);
}
</style>
