<template>
  <div class="search">
    <h3>请设置筛选条件</h3>
    <div class="main-search">
      <p>请选择地区</p>
      <el-cascader size="large" :options="options" v-model="selectedOptions" @change="handleChange"></el-cascader>
      <p>请选择时间段</p>
      <el-radio v-model="selectType" label="season">按季节</el-radio>
      <el-radio v-model="selectType" label="month">按月份</el-radio>
      <p></p>
      <el-radio-group v-model="season" v-if="selectType === 'season'">
        <el-radio label="1">春</el-radio>
        <el-radio label="2">夏</el-radio>
        <el-radio label="3">秋</el-radio>
        <el-radio label="4">冬</el-radio>
      </el-radio-group>
      <div class="slider-month-range" v-if="selectType === 'month'">
        <el-slider v-model="month_range" range show-stops :max="12" :min="1"></el-slider>
        <p>{{monthText}}</p>
      </div>
      <div class="btn-search">
        <span class="button">
          查询
        </span>
      </div>
    </div>
    <div class="main-info"></div>
  </div>
</template>

<script>
import { regionDataPlus } from "element-china-area-data";
export default {
  name: "search",
  data() {
    return {
      options: regionDataPlus,
      selectedOptions: [],
      season: "",
      selectType: "month",
      month_range: [1, 12]
    };
  },
  computed: {
    monthText() {
      let monthArr = this.month_range;
      return monthArr[0] + "月" + "-" + monthArr[1] + "月";
    }
  },
  methods: {
    handleChange(value) {
      console.log(value);
    }
  }
};
</script>

<style lang="less">
.search {
  .main-search {
    p {
      font-size: 12px;
    }
    .slider-month-range {
      margin: 0 auto;
      width: 80%;
      p {
        margin: 0;
      }
    }
    .btn-search {
      width: 100%;
      height: 35px;
      margin: 30px auto;      
      span {
        width: 80%;
        display: inline-block;
        height: 100%;
        border-radius: 20px;
        text-align: center;
        line-height: 35px;
        background-color: rgb(81, 168, 255);
        color: #fff;
      }
    }
  }
}
</style>



