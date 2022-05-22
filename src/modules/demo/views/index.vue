<template>
  <div class="demo">
    <div><i class="iconfont icon-gongneng-mianxing-wode-huiyuan"></i> DEMO</div>
    <div>{{$route.query.test}}</div>
    <div><img src="../assets/images/demo.png" /></div>
  </div>
</template>

<script>
export default {
  name: 'ModelDemo'
}
</script>

<style>
.demo {
  color: #ff0000;
}
</style>
