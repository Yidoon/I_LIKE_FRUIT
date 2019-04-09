<template>
  <div class="bottom-nav">
    <div class="flex-item left-nav" @click="toggleNav()" v-if="currentPage === 'home' || currentPage === 'collectList' ">
      <img :src="(!isDictionary ? icon_openeyes_active : icon_openeyes) " alt>
      <p>看一看</p>
    </div>
    <div class="flex-item right-nav" @click="toggleNav('dictionary')" v-if="currentPage === 'home' || currentPage === 'collectList'">
      <img :src="(isDictionary ? icon_dictionary_active : icon_dictionary) " alt>
      <p>查一查</p>
    </div>

    <div class="flex-item collect-nav" v-if="currentPage === 'detail'" @click="collectIt">
      <span
        class="iconfont icon-shoucang icon-span"
        :class="{activeD: (isCollected || isNowCollected)} "
      ></span>
    </div>
    <div class="flex-item admire-nav" v-if="currentPage === 'detail'" @click="admireIt">
      <span class="iconfont icon-dianzan icon-span" :class="{activeD: (isAdmired || isNowAdmired)}"></span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "bottomNav",
  data() {
    return {
      icon_dictionary_active: require("../assets/images/dictionary-active.png"),
      icon_openeyes_active: require("../assets/images/Openeyes-active.png"),
      icon_dictionary: require("../assets/images/dictionary.png"),
      icon_openeyes: require("../assets/images/Openeyes.png"),
      isDictionary: false,
      admireList: [],
      collectList: [],
      isNowCollected: false,
      isNowAdmired: false
    };
  },
  computed: {
    ...mapState(["currentPage", "isAdmired", "isCollected"])
  },
  methods: {
    toggleNav(type) {
      let junpUrl = type === "dictionary" ? "search" : "home";
      this.isDictionary = type === "dictionary";
      this.$router.push({
        name: junpUrl
      });
    },
    collectIt() {
      // 如果当前的水果已经被收藏了，那么再次点击则为取消收藏
      if (this.isNowCollected || this.$store.state.isCollected) {
        this.$store
          .dispatch("cancleCollect")
          .then(res => {
            this.$message.success(res.msg);
            this.isNowCollected = false;
          })
          .catch(error => {
            this.$message.error(error.msg);
          });
      } else {
        this.$store
          .dispatch("collectFruit")
          .then(res => {
            console.log('res', res)
            if (res.error === 0) {
              this.$message.success(res.msg);
              this.isNowCollected = true;
              console.log(this.isNowCollected)
            }
          })
          .catch(error => {
            this.$message.error(error);
          });
      }
    },
    admireIt() {
      if (this.isNowAdmired || this.$store.state.isAdmired) {
        this.$store
          .dispatch("cancleAdmire")
          .then(res => {
            this.$message.success(res.msg);
            this.isNowAdmired = false;
          })
          .catch(error => {
            this.$message.error(error.msg);
          });
      } else {
        this.$store
          .dispatch("admireFruit")
          .then(res => {
            if (res.error === 0) {
              this.$message.success(res.msg);
              this.isNowAdmired = true;
              // console.log(this.isNowCollected)
            }
          })
          .catch(error => {
            this.$message.error(error);
          });
      }
    }
  },
  created() {}
};
</script>

<style lang="less">
.bottom-nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  z-index: 1000;
  background-color: #fff;
  display: flex;
  .flex-item {
    flex: 1;
    img {
      width: 30px;
      // height: 40px;
    }
    p {
      margin: 0;
      padding: 0;
      font-size: 10px;
    }
  }
  .icon-span {
    font-size: 30px;
    color: rgb(216, 211, 211);
  }
  .activeD {
    color: green;
  }
}
</style>

