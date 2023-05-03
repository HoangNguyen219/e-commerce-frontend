import { ADD_TO_CART } from '../actions';

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;
    const { stock: max } = product.colorStocks.find((cs) => cs.color === color);
    const tempItem = state.cart.find((item) => item.id === id + color);
    if (tempItem) {
      state.cart = state.cart.filter((item) => item.id !== tempItem.id);
      let newAmount = tempItem.amount + amount;
      if (newAmount > tempItem.max) {
        newAmount = tempItem.max;
      }
      tempItem.amount = newAmount;
      return { ...state, cart: [tempItem, ...state.cart] };
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color: color,
        amount: amount,
        image: product.primaryImage,
        price: product.price,
        max: max,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
  }
  throw new Error(`No matching "${action.type}" - action type`);
};

export default cart_reducer;
