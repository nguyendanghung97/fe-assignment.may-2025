// App hoặc component chính
import { useEffect, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import AddressForm from './formAddress';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

type JSONSchema = {
    properties: Record<string, any>;
    [key: string]: any;
};

const Page = () => {
    const addressData = useSelector((state: RootState) => state.address);
    const { street, ward, province } = addressData;
    const [schemaText, setSchemaText] = useState('');
    const [parseError, setParseError] = useState<string | null>(null); // báo lỗi parse
    const [parsedSchema, setParsedSchema] = useState<JSONSchema | null>(null); // lưu schema hợp lệ

    // Khi component mount, load schema từ localStorage và parse luôn
    useEffect(() => {
        const saved = localStorage.getItem('schemaText');
        if (saved) {
            handleSchemaParse(saved);
        }
    }, []);

    const handleSchemaParse = (text: string) => {
        setSchemaText(text);
        try {
            const parsed = JSON.parse(text);
            if (parsed.type === 'object' && parsed.properties) {
                setParseError(null);
                setParsedSchema(parsed);
            } else {
                throw new Error('Schema phải có "type":"object","properties": {}');
            }
        } catch (err: any) {
            setParsedSchema(null);
            setParseError(err.message);
        }
    };

    const handleChangeSchema = (text: string) => {
        localStorage.setItem('schemaText', text);
        handleSchemaParse(text);
    };

    const jsonSchema = `{
  "type": "object",
  "properties": {
    "address": {
      "type": "string",
      "format": "vietnam-address",
      "title": "Địa chỉ"
    }
  },
  "required": ["address"]
}`;

    const fullAddress = [street, ward, province].filter(Boolean).join(', ');

    return (
        <div className="py-4 px-10 gap-5">
            <Label className="text-4xl justify-center font-bold py-3 text-nowrap">Dynamic Form App</Label>
            <div className="md:flex gap-5">
                <div className="basis-1/2 flex flex-col gap-5 justify-between">
                    <div className="flex flex-col gap-2.5">
                        <Label htmlFor="schema">JSON Schema Input</Label>
                        <Textarea
                            id="schema"
                            placeholder={'{ "type": "object", ... }'}
                            value={schemaText}
                            onChange={(e) => handleChangeSchema(e.target.value)}
                            className="font-mono"
                        />
                        {parseError && (
                            <span className="italic text-red-600">
                                Schema dùng để tạo form mình đã thiết kế ở phần phía dưới
                            </span>
                        )}
                        {parsedSchema && (
                            <span className="italic text-green-600">Schema đã được phân tích thành công</span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2.5">
                        <Label>Bạn có thể sử dụng mẫu JSON này để tạo ra biểu mẫu dùng để nhập địa chỉ</Label>
                        <div className="bg-muted rounded-md p-4 overflow-auto font-mono text-sm whitespace-pre-wrap">
                            {jsonSchema}
                        </div>
                    </div>
                </div>
                <div className="basis-1/2 mt-7 md:mt-0">
                    {parsedSchema ? (
                        <div className="flex flex-col items-center">
                            {Object.entries(parsedSchema.properties).map(([key, prop]: any) => {
                                console.log(Object.entries(parsedSchema.properties));
                                const label = prop.title || key;

                                const isRequired = parsedSchema.required?.includes(key);

                                // 👉 Custom field: vietnam-address
                                if (key === 'address' && prop.format === 'vietnam-address') {
                                    return (
                                        <>
                                            <Card className="w-80 px-5">
                                                <CardHeader className="text-2xl text-center font-semibold">
                                                    Biểu mẫu Nhập {label}
                                                </CardHeader>
                                                <CardContent>
                                                    <AddressForm key={key} isRequired={isRequired} />
                                                    <CardDescription className="text-center mt-2">
                                                        Biểu mẫu dữ liệu sẽ được thiết lập lại khi nhấp vào hoàn tất
                                                    </CardDescription>
                                                </CardContent>
                                            </Card>
                                            <div className="mt-8 p-4 border rounded bg-gray-50 dark:bg-gray-800 w-full">
                                                <Label className="mb-2 text-lg">Dữ liệu đã nhập</Label>
                                                <pre className="whitespace-pre-wrap">
                                                    {JSON.stringify({ [label ?? '']: fullAddress }, null, 2)}
                                                </pre>
                                            </div>
                                        </>
                                    );
                                }
                            })}
                        </div>
                    ) : (
                        <p className="text-muted-foreground text-sm mt-2">Nhập JSON Schema hợp lệ để xem form.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Page;
