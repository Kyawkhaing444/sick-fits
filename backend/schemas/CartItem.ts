/* eslint-disable @typescript-eslint/unbound-method */
import { integer, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { rule, isSignedIn } from '../access';

export const CartItem = list({
  access: {
    create: isSignedIn,
    read: rule.canOrder,
    update: rule.canOrder,
    delete: rule.canOrder,
  },
  fields: {
    quantity: integer({
      defaultValue: 1,
      isRequired: true,
    }),
    product: relationship({
      ref: 'Product',
    }),
    user: relationship({
      ref: 'User.cart',
    }),
  },
  ui: {
    listView: {
      initialColumns: ['user', 'product', 'quantity'],
    },
  },
});
