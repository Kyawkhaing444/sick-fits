/* eslint-disable @typescript-eslint/unbound-method */
import { integer, select, text, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { ListAccessArgs } from '../types';
import { rule, isSignedIn } from '../access';

export const Product = list({
  access: {
    create: isSignedIn,
    read: isSignedIn,
    update: rule.canManageProducts,
    delete: rule.canManageProducts,
  },
  fields: {
    name: text({ isRequired: true }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    photo: relationship({
      ref: 'ProductImage.product',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: { fields: ['image', 'altText'] },
        inlineEdit: { fields: ['image', 'altText'] },
      },
    }),
    status: select({
      options: [
        { label: 'draft', value: 'DRAFT' },
        { label: 'avaliable', value: 'AVALIABLE' },
        { label: 'unavaliable', value: 'UNAVALIABLE' },
      ],
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'hidden' },
      },
    }),
    price: integer(),
    user: relationship({
      ref: 'User.products',
      defaultValue: ({ context }) => ({
        connect: { id: (context.session as ListAccessArgs).itemId },
      }),
    }),
  },
});
