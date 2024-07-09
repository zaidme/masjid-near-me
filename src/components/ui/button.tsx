import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';

const buttonVariants = cva(
	'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				primary: 'bg-primary text-primary-foreground hover:bg-primary-light',
				destructive:
					'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				outline:
					'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
				secondary:
					'bg-slate-900 dark:bg-slate-100 text-white dark:text-black hover:bg-slate-900/90 dark:hover:bg-slate-100/90',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
				tertiary:
					'bg-neutral-100 dark:bg-neutral-900 text-foreground dark:hover:bg-neutral-700 hover:bg-neutral-200',
			},
			size: {
				default: 'h-9 px-4 py-2',
				sm: 'h-7 rounded-md px-3',
				lg: 'h-10 rounded-md px-4 ',
				icon: 'h-9 w-9',
			},
		},
		defaultVariants: {
			variant: 'primary',
			size: 'default',
		},
	}
);
export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	loading?: boolean;
	disabled?: boolean;
	onClick?: () => void;
	iconLeft?: React.ReactNode;
	iconRight?: React.ReactNode;
	type?: 'submit' | 'button' | 'reset';
	className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			asChild,
			className,
			variant,
			size,
			loading,
			onClick,
			iconLeft,
			iconRight,
			type = 'button',
			...props
		},
		ref
	) => {
		const Comp = asChild ? Slot : 'button';
		return (
			<Comp
				className={cn(buttonVariants({ variant, size }), className)}
				onClick={onClick}
				type={type}
				ref={ref}
				disabled={loading}
				{...props}
			>
				{loading && !iconRight ? (
					<Loader className='mr-1 animate-spin py-1' />
				) : (
					iconLeft && <span className='pr-1'>{iconLeft}</span>
				)}{' '}
				{props.children}
				{loading && iconRight ? (
					<Loader className='ml-1 animate-spin py-1' />
				) : (
					iconRight && <span className='pl-1'>{iconRight}</span>
				)}{' '}
			</Comp>
		);
	}
);
Button.displayName = 'Button';

export { Button, buttonVariants };