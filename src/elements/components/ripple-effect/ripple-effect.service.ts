import { classesToString, debug } from '../../../helpers';

class RippleEffectService {
  getClasses(mode: string, type: string, className: string) {
    const base = classesToString([
      'ion-ripple-effect',
      [mode, `ion-ripple-effect--${mode}`],
      [type, `ion-ripple-effect--${type}`],
      className || ''
    ]);

    debug(`RippleEffectService getClasses: base: ${base}`);
    return { base };
  }


}

export const rippleEffectService = new RippleEffectService();