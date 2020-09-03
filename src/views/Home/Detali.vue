<template>
  <!-- //大盒子 -->
  <div class="box_big">
    <!-- //头部导航栏 -->
    <div>
      <van-tabs scrollspy sticky v-model="active">
        <van-tab>
          <template #title>
            <van-icon size="23px" @click="back" style="margin-top:4px" name="arrow-left" />
          </template>
        </van-tab>
        <van-tab title="商品">
          <!-- //走马灯 -->
          <div class="detalis_swipe">
            <van-swipe class="my-swipe1" :autoplay="3000" indicator-color="white">
              <van-swipe-item v-for="(item, index) in list_swipe" :key="index">
                <img :src="item" alt width="100%" class="img_swipe1" />
              </van-swipe-item>
            </van-swipe>
          </div>
          <!-- //title标题 -->
          <div style="width:97%;margin-left:1.5%">
            <p style="  ;color:#222;font-size:16px">{{list_text.title}}</p>
          </div>
          <!-- 价格 -->
          <div style="float:left">
            <span style="color:rgb(255, 129, 152);font-size:24px">￥{{list_text.highNowPrice}}</span>
            <span style=" margin-left: 9px;color:gray">
              <s>￥{{list_text.highPrice}}</s>
            </span>
          </div>
          <div>
            <span class="big_jian">大减价</span>
          </div>
          <br />
          <br />
          <!-- 销量 -->
          <div class="sell">
            <span>{{list_sell[0]}}</span>
            <span>{{list_sell[1]}}</span>
            <span>{{list_sell[2]}}</span>
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
            <span class="logo_text">{{list_log.name}}</span>
          </div>
          <!-- //店铺信息 -->
          <br />
          <br />
          <div class="shop_text_box">
            <div class="shop_text_box1">
              <div style="width:40%;margin-left:5%;text-align:center">
                <br />
                <span style="font-size:18px; ">{{list_log.cSells | sellCountFilter}}</span>
                <p></p>
                <span>总销量</span>
              </div>

              <div style="width:40%;margin-left:5%;text-align: center;">
                <br />
                <span style="font-size:18px;">{{list_log.cGoods}}</span>
                <p></p>
                <span>全部宝贝</span>
              </div>
            </div>

            <div class="shop_text_box2">
              <table v-for="(item, index) in list_text_logo" :key="index">
                <td style="font-size:13px;width:65px;height:20px">{{item.name}}</td>
                <td style="color:red;width:35px;height:20px">{{item.score}}</td>
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
          <p style="  color: rgb(117, 117, 117);text-align:center;font-size:14px">穿着效果</p>
          <br />
          <div v-for="(item, index) in list_swipe" :key="index">
            <img :src="item" alt width="100%" />
          </div>
          <p style="  color: rgb(117, 117, 117);text-align:center;font-size:14px">尺码</p>
          <br />
          <table
            style="margin-left:2%;border-bottom:1px solid rgb(236, 236, 236)"
            v-for="(item, index,b) in list_text_cm.tables"
            :key="b"
          >
            <div v-for="(item1, index,a) in item" :key="a">
              <td style="width:146px;height:40px;color:gray;line-height:40px">{{item1[0]}}</td>
              <td style="width:60px;height:40px;color:gray;line-height:40px">{{item1[1]}}</td>
              <td style="width:60px;height:40px;color:gray;line-height:40px">{{item1[2]}}</td>
              <td style="width:60px;height:40px;color:gray;line-height:40px">{{item1[3]}}</td>
            </div>
          </table>
          <br />
          <p>{{list_text_cm.disclaimer}}</p>
          <br />
          <p style="border-bottom:1px solid rgb(230, 230, 230)"></p>
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
            <nut-icon type="top" color="rgb(255, 129, 152)"></nut-icon>
          </div>
        </nut-backtop>
        <van-tab title="参数">
          <br />
          <!-- //商品详细信息 -->

          <p style="  color: rgb(117, 117, 117);text-align:center;font-size:14px">产品参数</p>
          <br />
          <table
            style="margin-left:2%;border-bottom:1px solid rgb(240, 240, 240)"
            v-for="(item, index,b) in list_text_cj.set"
            :key="b"
          >
            <td style="width:60px;height:35px;color:gray;line-height:35px">{{item.key}}</td>
            <td
              style="width:315px;height:35px;color:rgb(241, 85, 114);line-height:35px"
            >{{item.value}}</td>
          </table>
        </van-tab>
        <van-tab title="评论">
          <br />
          <br />

          <br />
          <p
            style="color:white;height:25px;line-height:25px;margin:0 auto;width:80px;text-align:center;font-size:14px;background:rgb(241, 85, 114);border-radius: 8px;"
          >用户评价</p>
          <!-- //用户头像 -->
          <div class="user_box" v-for="(item, index) in list_text_pj" :key="index">
            <div style="margin-left: 2%;">
              <img class="user_img" :src="item.user.avatar" alt />
            </div>
            <div style="margin-left: 2%;">{{item.user.uname}}</div>
          </div>
          <!-- //评论 -->
          <div v-for="(item, index,c) in list_text_pj" :key="c">
            <p style="font-size:14px;width:94%;margin-left:3%;color:gray">{{item.content}}</p>
            <p
              style="font-size:14px;width:94%;margin-left:3%;color:gray"
            >{{item.created | tiems}}&nbsp;&nbsp;&nbsp; {{item.style}}</p>
          </div>
          <br />
          <p
            style="color:white;height:25px;line-height:25px;margin:0 auto;width:80px;text-align:center;font-size:14px;background:rgb(241, 85, 114);border-radius: 8px;"
          >更多评价</p>
          <br />
          <p style="border-bottom:1px solid rgb(230, 230, 230)"></p>
        </van-tab>
        <van-tab title="推荐">
          <div class="div_content">
            <div
              v-for="(item, index) in tab_content.slice(3,9)"
              :key="index"
              @click="detail(item.iid)"
            >
              <div class="div_mig">
                <img class="div_mig1" v-lazy="item.show.img" alt />

                <span
                  style="display: inline-block;
                    white-space: nowrap; 
                     width: 100%; 
                    overflow: hidden;
                    text-overflow:ellipsis;"
                >{{item.title}}</span>
                <div class="xx_box">
                  <div>
                    <span style="color:red">{{item.price}}</span>
                  </div>
                  <div style="width:8px"></div>
                  <div>
                    <van-icon name="star-o" />
                  </div>
                  <div>{{item.cfav}}</div>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
      <div style="width:100%;height:50px"></div>
      <van-goods-action>
        <van-goods-action-icon color="#FF6699" badge="9" icon="comment-o" text="客服" />
        <van-goods-action-icon color="#FF6699" icon="shop-o" text="店铺" />
        <van-goods-action-icon color="#FF6699" icon="star-o" text="收藏" />
        <van-goods-action-button color="#be99ff" type="warning" text="加入购物车" />
        <van-goods-action-button color="#FF6699" type="danger" text="立即购买" />
      </van-goods-action>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data () {
    return {
      active: 1,
      list_swipe: [],
      list_text: [],
      list_sell: [],
      list_shopInfo: [],
      list_log: [],
      list_text_logo: [],
      list_text_cm: [],
      list_text_cj: [],
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
    window.addEventListener("scroll", this.handleScroll, true);
    axios.get("http://123.207.32.32:8000/api/x6/home/data", {
      params: {
        type: 'pop',
        page: 1
      }
    })
      .then(res => {
        console.log(res.data.data.list)
        this.tab_content = res.data.data.list
      })
      .catch(err => {
        console.error(err);
      })
    let id = this.$route.query.id

    axios.get("http://123.207.32.32:8000/api/x6/detail", {
      params: {
        iid: id
      }
    })
      .then(res => {
        console.log(res.data.result)
        this.list_swipe = res.data.result.itemInfo.topImages
        this.list_text = res.data.result.itemInfo
        this.list_sell = res.data.result.columns
        this.list_shopInfo = res.data.result.shopInfo.services
        this.list_log = res.data.result.shopInfo
        this.list_text_logo = res.data.result.shopInfo.score
        this.list_text_cm = res.data.result.itemParams.rule
        this.list_text_cj = res.data.result.itemParams.info
        this.list_text_pj = res.data.result.rate.list

      })

  },
  methods: {
    handleScroll () {
      let scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
      scrolltop > 30 ? (this.gotop = true) : (this.gotop = false);
    },
    detail (id) {


      axios.get("http://123.207.32.32:8000/api/x6/detail", {
        params: {
          iid: id
        }
      })
        .then(res => {
          console.log(res.data.result)
          this.list_swipe = res.data.result.itemInfo.topImages
          this.list_text = res.data.result.itemInfo
          this.list_sell = res.data.result.columns
          this.list_shopInfo = res.data.result.shopInfo.services
          this.list_log = res.data.result.shopInfo
          this.list_text_logo = res.data.result.shopInfo.score
          this.list_text_cm = res.data.result.itemParams.rule
          this.list_text_cj = res.data.result.itemParams.info
          this.list_text_pj = res.data.result.rate.list

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

<style  scoped>
.box_big {
  width: 375px;
  height: 100vh;
}

.van-tab--active {
  color: rgb(255, 129, 152);
  font-weight: 500;
}

.van-tabs__line {
  position: absolute;
  bottom: 15px;
  z-index: 1;
  width: 40px;
  height: 0px;
  background-color: rgb(255, 129, 152) !important;
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
  background: rgb(241, 85, 114);
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
