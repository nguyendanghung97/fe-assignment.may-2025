import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';

const FormSchema = z.object({
    username: z.string().min(1, 'This field is required'),
    userId: z.string().min(1, 'Please select an option'),
    usertype: z.string().min(1, 'This field is required'),
    // email: z
    //     .string({
    //         required_error: 'Please select an email to display.',
    //     })
    //     .email(),
    phone: z.coerce.number().min(1, 'This field is required'),
});

const AppForm = ({ className, fields, ...props }: Type) => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: '',
            userId: '',
            phone: 0,
            usertype: '',
        },
    });

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        console.log('data', data);
    };
    return (
        <Form {...form} {...props}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={cn(className)}>
                {fields.map((fieldData, index) => (
                    <FormField
                        key={index}
                        control={form.control}
                        name={fieldData.name as keyof z.infer<typeof FormSchema>}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{fieldData.label}</FormLabel>
                                <FormControl>
                                    {fieldData.type === 'select' ? (
                                        <Select
                                            value={field.value !== undefined ? String(field.value) : undefined}
                                            onValueChange={(val) =>
                                                fieldData.type === 'number'
                                                    ? field.onChange(Number(val))
                                                    : field.onChange(val)
                                            }
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {fieldData.options &&
                                                    fieldData.options.map((op, index) => (
                                                        <SelectItem key={index} value={op.value}>
                                                            {op.label}
                                                        </SelectItem>
                                                    ))}
                                            </SelectContent>
                                        </Select>
                                    ) : (
                                        <Input placeholder="Input" {...field} />
                                    )}
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
};

export default AppForm;

type Type = {
    fields: IField[];
    className?: string;
};

export type IField = {
    name: string;
    label: string;
    type: string;
    options?: { value: string; label: string }[];
};
