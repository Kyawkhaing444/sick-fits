import { KeystoneContext } from '@keystone-next/types';
import { Session } from '../../types';
import { CartItemCreateInput } from '../../.keystone/schema-types';

interface ExistingCartType {
  id: string;
  quantity: number;
}

async function addToCart(
  // eslint-disable-next-line no-unused-vars
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> {
  // Query Current User
  const currentUserId = (context.session as Session).itemId;
  if (!currentUserId) {
    throw new Error('You must login to do this');
  }
  // Query Existing Cart
  const existingCartItems: readonly ExistingCartType[] =
    await context.lists.CartItem.findMany({
      where: { user: { id: currentUserId }, product: { id: productId } },
      resolveFields: 'id,quantity',
    });
  const [existingCartItem] = existingCartItems;
  // Increased Cart quantity by 1
  if (existingCartItem) {
    const updatedCartItem: CartItemCreateInput =
      await context.lists.CartItem.updateOne({
        id: existingCartItem.id,
        data: {
          quantity: existingCartItem.quantity + 1,
        },
        resolveFields: false,
      });
    return updatedCartItem;
  }
  // if not cart exist, create one
  const newCart: CartItemCreateInput = await context.lists.CartItem.createOne({
    data: {
      product: {
        connect: {
          id: productId,
        },
      },
      user: {
        connect: {
          id: currentUserId,
        },
      },
    },
    resolveFields: false,
  });
  return newCart;
}

export { addToCart };
