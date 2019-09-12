<template>
  <div class="main-layout">
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    name:'main-layout',
    data(){
      return {

      }
    }
  }
</script>
<style lang="scss" scoped>
  .main-layout{
    height: 100%;
    width: 100%;
  }
</style>
