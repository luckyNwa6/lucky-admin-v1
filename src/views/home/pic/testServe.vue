<template>
  <div>
    <div style="height: 809px; background: #101f51">
      <!-- <iframe
        ref="myView"
        id="iframeId"
        name="iframeId"
        src="http://192.168.15.115/share"
        border="0"
        width="100%"
        height="100%"
        style="border-width: 0; height: 100%; padding-top: 10px; padding-left: 10px"
      ></iframe> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  components: {},
  mounted() {},
  data() {
    return {
      targetUrl: 'http:192.168.15.115/test',
      contentLoading: true,
    }
  },
  methods: {
    sendMesFroIframe() {
      // 向iframe传值
      // const mapFrame = this.$refs['myView'];
      // const iframeWin = mapFrame.contentWindow;
      // iframeWin.postMessage(
      // {
      // value: 'backSuccess',
      // id: this.id,
      // lang: 'zh',
      // success: true
      // },
      // '*'
      // );
      this.contentLoading = false
    },
  },
}
</script>

<style scoped>
main .el-main {
  background: #101f51 !important;
}
</style>
