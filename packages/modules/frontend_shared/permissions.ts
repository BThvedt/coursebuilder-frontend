export type OrgRoleName =
  | "ME"
  | "SUPERADMIN"
  | "ADMIN"
  | "MANAGER"
  | "EMPLOYEE"
  | "MEMBER"
  | "USER"

export enum OrgRolevals {
  "ME" = 1,
  "SUPERADMIN",
  "ADMIN",
  "MANAGER",
  "EMPLOYEE",
  "MEMBER",
  "USER"
}

// there has GOT to be a better way to do this but hmm..
export const hasAccessLevel = (userRole: OrgRoleName, role: OrgRoleName) => {
  const val = OrgRolevals[role]

  return OrgRolevals[userRole] <= val
}

export const hasAccessLevelGreaterThan = (
  userRole: OrgRoleName,
  role: OrgRoleName
) => {
  const val = OrgRolevals[role]

  return OrgRolevals[userRole] < val
}

export type UserRoleName =
  | "admin"
  | "owner"
  | "dev"
  | "editor"
  | "qa"
  | "viewer"

enum UserRoles {
  "admin" = 1, // can change owner
  "owner", // can do everything
  "dev", // can do everything except create/delete modules
  "editor", // can't edit flowcharts, create/delete componetns, optionally edit files and page positions
  "qa", // optionally edit text, components positions
  "viewer" // can view
}

export const hasModuleRoleLevel = (
  userRole: UserRoleName,
  role: UserRoleName
) => {
  const val = UserRoles[role]

  return UserRoles[userRole] <= val
}

export const hasModuleRoleLevelGreaterThan = (
  userRole: UserRoleName,
  role: UserRoleName
) => {
  const val = UserRoles[role]

  return UserRoles[userRole] < val
}
