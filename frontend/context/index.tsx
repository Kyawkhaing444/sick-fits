import { CartContextProvider } from './cartContext';

export function ContextProvider({ children }: { children: any }) {
  return <CartContextProvider>{children}</CartContextProvider>;
}
