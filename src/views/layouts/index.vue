<template>
  <div>
    <div>
      <keep-alive>
        <router-view v-wechat-title="$route.meta.title" v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-wechat-title="$route.meta.title" v-if="!$route.meta.keepAlive"></router-view>
    </div>
    <van-tabbar placeholder fixed route active-color="#000">
      <van-tabbar-item
        v-for="(item, index) in icon"
        :key="index"
        replace
        :to="item.to"
        :icon="item.icon"
      ><span>{{item.title}}</span></van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      icon: [
        {
          title: '首页',
          to: '/home',
          icon: 'wap-home-o'
        },

        {
          title: '分类',
          to: '/classify',
          icon: 'qr-invalid'
        },
        {
          title: '购物车',
          to: '/cart',
          icon: 'shopping-cart-o'
        },
        {
          title: '关于我',
          to: '/mine',
          icon: 'user-circle-o'
        },

      ],
      active: 0

    }
  },

};
</script>

<style scoped>
.van-tabbar-item {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    color: #939394;
    font-size: 12px;
    line-height: 1;
    cursor: pointer;
}
</style>