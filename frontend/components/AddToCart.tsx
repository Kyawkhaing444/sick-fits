import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import { ADD_TO_CART_MUTATION } from '../GraphQL/mutation/addtoCart';
import { CurrentUser } from '../GraphQL/query/currentUser';

const AddToCartButton = styled.button`
  cursor: pointer;
`;

interface AddToCartReturnedType {
  id: string;
}

export function AddToCart({ id }: { id: string }) {
  const [addToCart, { loading, error }] = useMutation<{ addToCart: AddToCartReturnedType }>(ADD_TO_CART_MUTATION, {
    variables: {
      id,
    },
    refetchQueries: [{ query: CurrentUser }],
  });
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <AddToCartButton disabled={loading} type="button" onClick={() => addToCart()}>
      Add{loading ? 'ing' : ''} to Cart 🛒
    </AddToCartButton>
  );
}
