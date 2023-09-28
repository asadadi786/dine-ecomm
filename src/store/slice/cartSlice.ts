import { Product } from "@/interfaces";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
export interface CartState {
    items: Array<Product>;
    totalAmount: number;
    totalQuantity: number;
    isLoading: boolean;
    error: any;
}

const initialState: CartState = {
    items: [],
    totalAmount: 0,
    totalQuantity: 0,
    isLoading: false,
    error: null
};

export const fetchData = createAsyncThunk(
    "cart/fetchdata",
    async (userId: string) => {
        const res = await fetch(`/api/cart/${userId}`)

        if (!res.ok) {
            console.log("failed to get data in Thunk")
        }

        const data = await res.json()

        return data;
    }
)

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
        removeCartProduct: (state: CartState, actions: PayloadAction<string>) => {
            const productId = actions.payload;

            state.items = state.items.filter((item) => item._id !== productId);
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

    extraReducers: (builder) => {
        builder.addCase(fetchData.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(fetchData.fulfilled, (state, action) => {
            const { cartItems, totalQuantity, totalPrice } = action.payload;
            state.items = cartItems;
            state.totalQuantity = totalQuantity;
            state.totalAmount = totalPrice;
            state.isLoading = false;
        });

        builder.addCase(fetchData.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        })
    }
});

export const selectIsLoading = (state: RootState) => state.cart.isLoading;
// Action creators are generated for each case reducer function
export const cartActions = cartSlice.actions;

export default cartSlice.reducer;

