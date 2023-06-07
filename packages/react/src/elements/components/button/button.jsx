import * as React from "react";
import { buttonService } from "./button.service";
import IonRippleEffect from "../ripple-effect";
import "./button.css";

function IonButton(props) {
  function classes() {
    return buttonService.getClasses(
      props.mode,
      props.disabled,
      props.className
    );
  }

  function hasIconOnly() {
    return props.slotIconOnly !== undefined;
  }

  function rippleType() {
    const hasClearFill = props.fill === undefined || props.fill === "clear";

    // If the button is in a toolbar, has a clear fill (which is the default)
    // and only has an icon we use the unbounded "circular" ripple effect
    // if (hasClearFill && props.hasIconOnly && props.inToolbar) {
    //   return 'unbounded';
    // }
    if (hasIconOnly()) {
      return "unbounded";
    }
    return "bounded";
  }

  function onFocus() {
    props.ionFocus();
  }

  function onBlur() {
    props.ionBlur();
  }

  return (
    <>
      {props.href === undefined ? (
        <>
          <button
            className={classes().base}
            onFocus={(event) => onFocus()}
            onBlur={(event) => onBlur()}
          >
            <span className="button-inner">
              {props.slotIconOnly}

              {props.slotStart}

              {props.children}

              {props.slotEnd}
            </span>

            {props.mode === "md" ? (
              <>
                <IonRippleEffect type={rippleType()} />
              </>
            ) : null}
          </button>
        </>
      ) : null}

      {props.href !== undefined ? (
        <>
          <a
            className={classes().base}
            href={props.href}
            onFocus={(event) => onFocus()}
            onBlur={(event) => onBlur()}
          >
            <span className="button-inner">
              {props.slotIconOnly}

              {props.slotStart}

              {props.children}

              {props.slotEnd}
            </span>
          </a>
        </>
      ) : null}
    </>
  );
}

export default IonButton;
