import { useMutation } from '@apollo/client';
import { ChangeEvent } from 'react';
import Router from 'next/router';
import DisplayError from '../components/ErrorMessage';
import Form from '../components/styles/Form';
import useForm from '../lib/useForm';
import { AllProductQuery } from '../GraphQL/query/allProducts';
import { createProductMutation } from '../GraphQL/mutation/createProduct';

interface CreateProductReturnedType {
  id: string;
}

export default function SellPage() {
  const { inputs, onChangeHandler, clearForm } = useForm({
    name: 'KyawKhaing',
    price: 12345,
    image: undefined,
    description: '',
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [createProduct, { loading, error }] = useMutation<{ createProduct: CreateProductReturnedType }>(
    createProductMutation,
    {
      variables: inputs,
      refetchQueries: [
        {
          query: AllProductQuery,
        },
      ],
    }
  );
  const submitHandler = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await createProduct();
    clearForm();
    let id = '';
    if (res.data) {
      id = res.data.createProduct.id;
    }
    Router.push({
      pathname: `/product/${id}`,
    });
  };
  return (
    <Form onSubmit={submitHandler}>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Image
          <input id="image" name="image" type="file" onChange={onChangeHandler} />
        </label>
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
