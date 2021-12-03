import { CartType } from '../Type/CartType';

export default function calTotalPrice({ cart }: { cart: CartType[] }) {
  return cart.reduce((tally, cartItem) => {
    if (!cartItem.product) {
      return tally;
    }
    return tally + cartItem.quantity * cartItem.product.price;
  }, 0);
}
