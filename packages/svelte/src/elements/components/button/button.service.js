import { classesToString, debug } from "../../../helpers";
class ButtonService {
  getClasses(mode, disabled, className) {
    const base = classesToString([
      "ion-button",
      [mode, `ion-button--${mode}`],
      [disabled, "is-disabled"],
      className || ""
    ]);
    debug(`ButtonService getClasses: base: ${base}`);
    return { base };
  }
}
const buttonService = new ButtonService();
export {
  buttonService
};
