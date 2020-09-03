<template>
  <div>
    <keep-alive>
      <router-view v-wechat-title="$route.meta.title" v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-wechat-title="$route.meta.title" v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style>
</style>