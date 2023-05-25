<template>
  <div class="image-container">
    <img src="../assets/settings_n.png" style="width: 100%;" alt="">
  </div>
</template>

<script>
export default {
  mounted() {
    alert('서비스 준비 중 입니다')
  }
}
</script>

<style>
.image-container {
  position: relative;
  display: inline-block;
}

.text-overlay {
  position: absolute;
  top: -60px;
  left: 300px;
  color: rgba(51,51,51,0.5);
  padding: 10px;
  font-size: 80px;
}
</style>