import { useQuery } from '@apollo/client';
import { CurrentUser } from '../GraphQL/query/currentUser';

interface CurrentUserReturnedType {
  id: string;
  name: string;
  email: string;
}

export default function useCurrentUser() {
  const { data } = useQuery<{ authenticatedItem: CurrentUserReturnedType }>(CurrentUser);
  return {
    currentUser: data?.authenticatedItem,
  };
}
