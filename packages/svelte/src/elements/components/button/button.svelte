<script>
  import { buttonService } from "./button.service";
  import IonRippleEffect from "../ripple-effect";

  export let mode = "md";
  export let disabled = false;
  export let className;
  export let fill;
  export let ionFocus;
  export let ionBlur;
  export let type = "button";
  export let href;

  function onFocus() {
    if (ionFocus) {
      ionFocus();
    }
  }
  function onBlur() {
    if (ionBlur) {
      ionBlur();
    }
  }
  function onClick() {
    if (type === "button") {
      // TODO openURL
    }
  }
  $: classes = () => {
    return buttonService.getClasses(mode, disabled, className);
  };
  $: hasIconOnly = () => {
    // TODO this is incorrect across outputs
    // works for JSX/React, but not for Angular for example.
    // Need to query the slot or think of a different way to do this.
    return $$slots.icononly !== undefined;
  };
  $: rippleType = () => {
    const hasClearFill = fill === undefined || fill === "clear";

    // If the button is in a toolbar, has a clear fill (which is the default)
    // and only has an icon we use the unbounded "circular" ripple effect
    if (hasClearFill && hasIconOnly() && inToolbar) {
      return "unbounded";
    }
    return "bounded";
  };

  let inToolbar = false;
  // TODO need to find closest ion-toolbar to this button reference
  inToolbar = !!document.querySelector("ion-toolbar");
</script>

{#if href === undefined}
  <button
    class={classes().base}
    on:focus={(event) => {
      onFocus();
    }}
    on:blur={(event) => {
      onBlur();
    }}
    on:click={(event) => {
      onClick();
    }}
  >
    <span class="button-inner">
      <slot name="icon-only" />
      <slot name="start" />
      <slot />
      <slot name="end" />
    </span>

    {#if mode === "md"}
      <IonRippleEffect type={rippleType()} />
    {/if}
  </button>
{/if}

{#if href !== undefined}
  <a
    class={classes().base}
    {href}
    on:focus={(event) => {
      onFocus();
    }}
    on:blur={(event) => {
      onBlur();
    }}
    on:click={(event) => {
      onClick();
    }}
  >
    <span class="button-inner">
      <slot name="icon-only" />
      <slot name="start" />
      <slot />
      <slot name="end" />
    </span>
  </a>
{/if}