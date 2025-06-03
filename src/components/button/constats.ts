export const ButtonSizes = ['xs', 'sm', 'md'] as const;
export type ButtonSize = (typeof ButtonSizes)[number];
