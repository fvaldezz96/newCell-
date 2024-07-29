import { createSelector } from 'reselect';
const totalCompra = () => {
    const selectCartItems = (state) => state.cart;
    const selectTotalPrice = createSelector(
        selectCartItems,
        (cartItems) => {
            return cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
        }
    );
    return selectTotalPrice
}

export default totalCompra