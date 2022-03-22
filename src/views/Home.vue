<template>
  <div class="home">
    <Details/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Details from '@/components/Details.vue'

@Component({
  components: {
    Details
  }
})
export default class Home extends Vue {}
</script>
