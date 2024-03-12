<template>
  <div style="box-shadow: 1px 1px 6px; height: calc(100vh - 75px - 100px)">
    <img :src="img" style="width: 100%; height: 100%; border-radius: 6px" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      img: [require('@/assets/imgs/banner-2.jpg')],
    }
  },
}
</script>
