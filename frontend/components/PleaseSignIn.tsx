import useCurrentUser from '../lib/useCurrentUser';
import SignIn from './SignIn';

export function PleaseSignIn({ children }: { children: JSX.Element }) {
  const currentUser = useCurrentUser();
  if (!currentUser) {
    return <SignIn />;
  }
  return children;
}
