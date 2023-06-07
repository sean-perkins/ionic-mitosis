import { useMetadata, useStore, Show, Slot, useRef } from "@builder.io/mitosis";

import type { ButtonProps, ButtonState } from "./button.model";
import { buttonService } from "./button.service";

import { default as IonRippleEffect } from "../ripple-effect";

// import "./button.css";

useMetadata({
  isAttachedToShadowDom: true,
  outputs: ["ionFocus", "ionBlur"],
});

export default function IonButton(props: ButtonProps) {
  const iconSlotRef = useRef();
  const state = useStore<ButtonState>({
    get classes() {
      return buttonService.getClasses(
        props.mode,
        props.disabled,
        props.className
      );
    },
    get hasIconOnly() {
      return props.slotIconOnly !== undefined;
    },
    get rippleType(): "bounded" | "unbounded" {
      const hasClearFill = props.fill === undefined || props.fill === "clear";

      // If the button is in a toolbar, has a clear fill (which is the default)
      // and only has an icon we use the unbounded "circular" ripple effect
      // if (hasClearFill && props.hasIconOnly && props.inToolbar) {
      //   return 'unbounded';
      // }
      if (state.hasIconOnly) {
        return "unbounded";
      }

      return "bounded";
    },
    onFocus() {
      if (props.ionFocus) {
        props.ionFocus();
      }
    },
    onBlur() {
      if (props.ionBlur) {
        props.ionBlur();
      }
    },
  });

  return (
    <>
      <Show when={props.href === undefined}>
        <button
          class={state.classes.base}
          onFocus={() => state.onFocus()}
          onBlur={() => state.onBlur()}
        >
          <span class="button-inner">
            <Slot name="icon-only" />
            <Slot name="start" />
            <Slot />
            <Slot name="end" />
          </span>
          <Show when={props.mode === "md"}>
            <IonRippleEffect type={state.rippleType}></IonRippleEffect>
          </Show>
        </button>
      </Show>
      <Show when={props.href !== undefined}>
        <a
          class={state.classes.base}
          href={props.href}
          onFocus={() => state.onFocus()}
          onBlur={() => state.onBlur()}
        >
          <span class="button-inner">
            <Slot name="icon-only" />
            <Slot name="start" />
            <Slot />
            <Slot name="end" />
          </span>
        </a>
      </Show>
    </>
  );
}
