<template>
  <div>
    <!-- //标头 -->
    <div style="width:100%;height:107px;background:black">
      <div
        style=";color:white;height:40px;line-height:40px;margin-left:20px;font-size:14px "
        @click="onClickLeft"
      >返回</div>
      <!-- //搜索框 -->

      <van-search
        style="position: fixed;
    top: 46;width:100%;  z-index: 9999;"
        @clear="clear"
        v-model="input_text"
        @keydown.enter="input_top"
        shape="round"
        background="black"
        placeholder="回车搜索商品"
      />
    </div>
    <br />
    <div v-show="isshow">
      <!-- //热搜 -->

      <p class="top_box">全网热搜</p>

      <br />
      <div class="box_history_big">
        <div
          v-for="(item, index) in top_list"
          :key="index"
          @click="click_top_list(item)"
          class="box_history"
        >{{item}}</div>
      </div>
      <br />
      <br />
      <!-- //历史记录 -->
      <p class="top_box">历史记录</p>

      <br />
      <div class="box_history_big">
        <div
          @click="click_top_list(item)"
          class="box_history"
          v-for="(item, index) in top_list_history"
          :key="index"
        >{{item}}</div>
      </div>
    </div>

    <!-- //懒加载 -->
    <!-- <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"> -->
    <div class="box_big_center">
      <div v-for="(item, index) in list_item" @click="clickitem(item.goodsId)" :key="index">
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
              <div style="color:#000">{{item.goodsOldPrice}}</div>
              <div style="margin-left:5%">
                <van-icon name="star-o" />
              </div>
              <div>{{item.goodsFav}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
    <!-- </van-list> -->
  </div>
</template>

<script>
import { getsearchtop, getsearchhistory } from '@/api/user'
import {debounce} from "./../../kit/kit"
export default {
  data () {
    return {
      top_list_history: [],

      input_text: '',
      page: 1,//首页内容页数
      sortType: 'syn',//参数
      tab_index: 0,
      list_item: [],//总数据
      // loading: false, //加载状态结束
      // finished: false,//数据加载完成
      top_list: [],
      minPrice: 0,
      maxPrice: 100,
      isshow: true

    }
  },
  methods: {
    clickitem (id) {
      this.$router.push({
        path: '/detali',
        query: {
          id
        }
      })
    },
    // onLoad () {
    //   // 异步更新数据
    //   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //   setTimeout(() => {
    //     getsearchhistory(
    //       {
    //         page: this.page++,
    //         pageSize: 20,
    //         minPrice: this.minPrice,
    //         maxPrice: this.maxPrice
    //       }
    //     ).then(res => {
    //       this.list_item.push(...res.data)
    //       this.loading = false;
    //     })

    //     // 加载状态结束


    //     // 数据全部加载完成
    //     if (this.list_item.length >= 100) {
    //       this.finished = true;
    //     }
    //   }, 1000);
    // },
    click_top_list (item) {
      this.input_text = item
      this.input_top()


    },
    clear () {
      this.isshow = true
      this.list_item = []
    },
    input_fd () {
      console.log(111)
      getsearchhistory(
        {
          goodsName: this.input_text,
          page: this.page++,
          pageSize: 20,
          minPrice: this.minPrice,
          maxPrice: this.maxPrice
        }
      ).then(res => {
        console.log(res.data)
        this.list_item = res.data
      })
    },
    input_top () {
      this.isshow = false
      if (this.input_text.length === 0) {
        return;
      }
      this.addHistory(this.input_text);
     this.input_fd()
     debounce(this.input_fd,31000)
    },
    onClickLeft () {
      window.history.back()
    },

    addHistory (item) {
      var index = this.top_list_history.findIndex((ele) => {
        return ele === item;
      });

      if (index !== -1) {
        this.top_list_history.splice(index, 1);
      }

      this.top_list_history.unshift(item);

      if (this.top_list_history.length > 5) {
        this.top_list_history.pop();
      }
    },
  },
  mounted () {

    getsearchtop(

    ).then(res => {
      console.log(res.data)
      this.top_list = res.data
    })
  },
}

</script>

<style scoped>
.box_history_big {
  width: 90%;
  margin-left: 5%;
  overflow: hidden;
}

.van-nav-bar--fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: black;
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

.box_history {
  padding: 2px 4px 2px 4px;
  border: 1px solid rgb(226, 225, 225);
  margin-right: 4%;
  margin-top: 3%;
  float: left;
}

.top_box {
  font-size: 14px;
  margin-left: 5%;
}

.top_div {
  width: 100%;
  height: 100px;
  background: black;
}

.van-nav-bar__text {
  color: rgb(255, 255, 255) !important;
}

.van-icon-arrow-left::before {
  content: "\F008";
  color: white;
}

.van-nav-bar__title {
  max-width: 60%;
  margin: 0 auto;
  color: white;
  font-weight: 500;
  font-size: 16px;
}
</style>
