import Link from 'next/link';
import useCurrentUser from '../lib/useCurrentUser';
import NavStyles from './styles/NavStyles';

export default function Nav() {
  const { currentUser } = useCurrentUser();
  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {currentUser ? (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
        </>
      ) : (
        <Link href="/signin">SignIn</Link>
      )}
    </NavStyles>
  );
}
