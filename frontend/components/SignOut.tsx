import { useMutation } from '@apollo/client';
import Link from 'next/link';
import { SignOutUser } from '../GraphQL/mutation/signOutUser';
import { CurrentUser } from '../GraphQL/query/currentUser';

export default function SignOut() {
  const [signOut] = useMutation(SignOutUser, {
    refetchQueries: [
      {
        query: CurrentUser,
      },
    ],
  });
  return (
    <Link href="/">
      <button
        type="button"
        onClick={async () => {
          await signOut();
        }}
      >
        SignOut
      </button>
    </Link>
  );
}
