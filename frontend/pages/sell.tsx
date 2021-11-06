import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { ChangeEvent } from 'react';
import DisplayError from '../components/ErrorMessage';
import Form from '../components/styles/Form';
import useForm from '../lib/useForm';

const createProductMutation = gql`
  mutation Create_Product_Mutation($name: String!, $description: String!, $price: Int!, $image: Upload) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      name
      description
      price
    }
  }
`;

export default function SellPage() {
  const { inputs, onChangeHandler, clearForm } = useForm({
    name: 'KyawKhaing',
    price: 12345,
    image: undefined,
    description: '',
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [createProduct, { loading, error, data }] = useMutation(createProductMutation, {
    variables: inputs,
  });
  const submitHandler = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createProduct();
    clearForm();
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
