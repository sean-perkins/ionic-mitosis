<script>
  import { buttonService } from "./button.service";
  import IonRippleEffect from "../ripple-effect";
  import "./button.css";

  export let mode;
  export let disabled;
  export let className;
  export let fill;
  export let hasIconOnly;
  export let inToolbar;
  export let ionFocus;
  export let ionBlur;
  export let href;

  function onFocus() {
    ionFocus();
  }
  function onBlur() {
    ionBlur();
  }
  $: classes = () => {
    return buttonService.getClasses(mode, disabled, className);
  };
  $: hasIconOnly = () => {
    return $$slots.icononly !== undefined;
  };
  $: rippleType = () => {
    const hasClearFill = fill === undefined || fill === "clear";

    // If the button is in a toolbar, has a clear fill (which is the default)
    // and only has an icon we use the unbounded "circular" ripple effect
    // if (hasClearFill && props.hasIconOnly && props.inToolbar) {
    //   return 'unbounded';
    // }
    if (hasIconOnly()) {
      return "unbounded";
    }
    return "bounded";
  };
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
  >
    <span class="button-inner">
      <slot name="icon-only" />
      <slot name="start" />
      <slot />
      <slot name="end" />
    </span>
  </a>
{/if}