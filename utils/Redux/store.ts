import { configureStore } from '@reduxjs/toolkit';
import basketReducer from './Slices/BasketSlice'

export const store = configureStore({
    reducer: {
      basket: basketReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
  });

  store.subscribe(() => console.log(store.getState()))
  
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;