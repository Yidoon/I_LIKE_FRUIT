<template>
  <div class="detail">
    <img :src="detailInfo.imgPath" alt="">
    <p>名 称: {{detailInfo.name}}</p>
    <p>上新季节: {{detailInfo.up_season}}</p>
    <p>价格区间: {{detailInfo.price}}</p>
    <p>营养价值: {{detailInfo.nutrition}}</p>
    <p>保鲜时长: {{detailInfo.keep_fresh}}</p>
    <p>口 感: {{detailInfo.tasty}}</p>
    <p>最佳食用时间: {{detailInfo.best_buy}}</p>
    <p>不适宜人群: {{detailInfo.un_fit}}</p>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: 'detail',
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['detailInfo', 'userInfo', 'isAdmired'])
  },
  watch: {
    userInfo () {
     this.$store.dispatch('judgeIsAdmiredAndAdmired') 
    },
    deep: true
  },
  created () {
    let detailInfo = this.$route.params
    if (!detailInfo.imgPath) {
      detailInfo = JSON.parse(localStorage.getItem('detailInfo'))
    }
    localStorage.setItem("detailInfo", JSON.stringify(detailInfo));
    this.$store.dispatch('setCurrentPage', 'detail')
    this.$store.dispatch('setDetail', detailInfo)
    this.$store.dispatch('judgeIsAdmiredAndAdmired')
  }
}
</script>
<style lang="less">
.detail {
  margin: 10px;
  img {
    height: 150px;
    width: 100%;
  }
  p {
    text-align: left;
    font-size: 15px;
  }
}
</style>

