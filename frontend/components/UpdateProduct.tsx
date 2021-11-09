import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import { ChangeEvent } from 'react';
import { updateProductMutation } from '../GraphQL/mutation/updateProduct';
import useForm from '../lib/useForm';
import { ProductType } from '../Type/ProductType';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';

interface PropType {
  id: string;
}

interface UpdateProductReturnedType {
  id: string;
  name: string;
  description: string;
  price: number;
}

export const ProductQuery = gql`
  query ProductQuery($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
    }
  }
`;

export default function UpdateProduct({ id }: PropType) {
  const { error, data } = useQuery<{ Product: ProductType }>(ProductQuery, {
    variables: {
      id,
    },
  });

  const { inputs, onChangeHandler, clearForm } = useForm(data ? data.Product : {});

  const [updateProduct, { loading: updateLoading, error: updateError }] = useMutation<{
    updateProduct: UpdateProductReturnedType;
  }>(updateProductMutation, {
    variables: {
      id,
      name: inputs.name,
      description: inputs.description,
      price: inputs.price,
    },
  });

  const submitHandler = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await updateProduct();
    clearForm();
    let returnedId = '';
    if (res.data) {
      returnedId = res.data.updateProduct.id;
    }
    Router.push({
      pathname: `/product/${returnedId}`,
    });
  };

  if (error || updateError) return <DisplayError error={error || updateError} />;

  return (
    <Form onSubmit={submitHandler}>
      <DisplayError error={error} />
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
        <label htmlFor="name">
          name
          <input id="name" name="name" placeholder="name" type="text" value={inputs.name} onChange={onChangeHandler} />
        </label>
        <label htmlFor="price">
          price
          <input
            id="price"
            name="price"
            placeholder="price"
            type="number"
            value={inputs.price}
            onChange={onChangeHandler}
          />
        </label>
        <label htmlFor="description">
          price
          <textarea
            id="description"
            name="description"
            placeholder="Enter description"
            value={inputs.description}
            onChange={onChangeHandler}
          />
        </label>
        <button type="submit">+ add product</button>
      </fieldset>
    </Form>
  );
}
