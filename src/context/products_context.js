import { useContext, useEffect, useReducer } from "react";
import { SIDEBAR_CLOSE, SIDEBAR_OPEN } from "../actions";
import reducer from "../reducers/products_reducer";
import React from "react";

const ProductsContext = React.createContext();
const initialState = {
  isSidebarOpen: false,
};

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };

  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };

  return (
    <ProductsContext.Provider value={{ ...state, openSidebar, closeSidebar }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductContext = () => {
  return useContext(ProductsContext);
};
