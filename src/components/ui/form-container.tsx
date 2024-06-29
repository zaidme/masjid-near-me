import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
	children: React.ReactNode;
	className?: string;
}

const FormContainer: React.FC<Props> = ({ children, className }) => {
	return (
		<div
			className={cn(
				'w-full sm:w-case-container border-t-primary border-t-3 shadow-container px-4 sm:px-10 py-6 mx-auto rounded-b-lg',
				className
			)}
		>
			{children}
		</div>
	);
};

export default FormContainer;