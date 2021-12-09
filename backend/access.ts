/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { permissionsList } from './schemas/RoleFields';
import { ListAccessArgs } from './types';

export function isSignedIn({ session }: ListAccessArgs): boolean {
  return !!session;
}

const generatedPermisson = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({ session }: ListAccessArgs) {
      return !!session?.data.role?.[permission];
    },
  ])
);

export const permissions = {
  ...generatedPermisson,
};

// Rule based function
// Rules can return a boolean - yes or no - or a filter which limits which products they can CRUD.
export const rule = {
  canManageProducts({ session }: ListAccessArgs) {
    // is sign in?
    if (!isSignedIn({ session })) {
      return false;
    }
    // have the permission
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    // do they own this product?
    return { user: { id: session.itemId } };
  },
};
