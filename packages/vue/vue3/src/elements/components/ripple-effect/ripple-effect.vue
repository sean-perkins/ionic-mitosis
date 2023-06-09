<template>
  <div role="presentation" :class="_classStringToObject(classes.base)"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import type {
  RippleEffectProps,
  RippleEffectState,
} from "./ripple-effect.model";
import { rippleEffectService } from "./ripple-effect.service";
import "ripple-effect.css";

export default defineComponent({
  name: "ion-ripple-effect",

  props: ["mode", "type", "className"],

  computed: {
    classes() {
      return rippleEffectService.getClasses(
        this.mode,
        this.type,
        this.className
      );
    },
  },

  methods: {
    _classStringToObject(str: string) {
      const obj: Record<string, boolean> = {};
      if (typeof str !== "string") {
        return obj;
      }
      const classNames = str.trim().split(/\s+/);
      for (const name of classNames) {
        obj[name] = true;
      }
      return obj;
    },
  },
});
</script>