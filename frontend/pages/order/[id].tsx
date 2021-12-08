import Head from 'next/head';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import DisplayError from '../../components/ErrorMessage';
import OrderStyles from '../../components/styles/OrderStyles';
import { ORDER_QUERY } from '../../GraphQL/query/order';
import { OrderType } from '../../Type/OrderType';
import { formatMoney } from '../../lib/formatMoney';

export default function OrderItem() {
  const router = useRouter();
  const orderId = router.query.id;
  const { data, loading, error } = useQuery<{ order: OrderType }>(ORDER_QUERY, {
    variables: {
      id: orderId,
    },
  });
  if (loading) {
    return <p>loading....</p>;
  }
  if (error) {
    return <DisplayError error={error} />;
  }
  const order = data ? data.order : ({} as OrderType);
  return (
    <OrderStyles>
      <Head>
        <title>Sick Fits - {order.id}</title>
      </Head>
      <p>
        <span>Order Id:</span>
        <span>{order.id}</span>
      </p>
      <p>
        <span>Charge:</span>
        <span>{order.charge}</span>
      </p>
      <p>
        <span>Order Total:</span>
        <span>{formatMoney(order.total)}</span>
      </p>
      <p>
        <span>ItemCount:</span>
        <span>{order.items.length}</span>
      </p>
      <div className="items">
        {order.items.map((item) => (
          <div className="order-item" key={item.id}>
            <img src={item.photo.image.publicUrlTransformed} alt={item.name} />
            <div className="item-details">
              <h2>{item.name}</h2>
              <p>Qty: {item.quantity}</p>
              <p>Each: {formatMoney(item.price)}</p>
              <p>Sub Total: {formatMoney(item.price * item.quantity)}</p>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </OrderStyles>
  );
}
