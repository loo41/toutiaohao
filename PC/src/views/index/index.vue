<template>
  <div class="text">
    <div><list-head-one></list-head-one></div>
    <div><body-list></body-list></div>
  </div>
</template>

<script>
import ListHeadOne from '@/components/head/list-head-one'
import BodyList from '@/components/list-body/list-body'
export default {
  name: 'index',
  data () {
    return {}
  },
  components: {
    ListHeadOne,
    BodyList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.text > div {
  margin-top: 20px;
}
</style>
