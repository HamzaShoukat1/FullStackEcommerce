import { createSlice } from "@reduxjs/toolkit";
import { CartItemsType } from "@/app/types";



export type CartState = {
  cartItems: CartItemsType[];
  totalAmount: number;
  totalQuantity: number;
};

const initialState: CartState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};

// ✅ helper (clean way)
const calculateTotals = (state: CartState) => {
  let amount = 0;
  let qty = 0;

  state.cartItems.forEach((item) => {
    amount += item.price * item.quantity;
    qty += item.quantity;
  });

  state.totalAmount = amount;
  state.totalQuantity = qty;
};

const CartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    // ✅ ADD TO CART
 addToCart: (state, action) => {
  const { product, quantity, selectedColor, selectedSize } = action.payload;

  // 🛡️ safety check
  if (!product) return;

  const existing = state.cartItems.find(
    (i) =>
      i.id === product.id &&
      i.selectedColor === selectedColor &&
      i.selectedSize === selectedSize
  );

  if (existing) {
    existing.quantity += quantity;
  } else {
    state.cartItems.push({
      ...product,
      quantity,
      selectedColor,
      selectedSize,
    });
  }

  calculateTotals(state as any);
},

    // ✅ REMOVE FROM CART
    removeFromCart: (state, action) => {
      const {id,selectedColor,selectedSize} = action.payload
      state.cartItems = state.cartItems.filter(item=> 
      !(
        item.id === id &&
        item.selectedColor === selectedColor &&
        item.selectedSize === selectedSize
      )
      )

      calculateTotals(state as any);
    },

    // ✅ CLEAR CART
    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
    increaseQty: (state, action) => {
      const item = state.cartItems.find(i => i.id === action.payload);
      if (item) item.quantity++;
      calculateTotals(state as any);
    },

    decreaseQty: (state, action) => {
      const item = state.cartItems.find(i => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity--;
      calculateTotals(state as any);
    },
  },
});

export const { addToCart, removeFromCart, clearCart, increaseQty, decreaseQty } =
  CartSlice.actions;

export default CartSlice.reducer;