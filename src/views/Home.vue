<template>
  <div class="home">
    <el-row>
      <el-col :span="24">
        <div class="header">
          <el-row :gutter="10">
            <el-col :span="20">
              <div class="search-area" id="search-area">
                <el-input placeholder="请输入内容..." prefix-icon="el-icon-search" v-model="searchKey"></el-input>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="menu" @click="clickMenu">
                <i class="el-icon-menu"></i>
                <div class="menu-list" v-if="showMenu">
                  <ul v-if="isLogin">
                    <li @click="jumpSomePage('collectList')">我收藏的</li>
                    <li @click="jumpSomePage('admiredList')">我点赞过的</li>
                  </ul>
                  <ul v-if="!isLogin">
                    <li @click="toLogin">登 录</li>
                  </ul>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="banner">
          <el-carousel trigger="click" height="150px">
            <el-carousel-item v-for="(item, index) in bannerList" :key="index">
              <img :src="item.imgPath" alt>
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <div class="best-recommand">
          <div class="best-recommand-title">
            <span class="des-title">最佳推荐</span>
          </div>
          <div class="best-recommand-product">
            <Slider :value="bestRecommandList"></Slider>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <div class="other-recommand">
          <div class="other-recommand-title">
            <span class="des-title">其他推荐</span>
          </div>
          <div class="other-recommand-product">
            <LRList :value="otherRecommandList"></LRList>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
import Slider from "@/components/Slider.vue";
import LRList from "@/components/LRList.vue";
import BottomNav from "@/components/BottomNav.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "home",
  data() {
    return {
      searchKey: "",
      showMenu: false
    };
  },
  computed: mapState({
    bannerList: state => state.bannerList,
    isLogin: state => state.userStatus.isLogin,
    bestRecommandList: state => state.bestRecommandList,
    otherRecommandList: state => state.otherRecommandList
  }),
  methods: {
    ...mapActions(["getBanner", "getBestRecommand", "getOtherRecommand"]),
    clickMenu() {
      this.showMenu = !this.showMenu;
    },
    toLogin () {
      this.$router.push({
        name: 'login',
        fromPath: 'home'
      })
    },
    init () {
      this.getBanner();
      this.getBestRecommand();
      this.getOtherRecommand();
    },
    jumpSomePage (type) {
      this.$router.push({
        name:type,
        params: {
          type: type
        }
      })
    }
  },
  created() {
    this.$store.dispatch('setCurrentPage', 'home')
    this.init();
    
  },
  components: {
    Slider,
    LRList,
    BottomNav
  }
};
</script>

<style lang="less">
.home {
  // overflow: hidden;
  overflow-y: scroll;
  overflow-x: hidden;
  .header {
    height: 50px;
    text-align: right;
    margin-top: 10px;
    #search-area {
      text-align: center;
      .el-input {
        input {
          border: none;
          border-bottom: 1px solid #eee;
        }
      }
    }
    .menu {
      text-align: right;
      margin-top: 5px;
      position: relative;
      .el-icon-menu {
        height: 30px;
        margin-right: 10px;
        vertical-align: bottom;
        line-height: 40px;
        font-size: 30px;
      }
      .menu-list {
        background-color: #ffffff;
        z-index: 999;
        width: 100px;
        position: absolute;
        // bottom: -110px;
        left: -60px;
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          li {
            text-align: left;
            padding-left: 5px;
            height: 30px;
            line-height: 30px;
            font-size: 14px;
            border-bottom: 1px solid #eee;
          }
          li:hover {
            background-color: #eee;
          }
        }
      }
    }
  }
  .banner {
    margin: 0 10px;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .best-recommand {
    height: 120px;
    margin: 10px;
    .best-recommand-title {
      height: 25px;
      // background-color: #eee;
      // margin: 10px;
      line-height: 25px;
      text-align: left;
      .des-title {
        font-size: 12px;
        color: #000;
        padding-left: 5px;
      }
    }
  }
  .other-recommand {
    margin: 10px;
    .other-recommand-title {
      height: 25px;
      line-height: 25px;
      text-align: left;
      .des-title {
        font-size: 12px;
        color: #000;
        padding-left: 5px;
      }
    }
  }
}
</style>

