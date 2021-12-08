import { useQuery } from '@apollo/client';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import DisplayError from '../components/ErrorMessage';
import { ALL_ORDER_QUERY_MUTATION } from '../GraphQL/query/allOrder';
import { OrderType } from '../Type/OrderType';
import { formatMoney } from '../lib/formatMoney';
import OrderItemStyles from '../components/styles/OrderItemStyles';

const OrderUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 4rem;
`;

function countItemsInAnOrder(order: OrderType) {
  return order.items.reduce((tally: number, orderItem) => tally + orderItem.quantity, 0);
}

export default function OrderPage() {
  const { data, loading, error } = useQuery<{ allOrders: OrderType[] }>(ALL_ORDER_QUERY_MUTATION);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    <DisplayError error={error} />;
  }
  const allOrders = data ? data.allOrders : [];
  return (
    <div>
      <Head>
        <title>Your order ({allOrders.length})</title>
      </Head>
      <h2>You have {allOrders.length} orders!</h2>
      <OrderUl>
        {allOrders.map((order) => (
          <OrderItemStyles key={order.id}>
            <Link href={`/order/${order.id}`}>
              <a>
                <div className="order-meta">
                  <p>{countItemsInAnOrder(order)} Items</p>
                  <p>
                    {order.items.length} Product
                    {order.items.length === 1 ? '' : 's'}
                  </p>
                  <p>{formatMoney(order.total)}</p>
                </div>
                <div className="images">
                  {order.items.map((orderItem) => (
                    <img
                      key={`image-${orderItem.id}`}
                      src={orderItem.photo?.image?.publicUrlTransformed}
                      alt={orderItem.name}
                    />
                  ))}
                </div>
              </a>
            </Link>
          </OrderItemStyles>
        ))}
      </OrderUl>
    </div>
  );
}
