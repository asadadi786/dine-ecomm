import { Product } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
    items: Array<Product>;
    totalAmount: number;
    totalQuantity: number;
}

const initialState: CartState = {
    items: [],
    totalAmount: 0,
    totalQuantity: 0
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, actions: PayloadAction<{ product: Product, quantity: number }>) => {
            const newItem = actions.payload.product;
            const existingItem = state.items.find((item) => item._id === newItem._id);

            state.totalQuantity += actions.payload.quantity;
            state.totalAmount = state.totalAmount + actions.payload.quantity * actions.payload.product.price;

            if (!existingItem) {
                const totalPrice = actions.payload.quantity * newItem.price;
                state.items.push({
                    ...newItem,
                    quantity: actions.payload.quantity,
                    totalPrice,
                })
            }
            else {
                const totalPrice = existingItem.totalPrice + existingItem.quantity;
                existingItem.quantity += actions.payload.quantity;
                existingItem.totalPrice = totalPrice;
            }
        },
        removeCartProduct: (state, actions: PayloadAction<string>) => {
            const productId = actions.payload;
            state.items = state.items.filter((item) => item._id === productId);
            state.totalQuantity = state.items.reduce((total, item) => total + item.totalPrice, 0);
            state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);

        },
        decrementCartProduct: (state, actions: PayloadAction<string>) => {
            const product = actions.payload;
            const existingItem = state.items.find((item) => item._id === product)

            state.totalQuantity--;
            state.totalAmount = state.totalAmount - existingItem?.price!;

            if (existingItem?.quantity === 1) {
                state.items = state.items.filter((item) => item._id === product);
            }
            else {
                existingItem!.quantity--;
                existingItem!.totalPrice = existingItem!.totalPrice - existingItem?.price!;
            }

        },
        clearCart: (state) => {
            state = initialState;
        },
    },
});

// Action creators are generated for each case reducer function
export const cartActions = cartSlice.actions;

export default cartSlice.reducer;

