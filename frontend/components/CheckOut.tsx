import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe, StripeError } from '@stripe/stripe-js';
import nProgress from 'nprogress';
import { FormEvent, useState } from 'react';
import styled from 'styled-components';
import SickButton from './styles/SickButton';

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
    // 6. Change the page to view the order
    // 7. turn the loader off
    setLoader(false);
    nProgress.done();
  };

  return (
    <CheckOutFormStyle onSubmit={submitHandler}>
      {error && <p style={{ fontSize: 12 }}> {error.message} </p>}
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
