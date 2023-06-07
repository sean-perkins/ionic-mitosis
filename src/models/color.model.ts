export enum Color {
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
  Success = 'success',
  Warning = 'warning',
  Danger = 'danger',
  Light = 'light',
  Medium = 'medium',
  Dark = 'dark',
}

export const colors = Object.entries(Color).map(([key, value]: [string, string]) => ({ key, value }));