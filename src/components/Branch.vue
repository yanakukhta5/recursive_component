<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { IBranch } from '../types/branch.js'

 export default defineComponent({
  name: 'rec',
 props: ['url', 'title', 'count', 'children', 'currentObj'],
 data(){
  return {
   tree: [] as PropType<IBranch[]>,
   buttons: []
  }
 },
 setup(){
  const button = ref<HTMLButtonElement>
  return { button }
 },
  methods: {
    buttonRotate(){
     (this.$refs.button as HTMLButtonElement).classList.toggle('button_close');
     (this.$refs.button as HTMLButtonElement).classList.toggle('button_open')
    },
    listShow(){
      (this.$refs.list as HTMLUListElement).classList.toggle('child-list_show')
    },
    countCheck(event){
      this.$emit('countIncrease', this.currentObj, event.target.checked)
    },
    getTotalCount(){
      console.log(this.currentObj)
    }
  },
  mounted(){
    this.getTotalCount() 
  }
})
</script>

<template>
  <li class="parent parent_close">
    <div class="content">
      <input type="checkbox" @change="countCheck" class="count-check" name="count" id="count">
      <button v-if="children.length" ref="button" @click="buttonRotate(), listShow()" class="button button_close" />
      <p ><a class="link" :href="'https://www.klerk.ru' + url">{{ title }}</a>(count: {{ count }}<span v-if="currentObj">, totalCount: {{ count }}</span>)</p>
    </div>
    <ul v-if="title" class="child-list list" ref="list">
      <div class="div" v-if="children.length">
        <rec v-for="branch in children"
        :url="branch.url"
        :title="branch.title"
        :count="branch.count"
        :children="(branch.children ? branch.children : 0)" />
      </div>
    </ul>
  </li>
</template>

<style scoped lang="scss">
.count-check{
  margin-right: 10px;
}
.content{
  display: flex;
}
.child-list{
  display: none;
}
.child-list_show{
  display: block;
}
.parent {
  display: flex;
  flex-direction: column;
  &_close{
    margin: 10px 0 0 30px;
  }
}
</style>