<template>
  <div>
    <div>
      <keep-alive>
        <router-view v-wechat-title="$route.meta.title" v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-wechat-title="$route.meta.title" v-if="!$route.meta.keepAlive"></router-view>
    </div>
    <van-tabbar placeholder fixed route active-color="#FF8299">
      <van-tabbar-item
        v-for="(item, index) in icon"
        :key="index"
        replace
        :to="item.to"
        :icon="item.icon"
      >{{item.title}}</van-tabbar-item>
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

<style>
</style>