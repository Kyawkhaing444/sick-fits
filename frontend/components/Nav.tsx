import Link from 'next/link';
import { useCartContext } from '../context/cartContext';
import useCurrentUser from '../lib/useCurrentUser';
import { CartType } from '../Type/CartType';
import { CountCart } from './CountCart';
import SignOut from './SignOut';
import NavStyles from './styles/NavStyles';

export default function Nav() {
  const { currentUser } = useCurrentUser();
  const { openCart } = useCartContext();

  const countCartQuantity = (cart: CartType[]) =>
    cart.reduce((bally: number, cartItem: CartType) => bally + cartItem.quantity, 0);

  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {currentUser ? (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <SignOut />
          <button type="button" onClick={() => openCart()}>
            My Carts
            <CountCart count={countCartQuantity(currentUser.cart)} />
          </button>
        </>
      ) : (
        <Link href="/signin">SignIn</Link>
      )}
    </NavStyles>
  );
}
