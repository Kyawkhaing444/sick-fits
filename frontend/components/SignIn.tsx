import { useMutation } from '@apollo/client';
import { ChangeEvent } from 'react';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';
import { SignInUserMutation } from '../GraphQL/mutation/signInUser';
import { CurrentUser } from '../GraphQL/query/currentUser';
import useForm from '../lib/useForm';

interface ISignInType {
  email: string;
  password: string;
}

interface SignInUserReturnedType {
  __typename: string;
  item?: {
    id: string;
    email: string;
  };
  message?: string;
}

export default function SignIn() {
  const { inputs, clearForm, onChangeHandler } = useForm<ISignInType>({
    email: '',
    password: '',
  });

  const [SignInUser, { loading, error, data }] = useMutation<{ authenticateUserWithPassword: SignInUserReturnedType }>(
    SignInUserMutation,
    {
      variables: inputs,
      refetchQueries: [
        {
          query: CurrentUser,
        },
      ],
    }
  );

  const onSubmitHandler = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    await SignInUser();
    clearForm();
  };

  const authError =
    data?.authenticateUserWithPassword.__typename === 'UserAuthenticationWithPasswordFailure'
      ? data.authenticateUserWithPassword
      : undefined;

  return (
    <Form method="POST" onSubmit={onSubmitHandler}>
      <DisplayError error={error || authError} />
      <fieldset disabled={loading} aria-busy={loading}>
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
        <button type="submit"> SignIn </button>
      </fieldset>
    </Form>
  );
}
