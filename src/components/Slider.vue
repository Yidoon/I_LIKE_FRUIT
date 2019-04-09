<template>
  <div class="slider" :style="{'height': height + 'px'}">
    <div class="slider-item" v-for="(item, index) in value" :key="index" @click="jumpDetail(item)">
      <img :src="item.imgPath" alt>
      <div class="item-name">{{item.name}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["height", "value"],
  data() {
    return {};
  },
  methods: {
    jumpDetail(data) {
      this.$store.state.currentPage = 'detail';
      this.$router.push({
        name: "detail",
        params: data
      });
    }
  }
};
</script>
<style lang="less">
.slider {
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  .slider-item {
    width: 100px;
    margin: 10px;
    display: inline-block;
    img {
      width: 100%;
    }
    .item-name {
      font-size: 12px;
    }
  }
}
</style>

