import { tv, type VariantProps } from 'tailwind-variants';
export { default as Badge } from './badge.svelte';

export const badgeVariants = tv({
  base: 'inline-flex items-center border rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap transition-colors focus:outline-none select-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  variants: {
    variant: {
      default: 'bg-primary hover:bg-primary/80 border-transparent text-primary-foreground',
      secondary: 'bg-secondary hover:bg-secondary/80 border-transparent text-secondary-foreground',
      destructive:
        'bg-destructive hover:bg-destructive/80 border-transparent text-destructive-foreground',
      outline: 'text-foreground',
      firsttime: 'bg-green-600 hover:bg-green-600/80 border-transparent text-primary-foreground',
      pb: 'px-1 bg-red-600 hover:bg-red-600/80 border-transparent text-primary-foreground ',
      milestone11:
        'px-0.5 bg-[#99d6ea] hover:bg-[#99d6ea]/80 border-transparent text-primary-foreground',
      milestone21:
        'px-0.5 bg-[#c1cc26] hover:bg-[#c1cc26]/80 border-transparent text-primary-foreground',
      milestone50:
        'px-0.5 bg-[#ffa300] hover:bg-[#ffa300]/80 border-transparent text-primary-foreground',
      milestone100:
        'px-0.5 bg-[#939393] hover:bg-[#939393]/80 border-transparent text-primary-foreground'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

export type Variant = VariantProps<typeof badgeVariants>['variant'];
