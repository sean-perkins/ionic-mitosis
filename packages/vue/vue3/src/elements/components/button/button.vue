<template>
  <template v-if="href === undefined">
    <button
      :class="_classStringToObject(classes.base)"
      @focus="onFocus()"
      @blur="onBlur()"
      @click="onClick()"
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
      @click="onClick()"
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

<script lang="ts">
import { defineComponent } from "vue";

import type { ButtonProps, ButtonState } from "./button.model";
import { buttonService } from "./button.service";
import IonRippleEffect from "../ripple-effect";

export default defineComponent({
  name: "ion-button",
  components: { IonRippleEffect: IonRippleEffect },
  props: {
    mode: { default: "md" },
    disabled: { default: false },
    className: { default: undefined },
    fill: { default: undefined },
    ionFocus: { default: undefined },
    ionBlur: { default: undefined },
    type: { default: "button" },
    href: { default: undefined },
  },

  data() {
    return { inToolbar: false };
  },

  created() {
    // TODO need to find closest ion-toolbar to this button reference
    this.inToolbar = !!document.querySelector("ion-toolbar");
  },

  computed: {
    classes() {
      return buttonService.getClasses(this.mode, this.disabled, this.className);
    },
    hasIconOnly() {
      // TODO this is incorrect across outputs
      // works for JSX/React, but not for Angular for example.
      // Need to query the slot or think of a different way to do this.
      return this.$slots.icononly !== undefined;
    },
    rippleType() {
      const hasClearFill = this.fill === undefined || this.fill === "clear";

      // If the button is in a toolbar, has a clear fill (which is the default)
      // and only has an icon we use the unbounded "circular" ripple effect
      if (hasClearFill && this.hasIconOnly && this.inToolbar) {
        return "unbounded";
      }
      return "bounded";
    },
  },

  methods: {
    onFocus() {
      if (this.ionFocus) {
        this.ionFocus();
      }
    },
    onBlur() {
      if (this.ionBlur) {
        this.ionBlur();
      }
    },
    onClick() {
      if (this.type === "button") {
        // TODO openURL
      }
    },
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