<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { IBranch } from '../types/branch.js'
import Tree from './Tree.vue'

 export default defineComponent({
  name: 'rec',
 props: ['url', 'title', 'count', 'children'],
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
    }
  }
})
</script>

<template>
  <li class="parent parent_close">
    <div class="content">
      <button v-if="children.length" ref="button" @click="buttonRotate(), listShow()" class="button button_close"></button>
      <a class="link" :href="'https://www.klerk.ru' + url">{{ title }} (count: {{ count }}, totalCount: {{ count }})</a>
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
 .button {
  width: 12px;
  height: 12px;
  outline: none;
  padding: 0;
  background-color: transparent;
  border: 0px;
  &:hover {
   cursor: pointer;
  }
  &:before {
   content: '△';
   position: relative;
   top: 3px;
   left: 2px;
  }
  &_open {
    transform: rotate(180deg);
    &:before{
      top: -3px;
      left: 6px;
    }
  }
  &_close {
    transform: rotate(90deg);
  }
 }
</style>