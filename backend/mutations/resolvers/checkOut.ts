import { KeystoneContext } from '@keystone-next/types';
import {
  ProductCreateInput,
  UserCreateInput,
  CartItemCreateInput,
  OrderCreateInput,
} from '../../.keystone/schema-types';
import { stripeConfig } from '../../lib/stripe';
import { Session } from '../../types';

const graphql = String.raw;

interface IProductImage {
  id: string;
}

interface ICartItem extends CartItemCreateInput {
  id: string;
}

export async function checkOut(
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  root: any,
  { token }: { token: string },
  context: KeystoneContext
): Promise<OrderCreateInput> {
  // 1. Make sure the requester is signed in.
  const currentUserId = (context.session as Session).itemId;
  if (!currentUserId) {
    throw new Error('You must login to do this action.');
  }
  // 2. query the user, and his cart item
  const currentUser: UserCreateInput = await context.lists.User.findOne({
    where: {
      id: currentUserId,
    },
    resolveFields: graphql`
      id
      name
      email
      cart {
        id
        quantity
        product {
          id
          name
          description
          price
          photo{
            id
            image{
              publicUrlTransformed
            }
          }
        }
      }
    `,
  });
  //   console.dir(currentUser, { depth: null });
  // 3. calculate the total price
  // capture the product null -> deleted product case
  const cartItems = (currentUser.cart as CartItemCreateInput[]).filter(
    (cartItem) => cartItem.product
  );
  const amount = cartItems.reduce(
    (tally: number, cartItem: CartItemCreateInput) =>
      tally +
      cartItem.quantity * (cartItem.product as ProductCreateInput).price,
    0
  );
  //   console.log(formatMoney(amount));
  // 4. create charge with stripe
  const charge = await stripeConfig.paymentIntents.create({
    amount,
    currency: 'USD',
    confirm: true,
    payment_method: token,
  });
  // console.log(charge);
  // 5. add cart item to order item
  const orderItems = cartItems.map((cartItem) => {
    const orderItem = {
      name: (cartItem.product as ProductCreateInput).name,
      description: (cartItem.product as ProductCreateInput).description,
      photo: {
        connect: {
          id: ((cartItem.product as ProductCreateInput).photo as IProductImage)
            .id,
        },
      },
      price: (cartItem.product as ProductCreateInput).price,
      quantity: cartItem.quantity,
    };
    return orderItem;
  });
  // 6. create order based on order item
  const order: OrderCreateInput = await context.lists.Order.createOne({
    data: {
      items: { create: orderItems },
      user: { connect: { id: currentUserId } },
      total: charge.amount,
      charge: charge.id,
    },
    resolveFields: false,
  });
  // 7. clean up old cart items
  const cartItemIds = (currentUser.cart as ICartItem[]).map(
    (cartItem) => cartItem.id
  );
  await context.lists.CartItem.deleteMany({
    ids: cartItemIds,
  });
  // console.dir(order, { depth: null });
  return order;
}
