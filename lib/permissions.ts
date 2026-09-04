export interface UserSession {
  id: string;
  email: string;
  name: string;
  role: string;
}

export function isSuperAdmin(user?: UserSession | null): boolean {
  return user?.role === 'SUPER_ADMIN';
}

export function isManagerOrAbove(user?: UserSession | null): boolean {
  return user?.role === 'SUPER_ADMIN' || user?.role === 'MANAGER';
}

export function isStaffOrAbove(user?: UserSession | null): boolean {
  return (
    user?.role === 'SUPER_ADMIN' ||
    user?.role === 'MANAGER' ||
    user?.role === 'STAFF'
  );
}

export function canViewSensitiveFinancials(user?: UserSession | null): boolean {
  return user?.role === 'SUPER_ADMIN' || user?.role === 'MANAGER';
}
