/* eslint-disable @typescript-eslint/require-await */
import { GetServerSideProps } from 'next';
import PasswordReset from '../components/PasswordReset';
import RequestReset from '../components/RequestReset';

interface IPropType {
  token: string;
}
export default function ResetPasswordPage({ token }: IPropType) {
  if (!token) {
    return (
      <>
        <p>Sorry! You must supply the token!</p>
        <RequestReset />
      </>
    );
  }
  return <PasswordReset token={token} />;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (query?.token) {
    return {
      props: {
        token: query.token,
      },
    };
  }
  return {
    props: {},
  };
};
