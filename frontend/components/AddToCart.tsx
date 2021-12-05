import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import { useCartContext } from '../context/cartContext';
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

  const { openCart } = useCartContext();

  if (error) {
    return <p>{error}</p>;
  }

  const addToCartHandler = async () => {
    await addToCart();
    if (!loading && !error) {
      openCart();
    }
  };

  return (
    <AddToCartButton disabled={loading} type="button" onClick={addToCartHandler}>
      Add{loading ? 'ing' : ''} to Cart 🛒
    </AddToCartButton>
  );
}
