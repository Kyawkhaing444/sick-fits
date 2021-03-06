import { useMutation } from '@apollo/client';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe, StripeError } from '@stripe/stripe-js';
import nProgress from 'nprogress';
import { FormEvent, useState } from 'react';
import styled from 'styled-components';
import router from 'next/router';
import SickButton from './styles/SickButton';
import { OrderType } from '../Type/OrderType';
import { CHECK_OUT_MUTATION } from '../GraphQL/mutation/checkOut';
import { CurrentUser } from '../GraphQL/query/currentUser';
import { useCartContext } from '../context/cartContext';

const CheckOutFormStyle = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY ?? '');

export function CheckOutForm() {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState<StripeError>();
  const stripe = useStripe();
  const elements = useElements();

  const [checkOut, { error: GraphQLError }] = useMutation<{ checkOut: OrderType }>(CHECK_OUT_MUTATION, {
    refetchQueries: [{ query: CurrentUser }],
  });

  const { closeCart } = useCartContext();

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    // 1. Stop the form submitting and turn the loader one
    setLoader(true);
    // 2. Start the page transition
    nProgress.start();
    // 3. Create the payment method via stripe
    const paymentMethodResult = await stripe?.createPaymentMethod({
      type: 'card',
      card: elements?.getElement(CardElement) ?? { token: '' },
    });
    // 4. Handle any error from stripe
    if (paymentMethodResult?.error) {
      setLoader(false);
      nProgress.done();
      setError(paymentMethodResult.error);
    }
    // 5. Send token from step 3 to our keystone server, via custom mutation
    const { data } = await checkOut({
      variables: {
        token: paymentMethodResult?.paymentMethod?.id,
      },
    });
    const order = data ? data.checkOut : ({} as OrderType);
    // 6. Change the page to view the order
    router.push({
      pathname: `/order/[id]`,
      query: {
        id: order.id,
      },
    });
    // 7. turn the loader off
    closeCart();
    setLoader(false);
    nProgress.done();
  };

  return (
    <CheckOutFormStyle onSubmit={submitHandler}>
      {error && <p style={{ fontSize: 12 }}> {error.message} </p>}
      {GraphQLError && <p style={{ fontSize: 12 }}> {GraphQLError.message} </p>}
      <CardElement />
      <SickButton disabled={loader} type="submit">
        {loader ? 'Charging the Credit Card' : 'Check Out Now'}
      </SickButton>
    </CheckOutFormStyle>
  );
}

export function CheckOut() {
  return (
    <Elements stripe={stripeLib}>
      <CheckOutForm />
    </Elements>
  );
}
