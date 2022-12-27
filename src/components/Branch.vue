<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { IBranch } from "../types/branch.js";

export default defineComponent({
  name: "rec",
  props: ["currentObj"],
  data() {
    return {
      tree: [] as PropType<IBranch[]>,
      totalCount: 0,
    };
  },
  setup() {
    const button = ref<HTMLButtonElement>;
    return { button };
  },
  methods: {
    buttonRotate() {
      (this.$refs.button as HTMLButtonElement).classList.toggle("button_close");
      (this.$refs.button as HTMLButtonElement).classList.toggle("button_open");
    },
    listShow() {
      (this.$refs.list as HTMLUListElement).classList.toggle("child-list_show");
    },
    countCheck(currentObj: IBranch, event: Event) {
      this.$emit(
        "countIncrease",
        currentObj,
        (event.target as HTMLInputElement)?.checked
      );
    },
    countTotal() {
      if (this.$props.currentObj.children) {
        this.totalCount = this.$props.currentObj.children.reduce(
          (accumulator: number, currentValue: IBranch) =>
            accumulator + currentValue.count,
          0
        );
      }
    },
    countCheckChildEmit(number: number, event: Event) {
      this.$emit("countCheckChild", event, number);
    },
  },
  mounted() {
    this.countTotal();
  },
});
</script>

<template>
  <li class="parent parent_close">
    <div class="content">
      <input
        type="checkbox"
        @change="
          countCheckChildEmit(currentObj.count, $event),
            countCheck(currentObj, $event)
        "
        class="count-check"
        :checked="currentObj.checked"
      />
      <button
        v-if="currentObj.children?.length"
        ref="button"
        @click="buttonRotate(), listShow()"
        class="button button_close"
      />
      <p>
        <a class="link" :href="'https://www.klerk.ru' + currentObj.url">{{
          currentObj.title
        }}</a
        >(count: {{ currentObj.count
        }}<span v-if="currentObj.children?.length"
          >, totalCount: {{ totalCount }}</span
        >)
      </p>
    </div>
    <ul v-if="currentObj.children" class="child-list list" ref="list">
      <div class="div">
        <rec
          v-for="branch in currentObj.children"
          @countCheckChild="countCheck(branch, $event)"
          :key="branch.id"
          :currentObj="branch"
        />
      </div>
    </ul>
  </li>
</template>

<style scoped lang="scss">
.count-check {
  margin-right: 10px;
}
.content {
  display: flex;
}
.child-list {
  display: none;
}
.child-list_show {
  display: block;
}
.parent {
  display: flex;
  flex-direction: column;
  &_close {
    margin: 10px 0 0 30px;
  }
}
</style>
