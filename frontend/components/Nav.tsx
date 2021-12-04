import Link from 'next/link';
import { useCartContext } from '../context/cartContext';
import useCurrentUser from '../lib/useCurrentUser';
import SignOut from './SignOut';
import NavStyles from './styles/NavStyles';

export default function Nav() {
  const { currentUser } = useCurrentUser();
  const { openCart } = useCartContext();
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
          </button>
        </>
      ) : (
        <Link href="/signin">SignIn</Link>
      )}
    </NavStyles>
  );
}
