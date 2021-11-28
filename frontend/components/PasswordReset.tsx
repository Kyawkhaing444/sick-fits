/* eslint-disable no-console */
import { useMutation } from '@apollo/client';
import { ChangeEvent } from 'react';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import { PasswordResetUserMutation } from '../GraphQL/mutation/passwordResetUser';

interface IPasswordResetType {
  email: string;
  password: string;
  token: string;
}

interface PasswordResetReturnedType {
  __typename: string;
  code: string;
  message: string;
}

interface IPropType {
  token: string;
}

export default function PasswordReset({ token }: IPropType) {
  const { inputs, clearForm, onChangeHandler } = useForm<IPasswordResetType>({
    email: '',
    password: '',
    token,
  });

  const [PasswordResetUser, { loading, error, data }] = useMutation<{
    redeemUserPasswordResetToken: PasswordResetReturnedType;
  }>(PasswordResetUserMutation, {
    variables: inputs,
  });

  const onSubmitHandler = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await PasswordResetUser();
    } catch (err) {
      console.error(err);
    }
    clearForm();
  };

  const authError = data?.redeemUserPasswordResetToken?.code ? data.redeemUserPasswordResetToken : undefined;

  return (
    <Form method="POST" onSubmit={onSubmitHandler}>
      <h2>Reset Your Password</h2>
      <DisplayError error={error || authError} />
      {data?.redeemUserPasswordResetToken === null && <p>Success! You can now sign in.</p>}
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
        <button type="submit"> Reset Your Password </button>
      </fieldset>
    </Form>
  );
}
