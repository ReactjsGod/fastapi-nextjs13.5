import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BasketState, Item } from '@Types';

const initialState: BasketState = {
  items: [],
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<Item>) => {
      const itemIndex = state.items.findIndex(
        item => item._id === action.payload._id
      );

      if (itemIndex >= 0) {
        // Here if the item is already in the basket, increase its quantity 🛒
        state.items[itemIndex].quantity += 1;
      } else {
        // Add the new item into the basket with a quantity of 1
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromBasket: (state, action: PayloadAction<{ _id: string }>) => {
      const itemIndex = state.items.findIndex(
        item => item._id === action.payload._id
      );

      if (itemIndex >= 0) {
        // The item is in the basket, decrease its quantity
        state.items[itemIndex].quantity -= 1;

        // If the quantity becomes 0, remove the item from the basket
        if (state.items[itemIndex].quantity === 0) {
          state.items.splice(itemIndex, 1);
        }
      } else {
        console.warn("Can't find the item you are trying to delete");
      }
    },
    updateQuantity: (state, action: PayloadAction<{ _id: string; quantity: number }>) => {
      const itemIndex = state.items.findIndex(
        item => item._id === action.payload._id
      );

      if (itemIndex >= 0) {
        // Update the quantity of the item in the basket
        state.items[itemIndex].quantity += action.payload.quantity;
      } else {
        console.warn("Can't find the item you are trying to update");
      }
    },
  },
});

export const { addToBasket, removeFromBasket, updateQuantity } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state: { basket: BasketState }) => state.basket.items;
export const selectTotal = (state: { basket: BasketState }) =>
  state.basket.items.reduce(
    (total, item) => total + item.price * item?.quantity,
    0
  );

export default basketSlice.reducer;
