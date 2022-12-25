<template>
      <ul v-for="(branch, index) in tree" :key="index" class="list">
        <Branch
            :url = branch.url
            :title = branch.title
            :count = branch.count
            :children = branch.children
        />
      </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IBranch } from '../types/branch.js'
import Branch from './Branch.vue'
export default defineComponent({
 components: { Branch },
 data(){
  return {
   tree: Array as PropType<IBranch[]>
  }
 },
  async mounted(){
   const response = await fetch('http://localhost:3000/data', {
    headers: {
     'Content-Type': 'application/x-www-form-urlencoded'
    }
   }
   )
   const result = await response.json()
   this.tree = result
   console.log(this.tree)
  }
})
</script>

<style scoped lang="scss">
.list {
  margin-right: auto;
  display: flex;
  flex-direction: column;
}
 .parent{
  display: flex;
  gap: 8px;
  text-align: left;
  margin: 10px 0px;
  &_has_no_children .button{
    display: none;
  }
 }
 .link {
  color: black;
  text-decoration: none;
 }
</style>