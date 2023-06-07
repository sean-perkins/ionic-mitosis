import type { BaseProps, BaseState, Dynamic, Mode } from '~/models';

export interface RippleEffectProps extends BaseProps {
  mode?: Dynamic<Mode>;
  type?: 'unbounded' | 'bounded';
}

export interface RippleEffectState extends BaseState {
  classes: { base: string };
}