<template>
  <div ref="echartDom" style="height: 400px"></div>
</template>

<script>
import echarts from "echarts";

/// 添加一个第三方库监听大小监控 yarn add resize-detector
import { addListener, removeListener } from "resize-detector";
///

import debounce from "lodash/debounce";

export default {
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    // options(val) {
    //   this.chart.setOption(val);
    // }
    /// 下面是深度监听options的方案
    options: {
      handle(val) {
        this.chart.setOption(val);
      },
      deep: true
    }
  },
  created() {
    this.resize = debounce(this.resize, 300);
  },
  mounted() {
    this.renderChart();
    addListener(this.$refs.echartDom, this.resize);
  },
  beforeDestroy() {
    removeListener(this.$refs.echartDom, this.resize);
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    resize() {
      console.log("resize");
      this.chart.resize();
    },
    renderChart() {
      // 基于准备好的dom，初始化echarts实例 : document.getElementById('main')
      this.chart = echarts.init(this.$refs.echartDom);
      this.chart.setOption(this.options);
    }
  }
};
</script>

<style lang="less" scoped></style>
