import {
  useMetadata,
  useStore,
  useDefaultProps,
  Show,
  Slot,
  onInit,
} from "@builder.io/mitosis";

import type { ButtonProps, ButtonState } from "./button.model";
import { buttonService } from "./button.service";

import IonRippleEffect from "../ripple-effect";

// import "./button.css";

useMetadata({
  isAttachedToShadowDom: true,
  outputs: ["ionFocus", "ionBlur"],
});

useDefaultProps<ButtonProps>({
  mode: "md",
  disabled: false,
  strong: false,
  type: "button",
});

export default function IonButton(props: ButtonProps) {
  const state = useStore<ButtonState>({
    get classes() {
      return buttonService.getClasses(
        props.mode,
        props.disabled,
        props.className
      );
    },
    get hasIconOnly() {
      // TODO this is incorrect across outputs
      // works for JSX/React, but not for Angular for example.
      // Need to query the slot or think of a different way to do this.
      return props.slotIconOnly !== undefined;
    },
    get rippleType(): "bounded" | "unbounded" {
      const hasClearFill = props.fill === undefined || props.fill === "clear";

      // If the button is in a toolbar, has a clear fill (which is the default)
      // and only has an icon we use the unbounded "circular" ripple effect
      if (hasClearFill && state.hasIconOnly && state.inToolbar) {
        return "unbounded";
      }

      return "bounded";
    },
    inToolbar: false,
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
    onClick() {
      if (props.type === "button") {
        // TODO openURL
      }
    },
  });

  onInit(() => {
    // TODO need to find closest ion-toolbar to this button reference
    state.inToolbar = !!document.querySelector("ion-toolbar");
  });

  return (
    <>
      <Show when={props.href === undefined}>
        <button
          class={state.classes.base}
          onFocus={() => state.onFocus()}
          onBlur={() => state.onBlur()}
          onClick={() => state.onClick()}
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
          onClick={() => state.onClick()}
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
