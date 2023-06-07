import { classesToString, debug } from "../../../helpers";
class RippleEffectService {
  getClasses(mode, type, className) {
    const base = classesToString([
      "ion-ripple-effect",
      [mode, `ion-ripple-effect--${mode}`],
      [type, `ion-ripple-effect--${type}`],
      className || ""
    ]);
    debug(`RippleEffectService getClasses: base: ${base}`);
    return { base };
  }
}
const rippleEffectService = new RippleEffectService();
export {
  rippleEffectService
};
