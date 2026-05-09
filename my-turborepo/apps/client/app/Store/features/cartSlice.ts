import { createSlice } from "@reduxjs/toolkit";
import { CartItemDTO } from "@repo/shared";



export type CartState = {
  cartItems: CartItemDTO[];
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
  if (!product || !product.data) return;
  const productId = product.data.id

  const existing = state.cartItems.find(
    (i) =>
      i.id === productId &&
      i.selectedColor === selectedColor &&
      i.selectedSize === selectedSize
  );

  if (existing) {
    existing.quantity += quantity;
  } else {
    state.cartItems.push({
      id: productId,
      productId: String(productId),

      name: product.data.name,
      price: product.data.price,
      quantity,
      selectedColor,
      selectedSize,
      images: product.data.images,
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
  const { id, selectedColor, selectedSize } = action.payload;
  const item = state.cartItems.find(i => 
    i.id === id && 
    i.selectedColor === selectedColor && 
    i.selectedSize === selectedSize
  );
  if (item) item.quantity++;
  calculateTotals(state as any);
},

decreaseQty: (state, action) => {
  const { id, selectedColor, selectedSize } = action.payload;
  const item = state.cartItems.find(i => 
    i.id === id && 
    i.selectedColor === selectedColor && 
    i.selectedSize === selectedSize
  );
  if (item && item.quantity > 1) item.quantity--;
  calculateTotals(state as any);
},

  },
});

export const { addToCart, removeFromCart, clearCart, increaseQty, decreaseQty } =
  CartSlice.actions;

export default CartSlice.reducer;