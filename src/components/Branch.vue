<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { IBranch } from '../types/branch.js'
import Tree from './Tree.vue'

 export default defineComponent({
 props: ['branch'],
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
    }
  }
})
</script>

<template>
  <li class="parent parent_close">
   <button i-if="branch.children" ref="button" @click="buttonRotate" class="button button_close"></button>
   <a class="link" :href="'https://www.klerk.ru' + branch.url">{{ branch.title }} (count: {{ branch.count }}, totalCount: {{ branch.count }})</a>

  </li>
</template>

<style scoped lang="scss">
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
   top: -2px;
   left: -2px;
  }
  &_open {
    transform: rotate(180deg);
    &:before{
     left: 1px;
    }
  }
  &_close {
    transform: rotate(90deg)
  }
 }
</style>