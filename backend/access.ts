import { ListAccessArgs } from './types';
import { permissionsList } from './schemas/fields';

function isSignedIn({ session }: ListAccessArgs): boolean {
  return !!session;
}

const generatePermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({ session }: ListAccessArgs): boolean {
      return !!session?.data.role?.[permission];
    },
  ])
);

const permissions = {
  ...generatePermissions,
};

export { isSignedIn, permissions };
