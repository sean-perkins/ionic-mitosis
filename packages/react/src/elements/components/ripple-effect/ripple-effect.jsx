import * as React from "react";
import "./button.css";
import { rippleEffectService } from "./ripple-effect.service";

function IonRippleEffect(props) {
  function classes() {
    return rippleEffectService.getClasses(
      props.mode,
      props.type,
      props.className
    );
  }

  return <div role="presentation" className={classes().base} />;
}

export default IonRippleEffect;
