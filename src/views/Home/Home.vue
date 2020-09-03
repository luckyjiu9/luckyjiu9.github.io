  <template>
  <div class="box_big">
    <!-- //头部标签 -->
    <div class="box_top">
      <div>luckyjiu9</div>
      <van-search
        @click="search()"
        shape="round"
        background="rgb(255, 129, 152)"
        placeholder="请输入搜索关键词"
      />
    </div>
    <!-- //头部标签占位div -->
    <div class="box_top_perch"></div>
    <!-- //swipe轮播 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in list_swipe" :key="index">
        <img :src="item.slide_show_imgUrl" width="100%" alt />
      </van-swipe-item>
    </van-swipe>
    <br />
    <!-- //宫格 -->
    <van-grid :column-num="5" :border="false">
      <van-grid-item v-for="(item, index) in list_grid" :key="index">
        <img :src="item.sp_home_ico" width="100%" alt />
        <br />
        <span class="list_tab_text">{{item.sp_home_title}}</span>
      </van-grid-item>
    </van-grid>
    <br />
    <!-- 回到顶部 -->
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
    <!-- 装饰条 -->
    <div class="box_color"></div>
    <br />
    <!-- 吸顶tab -->
    <div class="glg">
      <div class="tab_box">
        <div
          :class="tab_index===index?'tab_title':''"
          v-for="(item, index) in list_tab_text"
          :key="index"
        >
          <span @click="click_tab(index)">{{item}}</span>
        </div>
      </div>
    </div>
    <br />
    <!-- //懒加载内容 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
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
    </van-list>
  </div>
</template>
  
<script>
// axios引入
import { getHomeList, getHometabList } from '@/api/user'
export default {
  data () {
    return {
      list_swipe: [],//轮播
      list_grid: [],//宫格
      list_tab_text: ['流行', '新款', '精选'],//tab栏文字
      page: 1,//首页内容页数
      sortType: 'syn',//参数
      tab_index: 0,
      list_item: [],//总数据
      loading: false, //加载状态结束
      finished: false,//数据加载完成
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
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        getHometabList(
          {
            page: this.page++,
            pageSize: 20,
            sortType: this.sortType
          }
        ).then(res => {
          this.list_item.push(...res.data)
          this.loading = false;
        })

        // 加载状态结束


        // 数据全部加载完成
        if (this.list_item.length >= 100) {
          this.finished = true;
        }
      }, 1000);
    },
    //跳转搜索页面
    search () {
      this.$router.push('/search')

    },
    // 跳转详情页
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
        getHometabList(
          {
            page: this.page++,
            pageSize: 20,
            sortType: this.sortType
          }
        ).then(res => {
          this.list_item.push(...res.data)
          this.loading = false;
        })

        // 加载状态结束


        // 数据全部加载完成
        if (this.list_item.length >= 100) {
          this.finished = true;
        }
      }, 1000);
    },
    //点击tab栏切换
    click_tab (index) {
      this.finished = false
      this.list_item = []
      this.tab_index = index;
      //tab切换和内容
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
    },

  },

  mounted () {
    //宫格,轮播数据
    getHomeList().then(res => {
      console.log(res.data[0])
      this.list_swipe = res.data[1]
      this.list_grid = res.data[0]
    })
    //tab切换和内容
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
  }
}
</script >
  
<style lang="css" scoped>
@import "../../assets/style/Home.css";
</style>