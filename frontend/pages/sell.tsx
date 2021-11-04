import { ChangeEvent } from 'react';
import Form from '../components/styles/Form';
import useForm from '../lib/useForm';

export default function SellPage() {
  const { inputs, onChangeHandler } = useForm({
    name: 'KyawKhaing',
    price: 12345,
    image: undefined,
    description: '',
  });
  const submitHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log(inputs);
  };
  return (
    <div>
      <p>Sell your project!</p>
      <Form onSubmit={submitHandler}>
        <fieldset>
          <label htmlFor="image">
            Image
            <input id="image" name="image" type="file" onChange={onChangeHandler} />
          </label>
          <label htmlFor="name">
            name
            <input
              id="name"
              name="name"
              placeholder="name"
              type="text"
              value={inputs.name}
              onChange={onChangeHandler}
            />
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
    </div>
  );
}
