<template>
  <div class="Lrlist">
    <div class="list-item" v-for="(item, index) in value" :key="index" @click="jumpDetail(item)">
      <img :src="item.imgPath" alt="">
      <div class="item-name">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name:'Lrlist',
  props: ['value'],
  data () {
    return {

    }
  },
  methods: {
    jumpDetail (data) {
      this.$store.state.currentPage = 'home'
      this.$router.push({
        name: 'detail',
        params: data
      })
    }
  }
}
</script>

<style lang="less">
.Lrlist {
  width: 100%;
  overflow: scroll;
  border: 1px solid #eee;
  background-color: #eee;
  border-radius: 5px;
.list-item {
    width: 155px;
    display: inline-block;
    height: auto;
    flex-wrap: wrap;
    margin: 10px;
    img {
      // height: 100%;
      width: 100%;
    }
    .item-name {
      font-size: 12px;
      margin-top: 5px;
    }
  }
}
</style>

