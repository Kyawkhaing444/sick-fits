import Form from '../components/styles/Form';

export default function SignInPage() {
  return (
    <Form method="POST">
      <fieldset>
        <label htmlFor="email">
          <input id="email" type="email" name="email" placeholder="Email" />
        </label>
        <label htmlFor="password">
          <input id="password" type="password" name="password" placeholder="Password" />
        </label>
      </fieldset>
    </Form>
  );
}
