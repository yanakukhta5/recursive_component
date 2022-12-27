<template>
  <div class="tree-title">
    <button
      ref="button"
      @click="treeSwap()"
      :class="(isOpen ? 'button_open' : 'button_close') + ' button'"
    ></button>
    <a class="link">Наши отрасли (checkedCount: {{ checkedCount }})</a>
  </div>
  <div ref="tree" class="tree">
    <ul v-for="branch in tree" class="list">
      <Branch
        @countIncrease="countIncreaser"
        :currentObj="branch"
        :key="branch.id"
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
      isOpen: true
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
      this.isOpen = !this.isOpen;
      (this.$refs.tree as HTMLUListElement).classList.toggle("tree_active");
    },
    countIncreaser(currentTree: IBranch, isChecked: boolean) {
      currentTree.checked = isChecked;

      this.checkedCount += isChecked ? currentTree.count : -currentTree.count;

      if (currentTree.children) {
        for (const item of currentTree.children) {
          if (item.checked === isChecked) continue;
          item.checked = isChecked;
          this.countIncreaser(item, isChecked);
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
