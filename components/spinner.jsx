import { Loader } from 'lucide-react';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

const spinnerVariants = cva('text-muted-foreground animate-spin', {
  variants: {
    size: {
      default: 'w-4 h-4',
      sm: 'w-2 h-2',
      lg: 'w-6 h-6',
      icon: 'w-10 h-10',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

const Spinner = ({ size }) => {
  return <Loader className={cn(spinnerVariants({ size }))} />;
};

export default Spinner;
