import type { BaseProps, BaseState, Color, Dynamic, Mode } from '../../../models';

export interface ButtonProps extends BaseProps {
  mode?: Mode;
  color?: Dynamic<Color>;
  /**
   * If `true`, the user cannot interact with the button.
   */
  disabled?: boolean;
  /**
   * Set to `"block"` for a full-width button or to `"full"` for a full-width button
   * with square corners and no left or right borders.
   */
  expand?: 'full' | 'block';
  fill?: 'clear' | 'outline' | 'solid' | 'default';
  shape?: 'round';
  size?: 'small' | 'default' | 'large';
  strong?: boolean;
  type?: 'submit' | 'reset' | 'button';
  href?: string;

  // Events
  ionFocus?: () => void;
  ionBlur?: () => void;

  // Slots
  slotIconOnly?: any;
  slotStart?: any;
  slotEnd?: any;
}

export interface ButtonState extends BaseState {
  classes: { base: string };
  rippleType: 'bounded' | 'unbounded';
  hasIconOnly: boolean;
  inToolbar: boolean;
  onFocus: () => void;
  onBlur: () => void;
  onClick: () => void;
}