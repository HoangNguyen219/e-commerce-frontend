import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  GET_CONFIGS,
  GET_ORDERS,
  GET_SINGLE_ORDER,
  REMOVE_CART_ITEM,
  SET_CART,
  SET_FREE_SHIPPING_FEE,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions';
import { DECREASE, INCREASE } from '../utils/constants';

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount } = action.payload;
    const tempItem = state.localCart.find((item) => item.id === id + color);
    if (tempItem) {
      state.localCart = state.localCart.filter(
        (item) => item.id !== tempItem.id
      );
      let newAmount = tempItem.amount + amount;
      if (newAmount > tempItem.max) {
        newAmount = tempItem.max;
      }
      tempItem.amount = newAmount;
      return {
        ...state,
        localCart: [tempItem, ...state.localCart],
      };
    } else {
      const newLocalItem = {
        id: id + color,
        productId: id,
        amount: amount,
        color: color,
      };
      return {
        ...state,
        localCart: [...state.localCart, newLocalItem],
      };
    }
  }
  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.localCart.filter(
      (item) => item.id !== action.payload
    );
    return { ...state, localCart: tempCart };
  }
  if (action.type === CLEAR_CART) {
    return { ...state, localCart: [] };
  }
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    const tempCart = state.localCart.map((item) => {
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
    return { ...state, localCart: tempCart };
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

  if (action.type === SET_CART) {
    const { data } = action.payload;
    console.log(data);
    return { ...state, cart: data ? [...data] : [] };
  }

  if (action.type === GET_ORDERS) {
    const { orders } = action.payload;
    return {
      ...state,
      orders,
    };
  }

  if (action.type === GET_SINGLE_ORDER) {
    const { order } = action.payload;
    return {
      ...state,
      order,
    };
  }

  if (action.type === GET_CONFIGS) {
    const { configs } = action.payload;
    const getValueByName = (name) =>
      configs.find((config) => config.name === name && config.status)?.value;
    return {
      ...state,
      shippingFee: getValueByName('ShippingFee') || 0,
      minFreeShippingAmount: getValueByName('MinFreeShippingAmount') || 0,
    };
  }

  if (action.type === SET_FREE_SHIPPING_FEE) {
    return {
      ...state,
      shippingFee: 0,
    };
  }

  throw new Error(`No matching "${action.type}" - action type`);
};

export default cart_reducer;
