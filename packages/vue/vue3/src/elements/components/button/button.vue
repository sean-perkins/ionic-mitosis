<template>
  <template v-if="href === undefined">
    <button
      :class="_classStringToObject(classes.base)"
      @focus="onFocus()"
      @blur="onBlur()"
    >
      <span class="button-inner">
        <slot name="icon-only"></slot>
        <slot name="start"></slot>
        <slot />
        <slot name="end"></slot>
      </span>

      <template v-if="mode === 'md'">
        <ion-ripple-effect :type="rippleType"></ion-ripple-effect>
      </template>
    </button>
  </template>

  <template v-if="href !== undefined">
    <a
      :class="_classStringToObject(classes.base)"
      :href="href"
      @focus="onFocus()"
      @blur="onBlur()"
    >
      <span class="button-inner">
        <slot name="icon-only"></slot>
        <slot name="start"></slot>
        <slot />
        <slot name="end"></slot>
      </span>
    </a>
  </template>
</template>

<script>
import { defineComponent } from "vue";

import { buttonService } from "./button.service";
import IonRippleEffect from "../ripple-effect";
import "./button.css";

export default defineComponent({
  name: "ion-button",
  components: { IonRippleEffect: IonRippleEffect },
  props: [
    "mode",
    "disabled",
    "className",
    "fill",
    "hasIconOnly",
    "inToolbar",
    "ionFocus",
    "ionBlur",
    "href",
  ],

  computed: {
    classes() {
      return buttonService.getClasses(this.mode, this.disabled, this.className);
    },
    hasIconOnly() {
      return this.$slots.icononly !== undefined;
    },
    rippleType() {
      const hasClearFill = this.fill === undefined || this.fill === "clear";

      // If the button is in a toolbar, has a clear fill (which is the default)
      // and only has an icon we use the unbounded "circular" ripple effect
      // if (hasClearFill && props.hasIconOnly && props.inToolbar) {
      //   return 'unbounded';
      // }
      if (this.hasIconOnly) {
        return "unbounded";
      }
      return "bounded";
    },
  },

  methods: {
    onFocus() {
      this.ionFocus();
    },
    onBlur() {
      this.ionBlur();
    },
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