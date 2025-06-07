import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AddressState = {
    province: string;
    ward: string;
    street: string;
};

const initialState: AddressState = {
    province: '',
    ward: '',
    street: '',
};

export const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        setAddressForm: (state, action: PayloadAction<Partial<AddressState>>) => {
            return { ...state, ...action.payload };
        },
        resetAddressForm: () => ({
            province: '',
            ward: '',
            street: '',
        }),
    },
});

export const { setAddressForm, resetAddressForm } = addressSlice.actions;
export default addressSlice.reducer;
