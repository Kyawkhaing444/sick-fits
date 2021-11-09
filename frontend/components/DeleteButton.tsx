import { ApolloCache, useMutation } from '@apollo/client';
import { deleteProductMutation } from '../GraphQL/mutation/deleteProduct';

interface PropType {
  id: string;
  children: any;
}

interface DeleteProductReturnedType {
  id: string;
  name: string;
}

interface PayloadType {
  data: {
    deleteProduct: {
      __typename: string;
      id: string;
      name: string;
    };
  };
}

export default function DeleteButton({ id, children }: PropType) {
  const [deleteProduct, { loading }] = useMutation<{ deleteProduct: DeleteProductReturnedType }>(deleteProductMutation);

  const cacheUpdate = (cache: ApolloCache<PayloadType>, { data }: PayloadType) => {
    const { deleteProduct: deleteProductPayload } = data;
    if (cache && deleteProductPayload) {
      const deletectItems = cache.identify(deleteProductPayload);
      if (deletectItems) {
        cache.evict(deletectItems);
      }
    }
  };

  const deleteHandler = async () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure to delete this product?')) {
      await deleteProduct({
        variables: {
          id,
        },
        update: cacheUpdate,
      }).catch((error: Error) => alert(error));
    }
  };

  return (
    <button disabled={loading} type="button" onClick={deleteHandler}>
      {children}
    </button>
  );
}
