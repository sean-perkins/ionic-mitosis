<script>
  import { rippleEffectService } from "./ripple-effect.service";

  export let mode;
  export let type;
  export let className;

  $: classes = () => {
    return rippleEffectService.getClasses(mode, type, className);
  };
</script>

<div role="presentation" class={classes().base} />