<template>
  <div>
    <!-- //标头 -->
    <div class="top_div">
      <van-nav-bar
        style="background:rgb(255, 129, 152)"
        title="商品搜索"
        left-text="返回"
        left-arrow
        placeholder
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
      <!-- //搜索框 -->
      <van-search
        @clear="clear"
        v-model="input_text"
        @keydown.enter="input_top"
        shape="round"
        background="rgb(255, 129, 152)"
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
        <div   @click="click_top_list(item)" class="box_history" v-for="(item, index) in top_list_history" :key="index">{{item}}</div>
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
            <p
              style="overflow: hidden;
    text-overflow: ellipsis;
    -ms-text-overflow: ellipsis;
    display: box;
    display: -webkit-box;
    line-clamp: 1;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;"
            >{{item.goodsName}}</p>
            <div class="box_big_center1">
              <div style="color:#ff6699">{{item.goodsOldPrice}}</div>
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
        <nut-icon type="top" color="rgb(255, 129, 152)"></nut-icon>
      </div>
    </nut-backtop>
    <!-- </van-list> -->
  </div>
</template>

<script>
import { getsearchtop, getsearchhistory } from '@/api/user'
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
    input_top () {
      this.isshow = false
      if (this.input_text.length === 0) {
        return;
      }
      this.addHistory(this.input_text);
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
    onClickLeft () {
      window.history.back()
    },
    onClickRight () {
      Toast('按钮');
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

<style lang="css" scoped>
@import "../../assets/style/search.css";
</style>
