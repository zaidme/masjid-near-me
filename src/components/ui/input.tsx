'use client';

import React from 'react';

import { Control } from 'react-hook-form';
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from './form';
import { BaseInput } from './base-input';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	className?: string;
	classNameInput?: string;
	label?: string;
	placeholder?: string;
	control?: Control<any, any>;
	description?: string;
	field?: string;
	icon?: React.ReactNode;
	onInputChange?: (value: string) => void;
	debounce?: number;
}

const Input = React.forwardRef<HTMLInputElement, Props>(
	(
		{
			className,
			classNameInput,
			control,
			field,
			label,
			placeholder,
			description,
			icon,
			debounce = 0,
			onInputChange,
			...props
		},
		ref
	) => {
		const debounceFunc = (func: (value: string) => void, delay: number) => {
			let timer: NodeJS.Timeout | null = null;
			return (value: string) => {
				if (timer) clearTimeout(timer);
				timer = setTimeout(() => {
					func(value);
				}, delay);
			};
		};

		const handleInputChange =
			onInputChange && debounce
				? debounceFunc(onInputChange, debounce)
				: onInputChange;

		if (control && field) {
			return (
				<FormField
					control={control}
					name={field}
					render={({ field }) => (
						<FormItem className={className}>
							<FormControl>
								<BaseInput
									label={label}
									placeholder={placeholder}
									classNameInput={classNameInput}
									icon={icon}
									{...field}
									{...props}
									onChange={(e) => {
										if (handleInputChange) handleInputChange(e.target.value);
										field.onChange(e);
									}}
								/>
							</FormControl>
							<FormDescription>{description}</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
			);
		}

		return (
			<div className={className}>
				<BaseInput
					label={label}
					classNameInput={classNameInput}
					placeholder={placeholder}
					icon={icon}
					description={description}
					onChange={(e) => {
						if (handleInputChange) handleInputChange(e.target.value);
					}}
					{...props}
					ref={ref}
				/>
			</div>
		);
	}
);

Input.displayName = 'Input';

export { Input };