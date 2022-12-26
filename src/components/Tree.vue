<template>
  <div class="tree-title">
    <button
      ref="button"
      @click="buttonRotate(), treeSwap()"
      class="button button_open"
    ></button>
    <a class="link">Наши отрасли (checkedCount: {{ checkedCount }})</a>
  </div>
  <div ref="tree" class="tree">
    <ul v-for="(branch, index) in tree" :key="index" class="list">
      <Branch
        @countIncrease="countIncreaser"
        :url="branch.url"
        :title="branch.title"
        :count="branch.count"
        :children="branch.children"
        :currentObj="tree[index]"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IBranch } from "../types/branch.js";
import Branch from "./Branch.vue";
export default defineComponent({
  components: { Branch },
  data() {
    return {
      tree: Array as PropType<IBranch[]>,
      checkedCount: 0,
    };
  },
  async mounted() {
    const response = await fetch("http://localhost:3000/data", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const result = await response.json();
    this.tree = result;
  },
  methods: {
    buttonRotate() {
      (this.$refs.button as HTMLButtonElement).classList.toggle("button_close");
      (this.$refs.button as HTMLButtonElement).classList.toggle("button_open");
    },
    treeSwap() {
      (this.$refs.tree as HTMLUListElement).classList.toggle("tree_active");
    },
    countIncreaser(currentTree: Array, isChecked: boolean) {
      if(isChecked) this.checkedCount += currentTree.count;
      else this.checkedCount -= currentTree.count;
      if (currentTree.children) {
        for (let i = 0; i < currentTree.children.length; i++) {
          try {
            this.countIncreaser(currentTree.children[i], isChecked);
          } catch (err) {
            continue;
          }
        }
      }
    },
  },
});
</script>

<style scoped lang="scss">
.tree {
  &-title {
    display: flex;
  }
  &_active {
    display: none;
  }
}

.list {
  margin-right: auto;
  display: flex;
  flex-direction: column;
}
.parent {
  display: flex;
  gap: 8px;
  text-align: left;
  margin: 10px 0px;
  &_has_no_children .button {
    display: none;
  }
}
.link {
  color: black;
  text-decoration: none;
}
</style>
