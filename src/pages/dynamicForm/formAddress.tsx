import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { resetAddressForm, setAddressForm } from '@/store/formAddress';

const sampleData: Record<string, string[]> = {
    'Hồ Chí Minh': ['Quận 1', 'Quận 3', 'Quận 7'],
    'Hà Nội': ['Ba Đình', 'Hoàn Kiếm', 'Cầu Giấy'],
    'Đà Nẵng': ['Hải Châu', 'Thanh Khê', 'Ngũ Hành Sơn'],
};

type AddressFormProps = {
    isRequired?: boolean;
};

export default function AddressForm({ isRequired }: AddressFormProps) {
    const addressData = useSelector((state: RootState) => state.address);
    const dispatch = useDispatch<AppDispatch>();
    const schema = z.object({
        province: isRequired ? z.string().min(1, 'Vui lòng chọn tỉnh/thành phố') : z.string().optional(),
        ward: isRequired ? z.string().min(1, 'Vui lòng chọn phường/xã') : z.string().optional(),
        street: isRequired ? z.string().min(1, 'Vui lòng nhập địa chỉ cụ thể') : z.string().optional(),
    });

    const form = useForm({
        defaultValues: addressData,
        resolver: zodResolver(schema),
        mode: 'onChange',
    });

    const onSubmit = () => {
        dispatch(resetAddressForm());
        form.reset({
            // ✅ Đồng bộ lại UI với store (đưa form về rỗng)
            province: '',
            ward: '',
            street: '',
        });
    };

    const handleFormChange = () => {
        dispatch(setAddressForm(form.getValues()));
    };

    return (
        <Form {...form}>
            <form
                className="flex flex-col gap-5 w-full"
                onSubmit={form.handleSubmit(onSubmit)}
                onChange={handleFormChange}
            >
                <FormField
                    control={form.control}
                    name="province"
                    render={({ field }) => (
                        <FormItem className="gap-3">
                            <FormLabel>Tỉnh / Thành phố</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={(val) => {
                                        field.onChange(val);
                                        // setProvince(val);
                                        form.setValue('ward', '');
                                    }}
                                    value={field.value}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Chọn tỉnh / thành phố" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.keys(sampleData).map((city) => (
                                            <SelectItem key={city} value={city}>
                                                {city}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="ward"
                    render={({ field }) => (
                        <FormItem className="gap-3">
                            <FormLabel>Phường / Xã</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={(val) => {
                                        field.onChange(val);
                                    }}
                                    value={field.value}
                                    disabled={!form.watch('province')}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Chọn phường / xã" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {(sampleData[form.watch('province') ?? ''] || []).map((ward) => (
                                            <SelectItem key={ward} value={ward}>
                                                {ward}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                        <FormItem className="gap-3">
                            <FormLabel>Đường và số nhà</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Đường và số nhà" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    //  disabled={!form.formState.isValid}
                >
                    Hoàn tất
                </Button>
            </form>
        </Form>
    );
}
