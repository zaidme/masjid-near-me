import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface GenerateFormParams {
	schema: z.ZodType<any, any>;
	defaultValues?: Record<string, any>;
}

const generateDefaultValues: any = (
	schema: z.ZodType<any, any>,
	defaultValues: Record<string, any> = {}
) => {
	if (schema instanceof z.ZodObject) {
		return Object.keys(schema.shape).reduce((acc, key) => {
			const fieldSchema = schema.shape[key];
			if (
				fieldSchema instanceof z.ZodObject ||
				fieldSchema instanceof z.ZodArray
			) {
				return {
					...acc,
					[key]: generateDefaultValues(fieldSchema, defaultValues[key]),
				};
			}
			return {
				...acc,
				[key]: defaultValues[key] ?? '',
			};
		}, {});
	} else if (schema instanceof z.ZodArray) {
		return defaultValues ?? [];
	}
	return defaultValues ?? '';
};

export const generateForm = ({
	schema,
	defaultValues = {},
}: GenerateFormParams) => {
	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: generateDefaultValues(schema, defaultValues),
	});

	return { form, schema };
};