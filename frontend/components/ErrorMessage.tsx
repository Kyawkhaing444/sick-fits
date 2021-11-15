/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import styled from 'styled-components';

import PropTypes from 'prop-types';
import { ApolloError } from '@apollo/client';

const ErrorStyles = styled.div`
  padding: 2rem;
  background: white;
  margin: 2rem 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 5px solid red;
  p {
    margin: 0;
    font-weight: 100;
  }
  strong {
    margin-right: 1rem;
  }
`;

interface MutationError {
  __typename: string;
  item?: {
    id: string;
    email: string;
  };
  message?: string;
}

interface PropType {
  error?: ApolloError | MutationError;
}

const DisplayError = ({ error }: PropType) => {
  if (!error || !error.message) return <></>;
  if (
    error instanceof ApolloError &&
    error.networkError &&
    'result' in error.networkError &&
    error.networkError.result?.errors?.length
  ) {
    return (
      <>
        {error.networkError.result.errors.map((errorSecond: Error, i: string) => (
          <ErrorStyles key={i}>
            <p data-test="graphql-error">
              <strong>Shoot!</strong>
              {errorSecond.message.replace('GraphQL error: ', '')}
            </p>
          </ErrorStyles>
        ))}
      </>
    );
  }
  return (
    <ErrorStyles>
      <p data-test="graphql-error">
        <strong>Shoot!</strong>
        {error.message.replace('GraphQL error: ', '')}
      </p>
    </ErrorStyles>
  );
};

DisplayError.defaultProps = {
  error: {},
};

DisplayError.propTypes = {
  error: PropTypes.object,
};

export default DisplayError;
