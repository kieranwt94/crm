export const checkRole = (userRole, roles) => {
  return roles.some(role => role === userRole);
}
