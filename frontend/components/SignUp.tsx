import { useMutation } from '@apollo/client';
import { ChangeEvent } from 'react';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';
// import { CurrentUser } from '../GraphQL/query/currentUser';
import useForm from '../lib/useForm';
import { createUserMutation } from '../GraphQL/mutation/createUser';

interface ISignUpType {
  name: string;
  email: string;
  password: string;
}

interface SignUpUserReturnedType {
  id: string;
  name: string;
  email: string;
}
export default function SignUp() {
  const { inputs, clearForm, onChangeHandler } = useForm<ISignUpType>({
    name: '',
    email: '',
    password: '',
  });

  const [SignUpUser, { loading, error, data }] = useMutation<{ createUser: SignUpUserReturnedType }>(
    createUserMutation,
    {
      variables: inputs,
      // refetchQueries: [
      //   {
      //     query: CurrentUser,
      //   },
      // ],
    }
  );

  const onSubmitHandler = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    await SignUpUser();
    clearForm();
  };

  return (
    <Form method="POST" onSubmit={onSubmitHandler}>
      <DisplayError error={error} />
      {data?.createUser && <p>Signed Up with {data.createUser.email} - Please go ahead and Sign In</p>}
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="name">
          Your Name
          <input
            id="name"
            type="name"
            name="name"
            placeholder="Name"
            autoComplete="name"
            value={inputs.name}
            onChange={onChangeHandler}
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            value={inputs.email}
            onChange={onChangeHandler}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={onChangeHandler}
          />
        </label>
        <button type="submit"> SignUp </button>
      </fieldset>
    </Form>
  );
}
