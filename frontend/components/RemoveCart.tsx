import { ApolloCache, useMutation } from '@apollo/client';
import styled from 'styled-components';
import { REMOVE_CART_MUTATION } from '../GraphQL/mutation/removeCart';

const RemoveCartButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;

interface IRemoveCartReturnedType {
  id: string;
}

interface PayloadsType {
  data: {
    deleteCartItem: {
      id: string;
    };
  };
}

function update(cache: ApolloCache<PayloadsType>, payloads: PayloadsType) {
  const deletedCartItem = cache.identify(payloads.data.deleteCartItem);
  if (deletedCartItem) {
    cache.evict(deletedCartItem);
  }
}

export function RemoveCart({ id }: { id: string }) {
  const [removeCart, { loading }] = useMutation<{ deleteCartItem: IRemoveCartReturnedType }>(REMOVE_CART_MUTATION, {
    variables: {
      id,
    },
    update,
  });
  return (
    <RemoveCartButton disabled={loading} onClick={() => removeCart()}>
      &times;
    </RemoveCartButton>
  );
}
