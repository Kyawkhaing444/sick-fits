import { createContext, useState, useContext } from 'react';

interface CartContext {
  cartOpen: boolean;
  setCartOpen: (payloads: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
}

const LocalCartContext = createContext<CartContext>({
  cartOpen: false,
  setCartOpen: () => null,
  openCart: () => null,
  closeCart: () => null,
} as CartContext);

const LocalCartContextProvider = LocalCartContext.Provider;

interface IPropType {
  children: any;
}

export function CartContextProvider({ children }: IPropType) {
  const [cartOpen, setCartOpen] = useState(false);

  function openCart() {
    setCartOpen(true);
  }

  function closeCart() {
    setCartOpen(false);
  }

  return (
    <LocalCartContextProvider value={{ cartOpen, setCartOpen, openCart, closeCart }}>
      {children}
    </LocalCartContextProvider>
  );
}

export function useCartContext() {
  const cartContext = useContext(LocalCartContext);
  return cartContext;
}
