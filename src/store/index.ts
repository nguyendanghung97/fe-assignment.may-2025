import { combineReducers, configureStore, Middleware } from '@reduxjs/toolkit';
import { addressSlice } from './formAddress';

const persistedSlices = [addressSlice.name];

export const saveMiddleware: Middleware = (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState();

    persistedSlices.forEach((sliceName) => {
        try {
            const serializedState = JSON.stringify(state[sliceName]);
            localStorage.setItem(sliceName, serializedState);
        } catch (e) {
            console.error(`Error saving ${sliceName} state to localStorage`, e);
        }
    });

    return result;
};

export const loadFromLocalStorage = <T extends object = any>(): T | undefined => {
    const preloadedState: Record<string, unknown> = {};

    try {
        for (const sliceName of persistedSlices) {
            const serialized = localStorage.getItem(sliceName);
            if (serialized) {
                preloadedState[sliceName] = JSON.parse(serialized);
            }
        }

        if (Object.keys(preloadedState).length > 0) {
            return preloadedState as T; // ✅ Trả về preloaded state nếu có dữ liệu
        }
    } catch (e) {
        console.error('Error loading state from localStorage', e);
    }

    return undefined; // ✅ Trường hợp không có dữ liệu hoặc có lỗi
};

const rootReducer = combineReducers({
    [addressSlice.name]: addressSlice.reducer,
});
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saveMiddleware), // Thêm middleware
    preloadedState: loadFromLocalStorage(),
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
