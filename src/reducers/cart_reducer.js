import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions';
import { DECREASE, INCREASE } from '../utils/constants';

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
  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((item) => item.id !== action.payload);
    return { ...state, cart: tempCart };
  }
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        if (value === INCREASE) {
          let newAmount =
            item.amount + 1 > item.max ? item.max : item.amount + 1;
          return { ...item, amount: newAmount };
        }
        if (value === DECREASE) {
          let newAmount = item.amount - 1 < 1 ? 1 : item.amount - 1;
          return { ...item, amount: newAmount };
        }
      } else {
        return item;
      }
    });
    return { ...state, cart: tempCart };
  }

  if (action.type === COUNT_CART_TOTALS) {
    const { total_items, total } = state.cart.reduce(
      (prev, cur) => {
        const { amount, price } = cur;
        prev.total_items += amount;
        prev.total += price * amount;
        return prev;
      },
      {
        total_items: 0,
        total: 0,
      }
    );
    return { ...state, total_items, total };
  }
  throw new Error(`No matching "${action.type}" - action type`);
};

export default cart_reducer;
