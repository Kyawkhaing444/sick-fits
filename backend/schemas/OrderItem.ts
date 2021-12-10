/* eslint-disable @typescript-eslint/unbound-method */
import { integer, text, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { rule, isSignedIn } from '../access';

export const OrderItem = list({
  access: {
    create: isSignedIn,
    read: rule.canManageOrderItem,
    update: () => false,
    delete: () => false,
  },
  fields: {
    name: text({ isRequired: true }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    photo: relationship({
      ref: 'ProductImage',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: { fields: ['image', 'altText'] },
        inlineEdit: { fields: ['image', 'altText'] },
      },
    }),
    price: integer(),
    quantity: integer(),
    order: relationship({
      ref: 'Order.items',
    }),
  },
});
