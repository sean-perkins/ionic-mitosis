import { useMetadata, useStore } from "@builder.io/mitosis";
import type {
  RippleEffectProps,
  RippleEffectState,
} from "./ripple-effect.model";
import { rippleEffectService } from "./ripple-effect.service";
// import "./ripple-effect.css";

useMetadata({
  isAttachedToShadowDom: true,
});

export default function IonRippleEffect(props: RippleEffectProps) {
  const state = useStore<RippleEffectState>({
    get classes() {
      return rippleEffectService.getClasses(
        props.mode,
        props.type,
        props.className
      );
    },
  });

  return <div role="presentation" class={state.classes.base}></div>;
}
