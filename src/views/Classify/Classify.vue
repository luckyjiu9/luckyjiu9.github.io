<template>
  <div class="box_big">
    <div class="box_top">
      <div>商品分类</div>
      <van-search @click="search()" shape="round" background="black" placeholder="请输入搜索关键词" />
    </div>
    <!-- //头部标签占位div -->
    <div class="box_top_perch"></div>
    <div class="div_tag">
      <div class="box_tag">
        <div
          @click="click_tag(item.cat_id,index)"
          style="width:100%;line-height:60px;height:60px;background:#F7F8FA"
          v-for="(item, index) in tag"
          :key="index"
        >
          <span
            style="margin-left:20%;width:100%"
            :class="tag_index===index?'title':''"
          >{{item.cat_name}}</span>
        </div>
      </div>
    </div>
    <!-- ======================= -->
    <br />
    <div class="div_item">
      <div class="tag_tab">
        <div @click="tag_tab(index)" v-for="(item, index) in tag_text" :key="index">
          <span :class="tag_index_tab===index?'title1':''">{{item}}</span>
        </div>
      </div>
      <div style="width:100%;height:30px;"></div>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="box_big_center">
          <div v-for="(item, index) in tag_item" @click="clickitem(item.goodsId)" :key="index">
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
                ></span>
                <div class="box_big_center1"></div>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
import { postcart_cart_cats, postcart_cart_cats_cart } from '../../api/user'
export default {
  data () {
    return {
      loading: false, //加载状态结束
      finished: false,//数据加载完成
      activeKey: 0,
      tag: [],
      tag_text: ['综合', '销量', '精品'],
      tag_id: 85,
      tag_item: [],
      tag_index: 0,
      tag_index_tab: 0,
      page: 1,
      sortType: 'syn',//参数
    }
  },
  methods: {
    tag_tab (index) {
      this.tag_item = []
      this.tag_index_tab = index
      switch (index) {
        case 0:
          this.sortType = 'syn'
          break;
        case 1:
          this.sortType = 'new'
          break;
        case 2:
          this.sortType = 'sell'
          break;
        default:
          break;
      }
      postcart_cart_cats_cart(
        {
          cat_id: this.tag_id,
          page: this.page,
          pageSize: 20,
          sortType: this.sortType
        }
      ).then(res => {
        console.log(res.data)
        this.tag_item = res.data
      })
    },
    clickitem (id) {
      this.$router.push({
        path: '/detali',
        query: {
          id
        }
      })
    },
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        postcart_cart_cats_cart(
          {
            cat_id: this.tag_id,
            page: this.page++,
            pageSize: 20,
            sortType: this.sortType
          }
        ).then(res => {
          this.tag_item.push(...res.data)
          this.loading = false;
        })

        // 加载状态结束


        // 数据全部加载完成
        if (this.tag_item.length >= 100) {
          this.finished = true;
        }
      }, 1000);
    },
    search () {
      this.$router.push('/search')

    },
    click_tag (id, index) {
      this.tag_index = index
      this.tag_item = []
      this.tag_id = id
      postcart_cart_cats_cart({
        cat_id: this.tag_id,
        page: 1,
        pageSize: 20,
        sortType: 'syn'
      }).then(res => {
        console.log(res.data)
        this.tag_item = res.data
      })
    }
  },
  created () {
    postcart_cart_cats({}).then(res => {
      console.log(res.data)
      this.tag = res.data

    })
    postcart_cart_cats_cart({
      cat_id: this.tag_id,
      page: 1,
      pageSize: 20,
      sortType: 'syn'
    }).then(res => {
      console.log(res.data)
      this.tag_item = res.data
    })
  }
}
</script>

<style scoped>
.tag_tab {
  width: 78.5%;
  margin-top: -2.5%;
  font-size: 13px;

  height: 30px;
  display: flex;
  justify-content: space-around;
  position: fixed;
  top: -1;
  line-height: 30px;
  background: rgb(255, 255, 255);
  z-index: 99999999;
}

.box_top_perch {
  width: 100%;
  height: 98px;
  background: white;
}
.box_tag {
  width: 100%;
  background: #f7f8fa;
  font-size: 13px;
}
.title {
  border-left: 2px solid black;
  padding-left: 10%;
}
.title1 {
  border-bottom: 2px solid black;
  padding-bottom: 2px;
}
.div_tag {
  width: 21.5%;
  height: 85vh;
  float: left;
  overflow: scroll;
}
.pf_box {
  width: 125px;
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

.div_item {
  height: 85vh;
  overflow: scroll;
  width: 78.5%;
  float: left;
}
.box_big_center {
  flex-direction: row;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.box_item img {
  width: 100%;
  height: 130px;
  border-radius: 5px;
}

.box_big_center1 {
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box_item {
  width: 125px;
  height: 145px;
}

.box_top {
  height: 98px;
  width: 100%;
  background: black;
  color: white;
  line-height: 44px;
  text-align: center;
  position: fixed;
  top: 0;
  font-size: 16px;
  z-index: 9999;
}
</style>