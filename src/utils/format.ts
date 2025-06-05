export const formatPhoneNumber = (phone?: string) => {
    if (!phone) return '';

    const match = phone.match(/^(\d{3})(\d{3})(\d{0,4})$/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
};
