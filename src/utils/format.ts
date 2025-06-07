export const formatPhoneNumber = (phone?: string) => {
    if (!phone) return '';

    const match = phone.match(/^(\d{3})(\d{3})(\d{0,4})$/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
};

export const normalizePhone = (phone: string | number | null | undefined) =>
    (phone ?? '').toString().replace(/\D/g, ''); // Loại bỏ mọi ký tự không phải số
