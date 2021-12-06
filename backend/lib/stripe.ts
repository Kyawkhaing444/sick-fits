import { Stripe } from 'stripe';
import { accessEnv } from './accessEnv';

const stripeConfig = new Stripe(
  accessEnv({
    key: 'STRIPE_SECRET',
    defaultValue: '',
  }),
  {
    apiVersion: '2020-08-27',
  }
);

export { stripeConfig };
