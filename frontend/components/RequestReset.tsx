/* eslint-disable no-console */
import { useMutation } from '@apollo/client';
import { ChangeEvent } from 'react';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import { RequestResetUserMutation } from '../GraphQL/mutation/requestResetUser';

interface IRequetResetType {
  email: string;
}

interface RequestResetReturnedType {
  message?: string;
  code?: string;
}

export default function RequestReset() {
  const { inputs, clearForm, onChangeHandler } = useForm<IRequetResetType>({
    email: '',
  });

  const [RequestResetUser, { loading, error, data }] = useMutation<{
    sendUserPasswordResetLink: RequestResetReturnedType;
  }>(RequestResetUserMutation, {
    variables: inputs,
  });

  const onSubmitHandler = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await RequestResetUser();
    } catch (err) {
      console.error(err);
    }
    clearForm();
  };

  return (
    <Form method="POST" onSubmit={onSubmitHandler}>
      <h2>Reset Your Password</h2>
      <DisplayError error={error} />
      {data?.sendUserPasswordResetLink === null && (
        <div>
          <p>Success! Check your Email for a link!</p>
        </div>
      )}
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
        <button type="submit"> Reset Password </button>
      </fieldset>
    </Form>
  );
}
