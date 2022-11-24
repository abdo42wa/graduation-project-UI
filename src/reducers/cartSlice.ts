import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Cart } from '../interfaces/ICart';
import { IProduct } from '../product/ProductType';


interface CartState {
    cart: Cart;
    isLodging: boolean;
    error: any;
    cartTotalAmount: number;

}

const initialState: CartState = {
    // @ts-ignore
    cart: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    isLodging: false,
    cartTotalAmount: 0,
    error: null,
}



const modifyQtyByOne = (
    cart: Cart,
    selectedProduct: IProduct,
    modificationType: 'INCREMENT' | 'DECREMENT'
) => {
    const previousCart = [...cart];

    const productInCart = previousCart.find(
        (product) => product._id === selectedProduct._id
    );

    let newCart = [];

    if (!productInCart) {
        previousCart.push({ ...selectedProduct, quantity: 1 });
        newCart = previousCart;
    } else {
        const filteredCart = previousCart.filter(
            (p) => p._id !== productInCart._id
        );

        const modification = modificationType === 'INCREMENT' ? 1 : -1;

        productInCart.quantity = productInCart.quantity + modification;

        if (productInCart.quantity === 0) {
            newCart = [...filteredCart];
            console.log({ newCart })
        } else {
            newCart = [...filteredCart, productInCart];
        }
        localStorage.setItem('cartItems', JSON.stringify(newCart));
    }
    return newCart;
};



const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        incrementProduct: (state, action: PayloadAction<IProduct>) => {
            const modifiedCart = modifyQtyByOne(
                state.cart,
                action.payload,
                'INCREMENT'
            );
            state.cart = modifiedCart;
        },
        decrementProduct: (state, action: PayloadAction<IProduct>) => {
            const modifiedCart = modifyQtyByOne(
                state.cart,
                action.payload,
                'DECREMENT'
            );
            state.cart = modifiedCart;
        },
        resetCart: (state) => {
            state.cart = [];
        }

    }
})

export const { incrementProduct, decrementProduct, resetCart } =
    cartSlice.actions;
export default cartSlice.reducer;
