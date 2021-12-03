import styled from 'styled-components';
import calTotalPrice from '../lib/calTotalPrice';
import { formatMoney } from '../lib/formatMoney';
import useCurrentUser from '../lib/useCurrentUser';
import { CartType } from '../Type/CartType';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';

const CartItemStyle = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGray);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

function CartItem({ cartItem }: { cartItem: CartType }) {
  const { quantity, product } = cartItem;
  return (
    <CartItemStyle>
      <img width="100" src={product.photo.image.publicUrlTransformed} alt={product.name} />
      <div>
        <h3>{product.name}</h3>
        <p>
          {formatMoney(product.price * quantity)}
          <em>
            - {quantity} &times; {formatMoney(product.price)} Each
          </em>
        </p>
      </div>
    </CartItemStyle>
  );
}

export default function Cart() {
  const { currentUser } = useCurrentUser();
  return (
    <CartStyles open>
      <header>
        <Supreme>{currentUser?.name}'s carts</Supreme>
      </header>
      <ul>
        {currentUser?.cart.map((cartItem) => (
          <CartItem key={cartItem.product.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>{currentUser && <p>{formatMoney(calTotalPrice({ cart: currentUser.cart }))}</p>}</footer>
    </CartStyles>
  );
}
