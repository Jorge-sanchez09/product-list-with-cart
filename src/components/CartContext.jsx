import { createContext, useReducer } from "react";

export const CartContext = createContext([]);
export const CartDispatchContext = createContext(function dispatch() {});

function cartItemsReducer(prevCartItems, action) {
  if (action.type === "ADD_ITEM") {
    return [
      ...prevCartItems,
      {
        name: action.name,
        price: action.price,
        quantity: 1,
        totalPrice: action.price * 1,
        image: action.image,
      },
    ];
  } else if (action.type === "INCREMENT_ITEM") {
    const updatedItems = [...prevCartItems];
    const selectedItem = updatedItems.find(item => item.name === action.name);
    const existingItemIndex = updatedItems.indexOf(selectedItem);
    const updatingItem = {
      ...selectedItem,
      quantity: selectedItem.quantity + 1,
      totalPrice: selectedItem.price * (selectedItem.quantity + 1),
    };

    updatedItems[existingItemIndex] = updatingItem;
    return updatedItems;
  } else if (action.type === "DECREMENT_ITEM") {
    let updatedItems = [...prevCartItems];
    const selectedItem = updatedItems.find(item => item.name === action.name);
    const existingItemIndex = updatedItems.indexOf(selectedItem);

    if (selectedItem.quantity <= 1) {
      updatedItems = updatedItems.filter(dessert => dessert.name !== action.name);
    } else {
      const updatingItem = {
        ...selectedItem,
        quantity: selectedItem.quantity - 1,
        totalPrice: selectedItem.price * (selectedItem.quantity - 1),
      };

      updatedItems[existingItemIndex] = updatingItem;
    }

    return updatedItems;
  } else if (action.type === "REMOVE_ITEM") {
    const updatedItems = [...prevCartItems];

    return updatedItems.filter(item => item.name !== action.name);
  } else if (action.type === "EMPTY_CART") {
    let updatedItems = [];

    return updatedItems;
  }
}

export default function CartContextProvider({ children }) {
  const [cartItems, dispatch] = useReducer(cartItemsReducer, []);
  return (
    <CartContext.Provider value={cartItems}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
}
