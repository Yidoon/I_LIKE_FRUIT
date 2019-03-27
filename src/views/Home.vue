<template>
  <div class="home">
    <el-row>
      <el-col :span="24">
        <div class="header"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "home",
  components: {}
};
</script>

<style lang="less" scoped>
.home {
  .header {
    height: 20px;
    border: 1px solid red;
  }
}
</style>

