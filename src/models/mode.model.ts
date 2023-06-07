export enum Mode {
  None = '',
  iOS = 'ios',
  MD = 'md',
  MUI = 'mui',
}

export const modes = Object.entries(Mode).map(([key, value]: [string, string]) => ({ key, value }));