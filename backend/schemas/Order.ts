import { integer, text, relationship, virtual } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import formatMoney from '../lib/formatMoney';

interface OrderType {
  total: number;
  charge: string;
}

export const Order = list({
  fields: {
    label: virtual({
      graphQLReturnType: 'String',
      resolver(item: OrderType) {
        return `${formatMoney(item.total)}`;
      },
    }),
    items: relationship({
      ref: 'OrderItem.order',
      many: true,
    }),
    user: relationship({
      ref: 'User.orders',
    }),
    total: integer(),
    charge: text(),
  },
});
