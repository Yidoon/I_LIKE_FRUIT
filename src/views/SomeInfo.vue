<template>
  <div class="someInfo">
    <div v-if="dataList.length">
      <div v-for="(item, index) in dataList" :key="index" class="list-item" @click="toDetail(item)">
        <div class="img-box">
          <img :src="item.imgPath" alt>
        </div>
        <div class="detail-info">
          <p>名称:{{item.name}}</p>
          <p>上市季节:{{item.up_season}}</p>
          <p>价格:{{item.price}}</p>
        </div>
      </div>
    </div>
    <div v-else class="no-data">暂无数据</div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "someInfo",
  data() {
    return {
      currentType: ""
    };
  },
  computed: {
    ...mapState(["userInfo"]),
    dataList() {
      const data =
        this.currentType === "collect"
          ? this.userInfo.collected_list
          : this.userInfo.admired_list;
      return data;
    }
  },
  methods: {
    toDetail (item) {
      this.$router.push({
        name: 'detail',
        params: {
          data: item
        }
      })
    }
  },
  created() {
    const params = this.$route.params;
    this.currentType = params.type;
  }
};
</script>
<style lang="less">
.someInfo {
  .no-data {
    color: #eee;
    width: 100%;
    height: 100px;
    position: absolute;
    left: 50%;
    margin-left: -50%;
    top: 40%;
    margin-top: -50px; 
  }
  .list-item {
    width: 100%;
    height: 100px;
    border: 1px solid green;
    margin: 10px;
    display: flex;
    div {
      flex: 1;
    }
    .detail-info {
      // border: 1px solid red;
      padding-top: 10px;
      text-align: left;
      margin-left: 10px;
      p {
        margin: 5px;
        font-size: 14px;
        padding: 0;
      }
    }
    img {
      height: 100%;
      width: 100%;
    }
  }
}
</style>

