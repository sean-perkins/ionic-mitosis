import { classesToString, debug } from '~/helpers';

class ButtonService {
  getClasses(mode: string, disabled: boolean, className: string) {
    const base = classesToString([
      'ion-button',
      [mode, `ion-button--${mode}`],
      [disabled, 'is-disabled'],
      className || ''
    ]);

    debug(`ButtonService getClasses: base: ${base}`);
    return { base };
  }


}

export const buttonService = new ButtonService();