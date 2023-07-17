import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
    items: Array<any>;
    totalAmount: number;
    totalQuantity: number;
}

const initialState: CounterState = {
    items: [],
    totalAmount: 0,
    totalQuantity: 0
};

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        addToCart: (state, actions: PayloadAction<any>) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            console.log(actions);
        },
        removeFromCart: (state, actions: PayloadAction<any>) => {
            console.log(actions);
        },
        clearCart: (state) => {
            state = initialState;
        },
    },
});

// Action creators are generated for each case reducer function
export const counterActions = counterSlice.actions;

export default counterSlice.reducer;