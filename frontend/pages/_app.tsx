import propTypes from 'prop-types';
import { AppProps } from 'next/app';
import NProgress from 'nprogress';
import Router from 'next/router';
import { ApolloProvider } from '@apollo/client';
import Page from '../components/Page';
import { useApollo } from '../lib';

import '../components/styles/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeStart', () => NProgress.done());
Router.events.on('routeChangeStart', () => NProgress.done());
export default function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}

MyApp.propTypes = {
  Component: propTypes.any,
  pageProps: propTypes.any,
  apollo: propTypes.any,
};
