<template>
  <div role="presentation" :class="_classStringToObject(classes.base)"></div>
</template>

<script>
import { defineComponent } from "vue";

import "./button.css";
import { rippleEffectService } from "./ripple-effect.service";

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
    _classStringToObject(str) {
      const obj = {};
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