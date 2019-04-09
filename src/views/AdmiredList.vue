<template>
  <div class="admiredList">
    <div class="list">
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
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "collectList",
  data() {
    return {
      currentType: ""
    };
  },
  computed: {
    ...mapState(["userInfo"]),
    dataList() {
      return this.userInfo.admired_list;
    }
  },
  methods: {
    toDetail(item) {
      this.$router.push({
        name: "detail",
        params: {
          data: item
        }
      });
    }
  },
  created() {
    this.$store.dispatch("setCurrentPage", "collectList");
  }
};
</script>
<style lang="less">
.admiredList {
  .list {
    width: 100%;
    .list-item {
      width: 90%;
      height: 100px;
      padding: 10px;
      display: flex;
      background-color: #eee;
      margin: 10px auto;
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
}
</style>

